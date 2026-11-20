import { SalesOrder } from '../../models/SalesOrder.js';
import { ProductionOrder } from '../../models/ProductionOrder.js';
import { Material } from '../../models/Material.js';
import { PurchaseOrder } from '../../models/PurchaseOrder.js';
import { DeliveryOrder } from '../../models/DeliveryOrder.js';
import { Vehicle } from '../../models/Vehicle.js';
import { CustomerPayment } from '../../models/CustomerPayment.js';
import { DeliveryExpense } from '../../models/DeliveryExpense.js';
import { Enquiry } from '../../models/Enquiry.js';
import { Quotation } from '../../models/Quotation.js';
import { ProformaInvoice } from '../../models/ProformaInvoice.js';
import { CustomerPurchaseOrder } from '../../models/CustomerPurchaseOrder.js';
import { BOM } from '../../models/BOM.js';
import { MaterialRequest } from '../../models/MaterialRequest.js';
import { GoodsReceiptNote } from '../../models/GoodsReceiptNote.js';
import { MaterialIssue } from '../../models/MaterialIssue.js';
import { DailyProductionUpdate } from '../../models/DailyProductionUpdate.js';
import { QualityInspection } from '../../models/QualityInspection.js';
import { PackingRecord } from '../../models/PackingRecord.js';
import { DeliveryChallan } from '../../models/DeliveryChallan.js';
import { ProofOfDelivery } from '../../models/ProofOfDelivery.js';
import { AuditLog } from '../../models/AuditLog.js';
import { sendSuccess } from '../../utils/response.js';
import { ApiError } from '../../utils/apiError.js';
import { buildIdOrCodeQuery } from '../../utils/queryHelper.js';

// --- CENTRALIZED ADMIN DASHBOARD ---
export async function getDashboardOverview(_req, res, next) {
  try {
    const [
      orders,
      productionOrders,
      materials,
      purchaseOrders,
      deliveryOrders,
      payments,
      expenses,
      vehicles
    ] = await Promise.all([
      SalesOrder.find(),
      ProductionOrder.find(),
      Material.find(),
      PurchaseOrder.find(),
      DeliveryOrder.find(),
      CustomerPayment.find(),
      DeliveryExpense.find(),
      Vehicle.find()
    ]);

    const totalOrderValue = orders.reduce((sum, o) => sum + (o.orderValue || 0), 0);
    const advanceCollected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const balanceDue = orders.reduce((sum, o) => sum + (o.balanceAmount || 0), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

    const lowStockCount = materials.filter(m => m.currentStock <= m.minStock).length;
    const activeProduction = productionOrders.filter(p => !['Completed (Ready for Delivery)', 'Cancelled'].includes(p.status)).length;
    const inTransitDeliveries = deliveryOrders.filter(d => ['Dispatched', 'In Transit'].includes(d.status)).length;
    const activeFleet = vehicles.filter(v => v.status === 'In Transit').length;

    return sendSuccess(res, {
      kpis: {
        totalRevenue: totalOrderValue,
        advanceCollected,
        balanceDue,
        totalExpenses,
        netCashflow: advanceCollected - totalExpenses
      },
      orders: {
        total: orders.length,
        settled: orders.filter(o => o.status === 'Fully Settled').length,
        active: orders.filter(o => !['Fully Settled', 'Cancelled'].includes(o.status)).length
      },
      production: {
        active: activeProduction,
        completed: productionOrders.filter(p => p.status === 'Completed (Ready for Delivery)').length
      },
      supplyChain: {
        lowStockItems: lowStockCount,
        openPOs: purchaseOrders.filter(po => po.status === 'Issued to Supplier').length
      },
      logistics: {
        inTransit: inTransitDeliveries,
        activeVehicles: activeFleet
      }
    });
  } catch (err) {
    return next(err);
  }
}

// --- 22-STAGE ORDER JOURNEY AGGREGATOR ---
export async function getOrderJourney(req, res, next) {
  try {
    const orderRef = req.params.id;
    const so = await SalesOrder.findOne(buildIdOrCodeQuery(orderRef));
    if (!so) return next(ApiError.notFound(`Order not found: ${orderRef}`));

    // Fetch all related documents across departments
    const [
      enquiry,
      quotation,
      pi,
      cpo,
      payments,
      pro,
      bom,
      mr,
      pos,
      grns,
      mis,
      updates,
      qc,
      del,
      pkg,
      dc,
      pod
    ] = await Promise.all([
      so.enquiryCode ? Enquiry.findOne({ code: so.enquiryCode }) : null,
      so.quotationCode ? Quotation.findOne({ code: so.quotationCode }).sort({ version: -1 }) : null,
      ProformaInvoice.findOne({ quotationCode: so.quotationCode }),
      so.cpoNumber ? CustomerPurchaseOrder.findOne({ cpoNumber: so.cpoNumber }) : null,
      CustomerPayment.find({ salesOrderCode: so.code }),
      ProductionOrder.findOne({ salesOrderCode: so.code }),
      BOM.findOne({ productionOrderCode: so.productionOrderCode || 'PRO-001' }),
      MaterialRequest.findOne({ productionOrderCode: so.productionOrderCode || 'PRO-001' }),
      PurchaseOrder.find({ materialRequestCode: 'MR-001' }),
      GoodsReceiptNote.find(),
      MaterialIssue.find({ materialRequestCode: 'MR-001' }),
      DailyProductionUpdate.find({ productionOrderCode: so.productionOrderCode || 'PRO-001' }).sort({ createdAt: 1 }),
      QualityInspection.findOne({ productionOrderCode: so.productionOrderCode || 'PRO-001' }),
      DeliveryOrder.findOne({ salesOrderCode: so.code }),
      PackingRecord.findOne({ deliveryOrderCode: so.deliveryOrderCode || 'DEL-001' }),
      DeliveryChallan.findOne({ salesOrderCode: so.code }),
      ProofOfDelivery.findOne({ salesOrderCode: so.code })
    ]);

    const currentStage = so.completedStageNum || 1;

    // Define the 22 canonical stages
    const stages = [
      { num: 1, title: 'Customer Enquiry Received', dept: 'Sales', doc: enquiry?.code, status: currentStage >= 1 ? 'Completed' : 'Pending' },
      { num: 2, title: 'Enquiry Follow-up & Discussion', dept: 'Sales', doc: enquiry?.code, status: currentStage >= 2 ? 'Completed' : 'Pending' },
      { num: 3, title: 'Enquiry Qualified', dept: 'Sales', doc: enquiry?.code, status: currentStage >= 3 ? 'Completed' : 'Pending' },
      { num: 4, title: 'Quotation Created (v1)', dept: 'Sales', doc: quotation?.code, status: currentStage >= 4 ? 'Completed' : 'Pending' },
      { num: 5, title: 'Quotation Sent to Customer', dept: 'Sales', doc: quotation?.code, status: currentStage >= 5 ? 'Completed' : 'Pending' },
      { num: 6, title: 'Customer Follow-up & Commercial Review', dept: 'Sales', doc: quotation?.code, status: currentStage >= 6 ? 'Completed' : 'Pending' },
      { num: 7, title: 'Price & Spec Negotiation (v2)', dept: 'Sales', doc: quotation?.code, status: currentStage >= 7 ? 'Completed' : 'Pending' },
      { num: 8, title: 'Quotation Accepted', dept: 'Sales', doc: quotation?.code, status: currentStage >= 8 ? 'Completed' : 'Pending' },
      { num: 9, title: 'Proforma Invoice (PI) Issued', dept: 'Sales', doc: pi?.code, status: currentStage >= 9 ? 'Completed' : 'Pending' },
      { num: 10, title: 'Customer Purchase Order Logged', dept: 'Sales', doc: cpo?.cpoNumber || cpo?.code, status: currentStage >= 10 ? 'Completed' : 'Pending' },
      { num: 11, title: 'Advance Payment Verified', dept: 'Sales / Finance', doc: payments[0]?.code, status: currentStage >= 11 ? 'Completed' : 'Pending' },
      { num: 12, title: 'Sales Order Confirmed → Production', dept: 'Sales', doc: so.code, status: currentStage >= 12 ? 'Completed' : 'Pending' },
      { num: 13, title: 'Production Order Created & BOM Prepared', dept: 'Production', doc: pro?.code, status: currentStage >= 13 ? 'Completed' : 'Pending' },
      { num: 14, title: 'Material Request Issued to Supply Chain', dept: 'Production', doc: mr?.code, status: currentStage >= 14 ? 'Completed' : 'Pending' },
      { num: 15, title: 'Stock Check & Partial Material Issue (MI-001)', dept: 'Supply Chain', doc: mis[0]?.code, status: currentStage >= 15 ? 'Completed' : 'Pending' },
      { num: 16, title: 'Purchase Order for Shortage Created (PO-001)', dept: 'Supply Chain', doc: pos[0]?.code, status: currentStage >= 16 ? 'Completed' : 'Pending' },
      { num: 17, title: 'Materials Received & GRN Confirmed (GRN-001)', dept: 'Supply Chain', doc: grns[0]?.code, status: currentStage >= 17 ? 'Completed' : 'Pending' },
      { num: 18, title: 'Remaining Materials Issued (MI-002) & Received', dept: 'SCM / Prod', doc: mis[1]?.code, status: currentStage >= 18 ? 'Completed' : 'Pending' },
      { num: 19, title: 'Assembly Execution & Daily Progress', dept: 'Production', doc: updates[updates.length - 1]?._id, status: currentStage >= 19 ? 'Completed' : 'Pending' },
      { num: 20, title: 'Quality Check (QC) Approval & Logistics Handover', dept: 'Production', doc: qc?.code, status: currentStage >= 20 ? 'Completed' : 'Pending' },
      { num: 21, title: 'Delivery Plan, Packaging, Challan & Dispatch', dept: 'Logistics', doc: dc?.code || del?.code, status: currentStage >= 21 ? 'Completed' : 'Pending' },
      { num: 22, title: 'Delivery Tracking, POD & Balance Payment Collected', dept: 'Logistics / Admin', doc: pod?.code, status: currentStage >= 22 ? 'Completed' : 'Pending' }
    ];

    return sendSuccess(res, {
      order: so,
      currentStageNum: currentStage,
      isFullyCompleted: currentStage === 22,
      stages,
      linkedDocuments: {
        enquiry,
        quotation,
        proformaInvoice: pi,
        customerPurchaseOrder: cpo,
        payments,
        productionOrder: pro,
        bom,
        materialRequest: mr,
        purchaseOrders: pos,
        grns,
        materialIssues: mis,
        updates,
        qualityInspection: qc,
        deliveryOrder: del,
        packingRecord: pkg,
        deliveryChallan: dc,
        proofOfDelivery: pod
      }
    });
  } catch (err) {
    return next(err);
  }
}

// --- ORDER CONTROL (HOLD / RESUME / CANCEL) ---
export async function holdOrder(req, res, next) {
  try {
    const { reason } = req.body;
    const order = await SalesOrder.findOneAndUpdate(
      buildIdOrCodeQuery(req.params.id),
      { status: 'On Hold' },
      { new: true }
    );
    if (!order) return next(ApiError.notFound('Order not found'));

    await AuditLog.create({
      action: 'ORDER_HOLD',
      department: 'admin',
      resource: 'SalesOrder',
      resourceId: order.code,
      userName: req.user?.employeeName || 'Admin',
      details: { reason }
    });

    return sendSuccess(res, order, `Order ${order.code} placed on hold`);
  } catch (err) {
    return next(err);
  }
}

export async function resumeOrder(req, res, next) {
  try {
    const order = await SalesOrder.findOneAndUpdate(
      buildIdOrCodeQuery(req.params.id),
      { status: 'In Production' },
      { new: true }
    );
    if (!order) return next(ApiError.notFound('Order not found'));

    await AuditLog.create({
      action: 'ORDER_RESUMED',
      department: 'admin',
      resource: 'SalesOrder',
      resourceId: order.code,
      userName: req.user?.employeeName || 'Admin',
      details: { resumedAt: new Date() }
    });

    return sendSuccess(res, order, `Order ${order.code} resumed`);
  } catch (err) {
    return next(err);
  }
}

export async function cancelOrder(req, res, next) {
  try {
    const { reason } = req.body;
    const order = await SalesOrder.findOneAndUpdate(
      buildIdOrCodeQuery(req.params.id),
      { status: 'Cancelled' },
      { new: true }
    );
    if (!order) return next(ApiError.notFound('Order not found'));

    await AuditLog.create({
      action: 'ORDER_CANCELLED',
      department: 'admin',
      resource: 'SalesOrder',
      resourceId: order.code,
      userName: req.user?.employeeName || 'Admin',
      details: { reason }
    });

    return sendSuccess(res, order, `Order ${order.code} has been cancelled`);
  } catch (err) {
    return next(err);
  }
}

// --- AUDIT LOGS ---
export async function getAuditLogs(req, res, next) {
  try {
    const { department, resource, action } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (resource) filter.resource = resource;
    if (action) filter.action = action;

    const logs = await AuditLog.find(filter).sort({ createdAt: -1 }).limit(100);
    return sendSuccess(res, logs);
  } catch (err) {
    return next(err);
  }
}

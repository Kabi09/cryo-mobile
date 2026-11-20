import { ProductionOrder } from '../../models/ProductionOrder.js';
import { BOM } from '../../models/BOM.js';
import { MaterialRequest } from '../../models/MaterialRequest.js';
import { MaterialReceipt } from '../../models/MaterialReceipt.js';
import { DailyProductionUpdate } from '../../models/DailyProductionUpdate.js';
import { QualityInspection } from '../../models/QualityInspection.js';
import { SalesOrder } from '../../models/SalesOrder.js';
import { AuditLog } from '../../models/AuditLog.js';
import { getNextSequence } from '../../utils/counter.js';
import { sendSuccess } from '../../utils/response.js';
import { ApiError } from '../../utils/apiError.js';
import { buildIdOrCodeQuery } from '../../utils/queryHelper.js';

// --- PRODUCTION ORDERS ---
export async function getProductionOrders(req, res, next) {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { code: { $regex: search, $options: 'i' } },
        { salesOrderCode: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } }
      ];
    }
    const orders = await ProductionOrder.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, orders);
  } catch (err) {
    return next(err);
  }
}

export async function createProductionOrder(req, res, next) {
  try {
    const code = await getNextSequence('PRO', 3);
    const order = await ProductionOrder.create({
      ...req.body,
      code,
      status: 'BOM Confirmed',
      startDate: new Date()
    });

    // Link in SalesOrder
    await SalesOrder.findOneAndUpdate(
      { code: req.body.salesOrderCode },
      { productionOrderCode: code, status: 'In Production', completedStageNum: 13 }
    );

    await AuditLog.create({
      action: 'CREATE_PRODUCTION_ORDER',
      department: 'production',
      resource: 'ProductionOrder',
      resourceId: code,
      userName: req.user?.employeeName || 'Production Planner',
      details: { soRef: req.body.salesOrderCode, productName: order.productName, qty: order.quantity }
    });

    return sendSuccess(res, order, 'Production order scheduled and BOM stage initialized', 201);
  } catch (err) {
    return next(err);
  }
}

export async function getProductionOrderById(req, res, next) {
  try {
    const order = await ProductionOrder.findOne(buildIdOrCodeQuery(req.params.id));
    if (!order) return next(ApiError.notFound('Production Order not found'));

    const [bom, materialRequest, updates, inspection] = await Promise.all([
      BOM.findOne({ productionOrderCode: order.code }),
      MaterialRequest.findOne({ productionOrderCode: order.code }),
      DailyProductionUpdate.find({ productionOrderCode: order.code }).sort({ createdAt: -1 }),
      QualityInspection.findOne({ productionOrderCode: order.code })
    ]);

    return sendSuccess(res, {
      order,
      bom,
      materialRequest,
      updates,
      inspection
    });
  } catch (err) {
    return next(err);
  }
}

// --- BOM CONFIRMATION ---
export async function confirmBOM(req, res, next) {
  try {
    const { id } = req.params;
    const order = await ProductionOrder.findOne(buildIdOrCodeQuery(id));
    if (!order) return next(ApiError.notFound('Production Order not found'));

    const code = await getNextSequence('BOM', 3);
    const bom = await BOM.create({
      code,
      productionOrderCode: order.code,
      productCode: order.productCode,
      productName: order.productName,
      items: req.body.items,
      confirmed: true,
      confirmedBy: req.user?.employeeName || 'Production Engineer',
      confirmedAt: new Date()
    });

    order.bomCode = code;
    order.status = 'BOM Confirmed';
    await order.save();

    return sendSuccess(res, bom, 'Bill of Materials confirmed and locked', 201);
  } catch (err) {
    return next(err);
  }
}

// --- MATERIAL REQUEST ---
export async function createMaterialRequest(req, res, next) {
  try {
    const code = await getNextSequence('MR', 3);
    const mr = await MaterialRequest.create({
      ...req.body,
      code,
      requestedBy: req.user?.employeeName || 'Shopfloor Engineer',
      status: 'Submitted'
    });

    await ProductionOrder.findOneAndUpdate(
      { code: req.body.productionOrderCode },
      { materialRequestCode: code, status: 'Material Requested' }
    );

    return sendSuccess(res, mr, 'Material requisition submitted to Stores & Supply Chain', 201);
  } catch (err) {
    return next(err);
  }
}

// --- MATERIAL RECEIPT (Shopfloor Confirmation) ---
export async function confirmMaterialReceipt(req, res, next) {
  try {
    const code = await getNextSequence('RCPT', 3);
    const receipt = await MaterialReceipt.create({
      ...req.body,
      code,
      receivedBy: req.user?.employeeName || 'Assembly Supervisor'
    });

    // Update Production Order status to Materials Ready without touching warehouse inventory
    await ProductionOrder.findOneAndUpdate(
      { code: req.body.productionOrderCode },
      { status: 'Materials Ready' }
    );

    // Update SalesOrder completed stage to 18
    await SalesOrder.findOneAndUpdate(
      { productionOrderCode: req.body.productionOrderCode },
      { completedStageNum: 18 }
    );

    return sendSuccess(res, receipt, 'Materials physically verified and accepted into assembly bay', 201);
  } catch (err) {
    return next(err);
  }
}

// --- DAILY PRODUCTION UPDATE ---
export async function logDailyUpdate(req, res, next) {
  try {
    const { id } = req.params;
    const order = await ProductionOrder.findOne(buildIdOrCodeQuery(id));
    if (!order) return next(ApiError.notFound('Production Order not found'));

    const update = await DailyProductionUpdate.create({
      productionOrderCode: order.code,
      stageName: req.body.stageName,
      progressPercentage: req.body.progressPercentage,
      shift: req.body.shift || 'General Shift',
      operatorName: req.user?.employeeName || 'Assembly Lead',
      notes: req.body.notes || ''
    });

    order.progress = req.body.progressPercentage;
    order.status = 'In Assembly';
    if (req.body.progressPercentage === 100) {
      order.status = 'Under QC';
    }
    await order.save();

    await SalesOrder.findOneAndUpdate(
      { productionOrderCode: order.code },
      { completedStageNum: 19 }
    );

    return sendSuccess(res, update, 'Assembly progress update logged', 201);
  } catch (err) {
    return next(err);
  }
}

// --- QUALITY INSPECTION ---
export async function submitQualityInspection(req, res, next) {
  try {
    const code = await getNextSequence('QC', 3);
    const { productionOrderCode, result } = req.body;

    const inspection = await QualityInspection.create({
      ...req.body,
      code,
      inspectorName: req.user?.employeeName || 'Quality Lead',
      handoverReady: result === 'Passed'
    });

    const isPassed = result === 'Passed';
    const newStatus = isPassed ? 'Completed (Ready for Delivery)' : 'On Hold';

    const order = await ProductionOrder.findOneAndUpdate(
      { code: productionOrderCode },
      {
        status: newStatus,
        progress: isPassed ? 100 : 90,
        completedDate: isPassed ? new Date() : null
      },
      { new: true }
    );

    if (isPassed && order) {
      await SalesOrder.findOneAndUpdate(
        { productionOrderCode },
        { status: 'Completed (Ready for Delivery)', completedStageNum: 20 }
      );
    }

    await AuditLog.create({
      action: 'QUALITY_INSPECTION',
      department: 'production',
      resource: 'QualityInspection',
      resourceId: code,
      userName: req.user?.employeeName || 'Quality Lead',
      details: { productionOrderCode, result, handoverReady: isPassed }
    });

    return sendSuccess(res, inspection, isPassed ? 'Quality inspection passed. Ready for Logistics handover.' : 'Inspection logged with rework flag', 201);
  } catch (err) {
    return next(err);
  }
}

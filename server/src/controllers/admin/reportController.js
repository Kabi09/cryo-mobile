import { SalesOrder } from '../../models/SalesOrder.js';
import { ProductionOrder } from '../../models/ProductionOrder.js';
import { Material } from '../../models/Material.js';
import { PurchaseOrder } from '../../models/PurchaseOrder.js';
import { DeliveryOrder } from '../../models/DeliveryOrder.js';
import { CustomerPayment } from '../../models/CustomerPayment.js';
import { DeliveryExpense } from '../../models/DeliveryExpense.js';
import { QualityInspection } from '../../models/QualityInspection.js';
import { sendSuccess } from '../../utils/response.js';

// 1. Sales Report
export async function getSalesReport(_req, res, next) {
  try {
    const orders = await SalesOrder.find();
    const totalRevenue = orders.reduce((s, o) => s + (o.orderValue || 0), 0);
    const totalUnits = orders.reduce((s, o) => s + (o.quantity || 0), 0);
    const byProduct = {};

    for (const o of orders) {
      byProduct[o.productName] = byProduct[o.productName] || { count: 0, revenue: 0 };
      byProduct[o.productName].count += o.quantity;
      byProduct[o.productName].revenue += o.orderValue;
    }

    return sendSuccess(res, {
      totalRevenue,
      totalUnits,
      orderCount: orders.length,
      averageOrderValue: orders.length ? totalRevenue / orders.length : 0,
      productBreakdown: byProduct
    });
  } catch (err) {
    return next(err);
  }
}

// 2. Production Report
export async function getProductionReport(_req, res, next) {
  try {
    const [orders, inspections] = await Promise.all([
      ProductionOrder.find(),
      QualityInspection.find()
    ]);

    const completed = orders.filter(o => o.status === 'Completed (Ready for Delivery)').length;
    const passedQC = inspections.filter(i => i.result === 'Passed').length;
    const qcPassRate = inspections.length ? ((passedQC / inspections.length) * 100).toFixed(1) : 100;

    return sendSuccess(res, {
      totalProductionOrders: orders.length,
      completedOrders: completed,
      inProgressOrders: orders.length - completed,
      inspectionsConducted: inspections.length,
      qcPassRate: `${qcPassRate}%`
    });
  } catch (err) {
    return next(err);
  }
}

// 3. Inventory Report
export async function getInventoryReport(_req, res, next) {
  try {
    const materials = await Material.find();
    const totalValuation = materials.reduce((s, m) => s + (m.currentStock * (m.unitPrice || 0)), 0);
    const lowStock = materials.filter(m => m.currentStock <= m.minStock);

    return sendSuccess(res, {
      totalItems: materials.length,
      totalValuation,
      lowStockCount: lowStock.length,
      lowStockItems: lowStock.map(m => ({
        code: m.code,
        name: m.name,
        currentStock: m.currentStock,
        minStock: m.minStock,
        unit: m.unit
      }))
    });
  } catch (err) {
    return next(err);
  }
}

// 4. Procurement Report
export async function getProcurementReport(_req, res, next) {
  try {
    const pos = await PurchaseOrder.find();
    const totalSpent = pos.reduce((s, p) => s + (p.totalAmount || 0), 0);
    const deliveredCount = pos.filter(p => p.status === 'Delivered (GRN Confirmed)').length;

    return sendSuccess(res, {
      totalPurchaseOrders: pos.length,
      totalSpent,
      deliveredPOs: deliveredCount,
      fulfillmentRate: pos.length ? `${((deliveredCount / pos.length) * 100).toFixed(1)}%` : '100%'
    });
  } catch (err) {
    return next(err);
  }
}

// 5. Logistics Report
export async function getLogisticsReport(_req, res, next) {
  try {
    const [deliveries, expenses] = await Promise.all([
      DeliveryOrder.find(),
      DeliveryExpense.find()
    ]);

    const delivered = deliveries.filter(d => d.status === 'Delivered').length;
    const inTransit = deliveries.filter(d => ['Dispatched', 'In Transit'].includes(d.status)).length;
    const totalExpenses = expenses.reduce((s, e) => s + (e.amount || 0), 0);

    return sendSuccess(res, {
      totalShipments: deliveries.length,
      deliveredShipments: delivered,
      inTransitShipments: inTransit,
      totalFreightAndExpenses: totalExpenses
    });
  } catch (err) {
    return next(err);
  }
}

// 6. Financials Report
export async function getFinancialsReport(_req, res, next) {
  try {
    const [orders, payments, expenses, pos] = await Promise.all([
      SalesOrder.find(),
      CustomerPayment.find(),
      DeliveryExpense.find(),
      PurchaseOrder.find()
    ]);

    const totalInvoiced = orders.reduce((s, o) => s + (o.orderValue || 0), 0);
    const totalReceived = payments.reduce((s, p) => s + (p.amount || 0), 0);
    const totalOutstanding = orders.reduce((s, o) => s + (o.balanceAmount || 0), 0);
    const procurementCosts = pos.reduce((s, p) => s + (p.totalAmount || 0), 0);
    const deliveryCosts = expenses.reduce((s, e) => s + (e.amount || 0), 0);

    return sendSuccess(res, {
      totalInvoiced,
      totalReceived,
      totalOutstanding,
      procurementCosts,
      deliveryCosts,
      grossMargin: totalInvoiced - (procurementCosts + deliveryCosts)
    });
  } catch (err) {
    return next(err);
  }
}

// 7. Order Status Stage Completion Report
export async function getOrderStatusReport(_req, res, next) {
  try {
    const orders = await SalesOrder.find().select('code customerName productName orderValue status completedStageNum confirmedDate completedDate');
    return sendSuccess(res, orders);
  } catch (err) {
    return next(err);
  }
}

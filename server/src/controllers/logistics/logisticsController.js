import { DeliveryOrder } from '../../models/DeliveryOrder.js';
import { PackingRecord } from '../../models/PackingRecord.js';
import { DeliveryChallan } from '../../models/DeliveryChallan.js';
import { ProofOfDelivery } from '../../models/ProofOfDelivery.js';
import { DeliveryExpense } from '../../models/DeliveryExpense.js';
import { Vehicle } from '../../models/Vehicle.js';
import { SalesOrder } from '../../models/SalesOrder.js';
import { CustomerPayment } from '../../models/CustomerPayment.js';
import { AuditLog } from '../../models/AuditLog.js';
import { getNextSequence } from '../../utils/counter.js';
import { sendSuccess } from '../../utils/response.js';
import { ApiError } from '../../utils/apiError.js';
import { buildIdOrCodeQuery } from '../../utils/queryHelper.js';

// --- DELIVERY ORDERS ---
export async function getDeliveryOrders(req, res, next) {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { code: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { salesOrderCode: { $regex: search, $options: 'i' } }
      ];
    }
    const orders = await DeliveryOrder.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, orders);
  } catch (err) {
    return next(err);
  }
}

export async function createDeliveryOrder(req, res, next) {
  try {
    const code = await getNextSequence('DEL', 3);
    const order = await DeliveryOrder.create({
      ...req.body,
      code,
      status: 'Plan Created'
    });

    await SalesOrder.findOneAndUpdate(
      { code: req.body.salesOrderCode },
      { deliveryOrderCode: code }
    );

    await AuditLog.create({
      action: 'CREATE_DELIVERY_ORDER',
      department: 'logistics',
      resource: 'DeliveryOrder',
      resourceId: code,
      userName: req.user?.employeeName || 'Logistics Coordinator',
      details: { soRef: req.body.salesOrderCode, customerName: order.customerName, method: order.deliveryMethod }
    });

    return sendSuccess(res, order, 'Delivery plan created', 201);
  } catch (err) {
    return next(err);
  }
}

export async function getDeliveryOrderById(req, res, next) {
  try {
    const order = await DeliveryOrder.findOne(buildIdOrCodeQuery(req.params.id));
    if (!order) return next(ApiError.notFound('Delivery Order not found'));

    const [packing, challan, pod, expenses] = await Promise.all([
      order.packingRecordCode ? PackingRecord.findOne({ code: order.packingRecordCode }) : null,
      order.challanCode ? DeliveryChallan.findOne({ code: order.challanCode }) : null,
      order.proofOfDeliveryCode ? ProofOfDelivery.findOne({ code: order.proofOfDeliveryCode }) : null,
      DeliveryExpense.find({ deliveryOrderCode: order.code })
    ]);

    return sendSuccess(res, {
      order,
      packing,
      challan,
      pod,
      expenses
    });
  } catch (err) {
    return next(err);
  }
}

// --- PACKING RECORD ---
export async function createPackingRecord(req, res, next) {
  try {
    const code = await getNextSequence('PKG', 3);
    const packing = await PackingRecord.create({
      ...req.body,
      code,
      checkedBy: req.user?.employeeName || 'Packaging Lead'
    });

    await DeliveryOrder.findOneAndUpdate(
      { code: req.body.deliveryOrderCode },
      { packingRecordCode: code, status: 'Packed' }
    );

    return sendSuccess(res, packing, 'Packaging verified and sealed', 201);
  } catch (err) {
    return next(err);
  }
}

// --- DELIVERY CHALLAN ---
export async function createDeliveryChallan(req, res, next) {
  try {
    const code = await getNextSequence('DC', 3);
    const challan = await DeliveryChallan.create({
      ...req.body,
      code,
      issuedBy: req.user?.employeeName || 'Logistics Officer'
    });

    await DeliveryOrder.findOneAndUpdate(
      { code: req.body.deliveryOrderCode },
      { challanCode: code, status: 'Challan Generated' }
    );

    return sendSuccess(res, challan, 'Delivery Challan issued', 201);
  } catch (err) {
    return next(err);
  }
}

// --- DISPATCH ORDER ---
export async function dispatchDeliveryOrder(req, res, next) {
  try {
    const { id } = req.params;
    const order = await DeliveryOrder.findOne(buildIdOrCodeQuery(id));
    if (!order) return next(ApiError.notFound('Delivery Order not found'));

    order.status = 'In Transit';
    order.dispatchedAt = new Date();
    await order.save();

    // If own vehicle was assigned, mark vehicle 'In Transit'
    if (order.vehicleCode) {
      await Vehicle.findOneAndUpdate(
        { $or: [{ code: order.vehicleCode }, { regNumber: order.vehicleRegNumber }] },
        { status: 'In Transit' }
      );
    }

    // Update SalesOrder to In Transit & stage 21
    await SalesOrder.findOneAndUpdate(
      { code: order.salesOrderCode },
      { status: 'In Transit', completedStageNum: 21 }
    );

    await AuditLog.create({
      action: 'DISPATCH_DELIVERY',
      department: 'logistics',
      resource: 'DeliveryOrder',
      resourceId: order.code,
      userName: req.user?.employeeName || 'Logistics Incharge',
      details: { vehicle: order.vehicleRegNumber, driver: order.driverName }
    });

    return sendSuccess(res, order, 'Consignment dispatched and in transit to customer site');
  } catch (err) {
    return next(err);
  }
}

// --- PROOF OF DELIVERY (POD) & BALANCE COLLECTION ---
export async function recordPOD(req, res, next) {
  try {
    const { id } = req.params;
    const order = await DeliveryOrder.findOne(buildIdOrCodeQuery(id));
    if (!order) return next(ApiError.notFound('Delivery Order not found'));

    const code = await getNextSequence('POD', 3);
    const { balanceCollected = 0, paymentMode, paymentRefNumber, receivedByCustomer } = req.body;

    const pod = await ProofOfDelivery.create({
      ...req.body,
      code,
      deliveryOrderCode: order.code,
      salesOrderCode: order.salesOrderCode,
      verifiedByDriver: order.driverName || (req.user?.employeeName || 'Delivery Driver')
    });

    // If balance payment collected, record into CustomerPayment
    if (balanceCollected > 0) {
      const payCode = await getNextSequence('PAY', 3);
      await CustomerPayment.create({
        code: payCode,
        salesOrderCode: order.salesOrderCode,
        customerName: order.customerName,
        paymentType: 'Final Balance',
        amount: balanceCollected,
        paymentMode: paymentMode || 'Cheque',
        referenceNumber: paymentRefNumber || `POD-CHEQUE-${code}`,
        verifiedBy: req.user?.employeeName || 'Finance Receiver',
        status: 'Verified',
        notes: `Balance collected on delivery by ${order.driverName || 'driver'}`
      });
    }

    // Update Delivery Order
    order.status = 'Delivered';
    order.proofOfDeliveryCode = code;
    order.balancePaymentCollected = true;
    order.deliveredAt = new Date();
    await order.save();

    // Release vehicle
    if (order.vehicleCode || order.vehicleRegNumber) {
      await Vehicle.findOneAndUpdate(
        { $or: [{ code: order.vehicleCode }, { regNumber: order.vehicleRegNumber }] },
        { status: 'Available' }
      );
    }

    // Update SalesOrder: fully settled, stage 22 complete
    const so = await SalesOrder.findOne({ code: order.salesOrderCode });
    if (so) {
      so.receivedAmount += balanceCollected;
      so.balanceAmount = 0;
      so.paymentStatus = 'Fully Paid (₹1,50,000 / ₹1,50,000)';
      so.status = 'Fully Settled';
      so.completedStageNum = 22;
      so.completedDate = new Date();
      await so.save();
    }

    await AuditLog.create({
      action: 'POD_CONFIRMED',
      department: 'logistics',
      resource: 'ProofOfDelivery',
      resourceId: code,
      userName: req.user?.employeeName || 'Logistics Admin',
      details: {
        orderCode: order.code,
        receivedBy: receivedByCustomer,
        balanceCollected,
        orderSettled: true
      }
    });

    return sendSuccess(res, { pod, order, salesOrder: so }, 'Proof of Delivery recorded, balance payment settled, and order completed', 201);
  } catch (err) {
    return next(err);
  }
}

// --- DELIVERY EXPENSES ---
export async function getDeliveryExpenses(req, res, next) {
  try {
    const { deliveryCode } = req.query;
    const filter = deliveryCode ? { deliveryOrderCode: deliveryCode } : {};
    const expenses = await DeliveryExpense.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, expenses);
  } catch (err) {
    return next(err);
  }
}

export async function createDeliveryExpense(req, res, next) {
  try {
    const code = await getNextSequence('EXP', 3);
    const expense = await DeliveryExpense.create({ ...req.body, code });
    return sendSuccess(res, expense, 'Delivery expense recorded', 201);
  } catch (err) {
    return next(err);
  }
}

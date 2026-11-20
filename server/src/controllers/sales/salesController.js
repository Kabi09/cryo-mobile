import { Enquiry } from '../../models/Enquiry.js';
import { Quotation } from '../../models/Quotation.js';
import { ProformaInvoice } from '../../models/ProformaInvoice.js';
import { CustomerPurchaseOrder } from '../../models/CustomerPurchaseOrder.js';
import { CustomerPayment } from '../../models/CustomerPayment.js';
import { SalesOrder } from '../../models/SalesOrder.js';
import { AuditLog } from '../../models/AuditLog.js';
import { getNextSequence } from '../../utils/counter.js';
import { sendSuccess } from '../../utils/response.js';
import { ApiError } from '../../utils/apiError.js';
import { buildIdOrCodeQuery } from '../../utils/queryHelper.js';

// --- ENQUIRIES ---
export async function getEnquiries(req, res, next) {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { code: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } }
      ];
    }
    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, enquiries);
  } catch (err) {
    return next(err);
  }
}

export async function createEnquiry(req, res, next) {
  try {
    const code = await getNextSequence('ENQ', 3);
    const enquiry = await Enquiry.create({ ...req.body, code });
    await AuditLog.create({
      action: 'CREATE_ENQUIRY',
      department: 'sales',
      resource: 'Enquiry',
      resourceId: code,
      userName: req.user?.employeeName || 'System',
      details: { customerName: enquiry.customerName, productName: enquiry.productName }
    });
    return sendSuccess(res, enquiry, 'Enquiry registered successfully', 201);
  } catch (err) {
    return next(err);
  }
}

export async function qualifyEnquiry(req, res, next) {
  try {
    const enquiry = await Enquiry.findOneAndUpdate(
      buildIdOrCodeQuery(req.params.id),
      { status: 'Qualified', qualifiedAt: new Date() },
      { new: true }
    );
    if (!enquiry) return next(ApiError.notFound('Enquiry not found'));
    return sendSuccess(res, enquiry, 'Enquiry marked as Qualified');
  } catch (err) {
    return next(err);
  }
}

export async function addFollowUp(req, res, next) {
  try {
    const { notes, nextFollowUpDate } = req.body;
    const enquiry = await Enquiry.findOne(buildIdOrCodeQuery(req.params.id));
    if (!enquiry) return next(ApiError.notFound('Enquiry not found'));

    enquiry.followUps.push({
      notes,
      executive: req.user?.employeeName || 'Sales Rep',
      nextFollowUpDate: nextFollowUpDate || null
    });
    if (enquiry.status === 'New') {
      enquiry.status = 'In Discussion';
    }
    await enquiry.save();
    return sendSuccess(res, enquiry, 'Follow-up recorded');
  } catch (err) {
    return next(err);
  }
}

// --- QUOTATIONS ---
export async function getQuotations(req, res, next) {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { code: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } }
      ];
    }
    const quotations = await Quotation.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, quotations);
  } catch (err) {
    return next(err);
  }
}

export async function createQuotation(req, res, next) {
  try {
    const code = await getNextSequence('QT', 3);
    const { quantity, unitPrice } = req.body;
    const totalAmount = req.body.totalAmount || (quantity * unitPrice);

    const quotation = await Quotation.create({
      ...req.body,
      code,
      version: 1,
      totalAmount,
      status: 'Sent',
      sentDate: new Date()
    });

    if (req.body.enquiryCode) {
      await Enquiry.findOneAndUpdate({ code: req.body.enquiryCode }, { status: 'Quotation Created' });
    }

    return sendSuccess(res, quotation, 'Quotation created and marked Sent', 201);
  } catch (err) {
    return next(err);
  }
}

export async function reviseQuotation(req, res, next) {
  try {
    const { unitPrice, quantity, negotiationNotes } = req.body;
    const existing = await Quotation.findOne(buildIdOrCodeQuery(req.params.id))
      .sort({ version: -1 });
    if (!existing) return next(ApiError.notFound('Quotation not found'));

    // Supersede old version
    existing.status = 'Superseded';
    await existing.save();

    const newVersion = existing.version + 1;
    const finalQty = quantity || existing.quantity;
    const totalAmount = finalQty * unitPrice;

    const revised = await Quotation.create({
      code: existing.code,
      version: newVersion,
      enquiryCode: existing.enquiryCode,
      customerId: existing.customerId,
      customerName: existing.customerName,
      productId: existing.productId,
      productName: existing.productName,
      quantity: finalQty,
      unitPrice,
      totalAmount,
      status: 'In Negotiation',
      negotiationNotes: negotiationNotes || `Revised to v${newVersion} following price negotiation.`
    });

    return sendSuccess(res, revised, `Quotation revised to version ${newVersion}`, 201);
  } catch (err) {
    return next(err);
  }
}

export async function acceptQuotation(req, res, next) {
  try {
    const quotation = await Quotation.findOneAndUpdate(
      buildIdOrCodeQuery(req.params.id),
      { status: 'Accepted', acceptedDate: new Date() },
      { new: true }
    );
    if (!quotation) return next(ApiError.notFound('Quotation not found'));
    return sendSuccess(res, quotation, 'Quotation marked as Accepted');
  } catch (err) {
    return next(err);
  }
}

// --- PROFORMA INVOICES ---
export async function getProformaInvoices(_req, res, next) {
  try {
    const pis = await ProformaInvoice.find().sort({ createdAt: -1 });
    return sendSuccess(res, pis);
  } catch (err) {
    return next(err);
  }
}

export async function createProformaInvoice(req, res, next) {
  try {
    const code = await getNextSequence('PI', 3);
    const balanceDue = req.body.totalAmount - req.body.advanceRequired;
    const pi = await ProformaInvoice.create({ ...req.body, code, balanceDue });
    return sendSuccess(res, pi, 'Proforma Invoice generated', 201);
  } catch (err) {
    return next(err);
  }
}

// --- CUSTOMER PURCHASE ORDERS (CPO) ---
export async function getCPOs(_req, res, next) {
  try {
    const cpos = await CustomerPurchaseOrder.find().sort({ createdAt: -1 });
    return sendSuccess(res, cpos);
  } catch (err) {
    return next(err);
  }
}

export async function createCPO(req, res, next) {
  try {
    const code = await getNextSequence('CPO', 3);
    const cpo = await CustomerPurchaseOrder.create({ ...req.body, code });
    return sendSuccess(res, cpo, 'Customer Purchase Order logged', 201);
  } catch (err) {
    return next(err);
  }
}

// --- PAYMENTS ---
export async function getPayments(req, res, next) {
  try {
    const { orderRef } = req.query;
    const filter = orderRef ? { salesOrderCode: orderRef } : {};
    const payments = await CustomerPayment.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, payments);
  } catch (err) {
    return next(err);
  }
}

export async function recordPayment(req, res, next) {
  try {
    const code = await getNextSequence('PAY', 3);
    const payment = await CustomerPayment.create({
      ...req.body,
      code,
      verifiedBy: req.user?.employeeName || 'Finance Exec'
    });

    // Update SalesOrder payment status and received amount
    const order = await SalesOrder.findOne({ code: req.body.salesOrderCode });
    if (order) {
      order.receivedAmount += payment.amount;
      order.balanceAmount = Math.max(0, order.orderValue - order.receivedAmount);
      order.paymentStatus = `Advance Received (₹${order.receivedAmount.toLocaleString('en-IN')} / ₹${order.orderValue.toLocaleString('en-IN')})`;
      if (order.balanceAmount === 0) {
        order.paymentStatus = 'Fully Paid';
      }
      await order.save();
    }

    return sendSuccess(res, payment, 'Customer payment recorded and verified', 201);
  } catch (err) {
    return next(err);
  }
}

// --- SALES ORDERS ---
export async function getSalesOrders(req, res, next) {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { code: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } }
      ];
    }
    const orders = await SalesOrder.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, orders);
  } catch (err) {
    return next(err);
  }
}

export async function getSalesOrderById(req, res, next) {
  try {
    const order = await SalesOrder.findOne(buildIdOrCodeQuery(req.params.id));
    if (!order) return next(ApiError.notFound('Sales Order not found'));
    return sendSuccess(res, order);
  } catch (err) {
    return next(err);
  }
}

export async function confirmSalesOrder(req, res, next) {
  try {
    const code = await getNextSequence('SO', 3);
    const { orderValue, advanceReceived = 0 } = req.body;
    const balanceAmount = Math.max(0, orderValue - advanceReceived);

    const order = await SalesOrder.create({
      ...req.body,
      code,
      receivedAmount: advanceReceived,
      balanceAmount,
      status: 'Confirmed (Sent to Production)',
      completedStageNum: 12,
      confirmedDate: new Date()
    });

    await AuditLog.create({
      action: 'CONFIRM_SALES_ORDER',
      department: 'sales',
      resource: 'SalesOrder',
      resourceId: code,
      userName: req.user?.employeeName || 'Sales Manager',
      details: { orderValue, advanceReceived, customerName: order.customerName }
    });

    return sendSuccess(res, order, 'Sales order confirmed and dispatched to Production schedule', 201);
  } catch (err) {
    return next(err);
  }
}

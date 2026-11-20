import express from 'express';
import {
  getEnquiries, createEnquiry, qualifyEnquiry, addFollowUp,
  getQuotations, createQuotation, reviseQuotation, acceptQuotation,
  getProformaInvoices, createProformaInvoice,
  getCPOs, createCPO,
  getPayments, recordPayment,
  getSalesOrders, getSalesOrderById, confirmSalesOrder
} from '../controllers/sales/salesController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAction } from '../middleware/permission.js';
import { validate } from '../middleware/validate.js';
import {
  enquirySchema, followUpSchema, quotationSchema, reviseQuotationSchema,
  proformaInvoiceSchema, cpoSchema, paymentSchema, confirmOrderSchema
} from '../validators/sales.validator.js';

const router = express.Router();

router.use(authenticate);

// Enquiries
router.get('/enquiries', requireAction('sales', 'view'), getEnquiries);
router.post('/enquiries', requireAction('sales', 'create'), validate(enquirySchema), createEnquiry);
router.post('/enquiries/:id/qualify', requireAction('sales', 'workflow'), qualifyEnquiry);
router.post('/enquiries/:id/follow-up', requireAction('sales', 'create'), validate(followUpSchema), addFollowUp);

// Quotations
router.get('/quotations', requireAction('sales', 'view'), getQuotations);
router.post('/quotations', requireAction('sales', 'create'), validate(quotationSchema), createQuotation);
router.post('/quotations/:id/revise', requireAction('sales', 'workflow'), validate(reviseQuotationSchema), reviseQuotation);
router.post('/quotations/:id/accept', requireAction('sales', 'workflow'), acceptQuotation);

// Proforma Invoices
router.get('/proforma-invoices', requireAction('sales', 'view'), getProformaInvoices);
router.post('/proforma-invoices', requireAction('sales', 'create'), validate(proformaInvoiceSchema), createProformaInvoice);

// Customer Purchase Orders
router.get('/cpos', requireAction('sales', 'view'), getCPOs);
router.post('/cpos', requireAction('sales', 'create'), validate(cpoSchema), createCPO);

// Customer Payments
router.get('/payments', requireAction('sales', 'view'), getPayments);
router.post('/payments', requireAction('sales', 'workflow'), validate(paymentSchema), recordPayment);

// Sales Orders
router.get('/orders', requireAction('sales', 'view'), getSalesOrders);
router.get('/orders/:id', requireAction('sales', 'view'), getSalesOrderById);
router.post('/orders/confirm', requireAction('sales', 'workflow'), validate(confirmOrderSchema), confirmSalesOrder);

export default router;

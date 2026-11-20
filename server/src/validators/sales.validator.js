import Joi from 'joi';

export const enquirySchema = Joi.object({
  customerId: Joi.string().optional(),
  customerName: Joi.string().required(),
  contactPerson: Joi.string().allow('', null).optional(),
  phone: Joi.string().allow('', null).optional(),
  email: Joi.string().allow('', null).optional(),
  productId: Joi.string().optional(),
  productName: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  budget: Joi.number().min(0).optional(),
  source: Joi.string().optional(),
  technicalRequirements: Joi.string().allow('', null).optional()
});

export const followUpSchema = Joi.object({
  notes: Joi.string().required(),
  nextFollowUpDate: Joi.date().optional()
});

export const quotationSchema = Joi.object({
  enquiryCode: Joi.string().allow('', null).optional(),
  customerId: Joi.string().optional(),
  customerName: Joi.string().required(),
  productId: Joi.string().optional(),
  productName: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  unitPrice: Joi.number().min(0).required(),
  totalAmount: Joi.number().min(0).optional(),
  paymentTerms: Joi.string().optional(),
  validUntil: Joi.date().optional()
});

export const reviseQuotationSchema = Joi.object({
  unitPrice: Joi.number().min(0).required(),
  quantity: Joi.number().min(1).optional(),
  negotiationNotes: Joi.string().allow('', null).optional()
});

export const proformaInvoiceSchema = Joi.object({
  quotationCode: Joi.string().required(),
  customerId: Joi.string().optional(),
  customerName: Joi.string().required(),
  totalAmount: Joi.number().min(0).required(),
  advanceRequired: Joi.number().min(0).required(),
  balanceDue: Joi.number().min(0).optional(),
  paymentTerms: Joi.string().optional()
});

export const cpoSchema = Joi.object({
  cpoNumber: Joi.string().required(),
  quotationCode: Joi.string().required(),
  customerId: Joi.string().optional(),
  customerName: Joi.string().required(),
  orderValue: Joi.number().min(0).required(),
  deliveryLeadTime: Joi.string().optional()
});

export const paymentSchema = Joi.object({
  salesOrderCode: Joi.string().required(),
  customerId: Joi.string().optional(),
  customerName: Joi.string().required(),
  paymentType: Joi.string().valid('Advance', 'Milestone', 'Final Balance', 'Refund').required(),
  amount: Joi.number().min(1).required(),
  paymentMode: Joi.string().valid('NEFT/RTGS', 'Cheque', 'UPI', 'Net Banking', 'Cash').optional(),
  referenceNumber: Joi.string().allow('', null).optional(),
  notes: Joi.string().allow('', null).optional()
});

export const confirmOrderSchema = Joi.object({
  enquiryCode: Joi.string().allow('', null).optional(),
  quotationCode: Joi.string().required(),
  cpoNumber: Joi.string().required(),
  customerId: Joi.string().optional(),
  customerName: Joi.string().required(),
  productId: Joi.string().optional(),
  productName: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  unitPrice: Joi.number().min(0).required(),
  orderValue: Joi.number().min(0).required(),
  advanceReceived: Joi.number().min(0).default(0),
  paymentArrangement: Joi.string().optional()
});

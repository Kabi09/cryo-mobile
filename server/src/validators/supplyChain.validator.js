import Joi from 'joi';

export const purchaseOrderSchema = Joi.object({
  supplierCode: Joi.string().required(),
  supplierName: Joi.string().required(),
  materialRequestCode: Joi.string().allow('', null).optional(),
  items: Joi.array().items(
    Joi.object({
      materialCode: Joi.string().required(),
      materialName: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      unitPrice: Joi.number().min(0).required(),
      totalPrice: Joi.number().min(0).required()
    })
  ).min(1).required(),
  totalAmount: Joi.number().min(0).required(),
  expectedDeliveryDate: Joi.date().optional(),
  notes: Joi.string().allow('', null).optional()
});

export const grnSchema = Joi.object({
  purchaseOrderCode: Joi.string().required(),
  supplierCode: Joi.string().required(),
  supplierName: Joi.string().required(),
  invoiceNumber: Joi.string().allow('', null).optional(),
  items: Joi.array().items(
    Joi.object({
      materialCode: Joi.string().required(),
      materialName: Joi.string().required(),
      receivedQty: Joi.number().min(0).required(),
      acceptedQty: Joi.number().min(0).required(),
      rejectedQty: Joi.number().min(0).default(0),
      unit: Joi.string().default('Pieces')
    })
  ).min(1).required(),
  notes: Joi.string().allow('', null).optional()
});

export const materialIssueSchema = Joi.object({
  materialRequestCode: Joi.string().required(),
  productionOrderCode: Joi.string().allow('', null).optional(),
  issueType: Joi.string().valid('Partial Issue', 'Remaining Issue', 'Full Issue').default('Partial Issue'),
  items: Joi.array().items(
    Joi.object({
      materialCode: Joi.string().required(),
      materialName: Joi.string().required(),
      quantityIssued: Joi.number().min(1).required(),
      unit: Joi.string().default('Pieces')
    })
  ).min(1).required(),
  notes: Joi.string().allow('', null).optional()
});

export const stockAdjustmentSchema = Joi.object({
  materialCode: Joi.string().required(),
  adjustedStock: Joi.number().min(0).required(),
  reason: Joi.string().required()
});

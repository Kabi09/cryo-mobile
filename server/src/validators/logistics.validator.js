import Joi from 'joi';

export const deliveryOrderSchema = Joi.object({
  salesOrderCode: Joi.string().required(),
  productionOrderCode: Joi.string().allow('', null).optional(),
  customerName: Joi.string().required(),
  destinationAddress: Joi.string().required(),
  destinationCity: Joi.string().required(),
  deliveryMethod: Joi.string().valid('Own Vehicle', 'Third-Party Courier', 'Customer Pickup').default('Own Vehicle'),
  vehicleCode: Joi.string().allow('', null).optional(),
  vehicleRegNumber: Joi.string().allow('', null).optional(),
  driverName: Joi.string().allow('', null).optional(),
  driverPhone: Joi.string().allow('', null).optional(),
  courierProviderCode: Joi.string().allow('', null).optional(),
  courierTrackingNumber: Joi.string().allow('', null).optional(),
  balancePaymentDue: Joi.number().min(0).default(0),
  notes: Joi.string().allow('', null).optional()
});

export const packingRecordSchema = Joi.object({
  deliveryOrderCode: Joi.string().required(),
  packingType: Joi.string().default('Wooden Crate + Polyethylene Wrap'),
  packageCount: Joi.number().min(1).default(1),
  grossWeightKg: Joi.number().min(1).optional(),
  checklist: Joi.array().items(
    Joi.object({
      item: Joi.string().required(),
      passed: Joi.boolean().default(true)
    })
  ).optional(),
  notes: Joi.string().allow('', null).optional()
});

export const deliveryChallanSchema = Joi.object({
  deliveryOrderCode: Joi.string().required(),
  salesOrderCode: Joi.string().required(),
  customerName: Joi.string().required(),
  shipToAddress: Joi.string().required(),
  vehicleRegNumber: Joi.string().allow('', null).optional(),
  driverName: Joi.string().allow('', null).optional(),
  driverPhone: Joi.string().allow('', null).optional(),
  items: Joi.array().items(
    Joi.object({
      productName: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      model: Joi.string().allow('', null).optional()
    })
  ).min(1).required()
});

export const dispatchSchema = Joi.object({
  sealNumber: Joi.string().allow('', null).optional(),
  notes: Joi.string().allow('', null).optional()
});

export const podSchema = Joi.object({
  receivedByCustomer: Joi.string().required(),
  customerPhone: Joi.string().allow('', null).optional(),
  signedSignatureData: Joi.string().allow('', null).optional(),
  conditionOnArrival: Joi.string().default('Good Condition (No Transit Damage)'),
  balanceCollected: Joi.number().min(0).default(0),
  paymentMode: Joi.string().valid('Cheque', 'NEFT/RTGS', 'UPI', 'Cash').default('Cheque'),
  paymentRefNumber: Joi.string().allow('', null).optional(),
  notes: Joi.string().allow('', null).optional()
});

export const deliveryExpenseSchema = Joi.object({
  deliveryOrderCode: Joi.string().required(),
  category: Joi.string().valid('Fuel', 'Toll Plaza', 'Driver Allowance', 'Third-Party Freight', 'Unloading Labor', 'Maintenance').required(),
  amount: Joi.number().min(1).required(),
  receiptRef: Joi.string().allow('', null).optional(),
  paidBy: Joi.string().optional()
});

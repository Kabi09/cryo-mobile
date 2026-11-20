import Joi from 'joi';

export const createProductionOrderSchema = Joi.object({
  salesOrderCode: Joi.string().required(),
  customerName: Joi.string().required(),
  productId: Joi.string().optional(),
  productCode: Joi.string().required(),
  productName: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  targetCompletionDate: Joi.date().optional()
});

export const bomSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      materialCode: Joi.string().required(),
      materialName: Joi.string().required(),
      unit: Joi.string().default('Pieces'),
      quantityPerUnit: Joi.number().min(0.01).required(),
      totalQuantity: Joi.number().min(0.01).required()
    })
  ).min(1).required()
});

export const materialRequestSchema = Joi.object({
  productionOrderCode: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      materialCode: Joi.string().required(),
      materialName: Joi.string().required(),
      unit: Joi.string().default('Pieces'),
      requiredQty: Joi.number().min(1).required()
    })
  ).min(1).required(),
  notes: Joi.string().allow('', null).optional()
});

export const materialReceiptSchema = Joi.object({
  productionOrderCode: Joi.string().required(),
  materialRequestCode: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      materialCode: Joi.string().required(),
      materialName: Joi.string().required(),
      quantityReceived: Joi.number().min(1).required(),
      condition: Joi.string().optional()
    })
  ).min(1).required(),
  notes: Joi.string().allow('', null).optional()
});

export const dailyUpdateSchema = Joi.object({
  stageName: Joi.string().required(),
  progressPercentage: Joi.number().min(0).max(100).required(),
  shift: Joi.string().optional(),
  notes: Joi.string().allow('', null).optional()
});

export const qualityInspectionSchema = Joi.object({
  productionOrderCode: Joi.string().required(),
  productCode: Joi.string().required(),
  inspectedQuantity: Joi.number().min(1).required(),
  result: Joi.string().valid('Passed', 'Rework Required', 'Failed').required(),
  testedParameters: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      expected: Joi.string().required(),
      actual: Joi.string().required(),
      pass: Joi.boolean().default(true)
    })
  ).min(1).required(),
  notes: Joi.string().allow('', null).optional()
});

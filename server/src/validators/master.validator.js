import Joi from 'joi';

export const customerSchema = Joi.object({
  code: Joi.string().optional(),
  name: Joi.string().required(),
  contactPerson: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  gstin: Joi.string().allow('', null).optional(),
  creditLimit: Joi.number().min(0).optional(),
  status: Joi.string().valid('Active', 'Suspended', 'Inactive').optional()
});

export const productSchema = Joi.object({
  code: Joi.string().optional(),
  sku: Joi.string().required(),
  name: Joi.string().required(),
  model: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().allow('', null).optional(),
  specifications: Joi.object().optional(),
  status: Joi.string().valid('Active', 'Draft', 'Discontinued').optional()
});

export const materialSchema = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required(),
  unit: Joi.string().required(),
  currentStock: Joi.number().min(0).default(0),
  minStock: Joi.number().min(0).default(0),
  unitPrice: Joi.number().min(0).default(0),
  spec: Joi.string().allow('', null).optional(),
  category: Joi.string().optional(),
  status: Joi.string().valid('Active', 'Discontinued').optional()
});

export const supplierSchema = Joi.object({
  code: Joi.string().optional(),
  name: Joi.string().required(),
  contactPerson: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  gstin: Joi.string().allow('', null).optional(),
  materialsSupplied: Joi.array().items(Joi.string()).optional()
});

export const vehicleSchema = Joi.object({
  code: Joi.string().optional(),
  regNumber: Joi.string().required(),
  vehicleType: Joi.string().required(),
  capacity: Joi.string().required(),
  driverName: Joi.string().required(),
  driverPhone: Joi.string().required(),
  status: Joi.string().valid('Available', 'In Transit', 'Maintenance').optional()
});

export const courierProviderSchema = Joi.object({
  code: Joi.string().optional(),
  name: Joi.string().required(),
  serviceType: Joi.string().required(),
  phone: Joi.string().required(),
  contactPerson: Joi.string().required(),
  trackingUrlTemplate: Joi.string().allow('', null).optional(),
  status: Joi.string().valid('Active', 'Inactive').optional()
});

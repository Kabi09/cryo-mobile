import Joi from 'joi';

export const createEmployeeSchema = Joi.object({
  code: Joi.string().optional(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  designation: Joi.string().required(),
  department: Joi.string().valid('sales', 'production', 'supply-chain', 'logistics', 'admin', 'employees').required(),
  status: Joi.string().valid('Active', 'On Leave', 'Resigned', 'Terminated').optional()
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  designation: Joi.string().optional(),
  department: Joi.string().valid('sales', 'production', 'supply-chain', 'logistics', 'admin', 'employees').optional(),
  status: Joi.string().valid('Active', 'On Leave', 'Resigned', 'Terminated').optional()
});

export const createUserAccountSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  employeeId: Joi.string().optional(),
  role: Joi.string().required(),
  isAdmin: Joi.boolean().default(false),
  departments: Joi.array().items(Joi.string()).default([]),
  permissions: Joi.object().optional()
});

export const updatePermissionsSchema = Joi.object({
  departments: Joi.array().items(Joi.string()).optional(),
  permissions: Joi.object().required()
});

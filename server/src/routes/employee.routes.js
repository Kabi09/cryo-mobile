import express from 'express';
import {
  getEmployees, createEmployee, getEmployeeById, updateEmployee,
  getDepartments, getRoles,
  getUserAccounts, createUserAccount, updateUserPermissions
} from '../controllers/employees/employeeController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin, requireAction } from '../middleware/permission.js';
import { validate } from '../middleware/validate.js';
import {
  createEmployeeSchema, updateEmployeeSchema,
  createUserAccountSchema, updatePermissionsSchema
} from '../validators/employee.validator.js';

const router = express.Router();

router.use(authenticate);

// Employee Directory
router.get('/', requireAction('employees', 'view'), getEmployees);
router.post('/', requireAction('employees', 'create'), validate(createEmployeeSchema), createEmployee);
router.get('/departments/list', getDepartments);
router.get('/roles/list', getRoles);
router.get('/:id', requireAction('employees', 'view'), getEmployeeById);
router.put('/:id', requireAction('employees', 'edit'), validate(updateEmployeeSchema), updateEmployee);

// User Accounts & Access Control (Admin only)
router.get('/accounts/list', requireAdmin, getUserAccounts);
router.post('/accounts', requireAdmin, validate(createUserAccountSchema), createUserAccount);
router.put('/accounts/:id/permissions', requireAdmin, validate(updatePermissionsSchema), updateUserPermissions);

export default router;

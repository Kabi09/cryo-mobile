import express from 'express';
import {
  getCustomers, createCustomer, getCustomerById, updateCustomer,
  getProducts, createProduct, getProductById, updateProduct,
  getMaterials, createMaterial, getMaterialById, updateMaterial,
  getSuppliers, createSupplier,
  getVehicles, createVehicle,
  getCourierProviders, createCourierProvider
} from '../controllers/master/masterController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin, requireAction } from '../middleware/permission.js';
import { validate } from '../middleware/validate.js';
import {
  customerSchema, productSchema, materialSchema,
  supplierSchema, vehicleSchema, courierProviderSchema
} from '../validators/master.validator.js';

const router = express.Router();

router.use(authenticate);

// Customers
router.get('/customers', getCustomers);
router.post('/customers', requireAction('sales', 'create'), validate(customerSchema), createCustomer);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', requireAction('sales', 'edit'), updateCustomer);

// Products
router.get('/products', getProducts);
router.post('/products', requireAdmin, validate(productSchema), createProduct);
router.get('/products/:id', getProductById);
router.put('/products/:id', requireAdmin, updateProduct);

// Materials
router.get('/materials', getMaterials);
router.post('/materials', requireAction('supply-chain', 'create'), validate(materialSchema), createMaterial);
router.get('/materials/:id', getMaterialById);
router.put('/materials/:id', requireAction('supply-chain', 'edit'), updateMaterial);

// Suppliers
router.get('/suppliers', getSuppliers);
router.post('/suppliers', requireAction('supply-chain', 'create'), validate(supplierSchema), createSupplier);

// Vehicles
router.get('/vehicles', getVehicles);
router.post('/vehicles', requireAction('logistics', 'create'), validate(vehicleSchema), createVehicle);

// Courier Providers
router.get('/couriers', getCourierProviders);
router.post('/couriers', requireAction('logistics', 'create'), validate(courierProviderSchema), createCourierProvider);

export default router;

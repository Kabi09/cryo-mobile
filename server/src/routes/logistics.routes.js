import express from 'express';
import {
  getDeliveryOrders, createDeliveryOrder, getDeliveryOrderById,
  createPackingRecord, createDeliveryChallan,
  dispatchDeliveryOrder, recordPOD,
  getDeliveryExpenses, createDeliveryExpense
} from '../controllers/logistics/logisticsController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAction } from '../middleware/permission.js';
import { validate } from '../middleware/validate.js';
import {
  deliveryOrderSchema, packingRecordSchema, deliveryChallanSchema,
  dispatchSchema, podSchema, deliveryExpenseSchema
} from '../validators/logistics.validator.js';

const router = express.Router();

router.use(authenticate);

// Delivery Orders
router.get('/orders', requireAction('logistics', 'view'), getDeliveryOrders);
router.post('/orders', requireAction('logistics', 'create'), validate(deliveryOrderSchema), createDeliveryOrder);
router.get('/orders/:id', requireAction('logistics', 'view'), getDeliveryOrderById);

// Packaging & Challan
router.post('/packing', requireAction('logistics', 'create'), validate(packingRecordSchema), createPackingRecord);
router.post('/challans', requireAction('logistics', 'create'), validate(deliveryChallanSchema), createDeliveryChallan);

// Dispatch & Proof of Delivery (POD)
router.post('/orders/:id/dispatch', requireAction('logistics', 'workflow'), validate(dispatchSchema), dispatchDeliveryOrder);
router.post('/orders/:id/pod', requireAction('logistics', 'workflow'), validate(podSchema), recordPOD);

// Delivery Expenses
router.get('/expenses', requireAction('logistics', 'view'), getDeliveryExpenses);
router.post('/expenses', requireAction('logistics', 'create'), validate(deliveryExpenseSchema), createDeliveryExpense);

export default router;

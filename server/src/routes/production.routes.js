import express from 'express';
import {
  getProductionOrders, createProductionOrder, getProductionOrderById,
  confirmBOM, createMaterialRequest, confirmMaterialReceipt,
  logDailyUpdate, submitQualityInspection
} from '../controllers/production/productionController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAction } from '../middleware/permission.js';
import { validate } from '../middleware/validate.js';
import {
  createProductionOrderSchema, bomSchema, materialRequestSchema,
  materialReceiptSchema, dailyUpdateSchema, qualityInspectionSchema
} from '../validators/production.validator.js';

const router = express.Router();

router.use(authenticate);

// Orders
router.get('/orders', requireAction('production', 'view'), getProductionOrders);
router.post('/orders', requireAction('production', 'create'), validate(createProductionOrderSchema), createProductionOrder);
router.get('/orders/:id', requireAction('production', 'view'), getProductionOrderById);

// BOM Confirmation
router.post('/orders/:id/bom', requireAction('production', 'workflow'), validate(bomSchema), confirmBOM);

// Material Request & Physical Shopfloor Receipt
router.post('/material-requests', requireAction('production', 'create'), validate(materialRequestSchema), createMaterialRequest);
router.post('/material-receipts', requireAction('production', 'workflow'), validate(materialReceiptSchema), confirmMaterialReceipt);

// Progress Updates & QC
router.post('/orders/:id/daily-updates', requireAction('production', 'create'), validate(dailyUpdateSchema), logDailyUpdate);
router.post('/quality-inspections', requireAction('production', 'workflow'), validate(qualityInspectionSchema), submitQualityInspection);

export default router;

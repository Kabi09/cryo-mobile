import express from 'express';
import {
  getPurchaseOrders, createPurchaseOrder, getPurchaseOrderById,
  getGRNs, createGRN,
  getMaterialIssues, createMaterialIssue,
  createStockAdjustment, getStockMovements
} from '../controllers/supply-chain/supplyChainController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAction } from '../middleware/permission.js';
import { validate } from '../middleware/validate.js';
import {
  purchaseOrderSchema, grnSchema,
  materialIssueSchema, stockAdjustmentSchema
} from '../validators/supplyChain.validator.js';

const router = express.Router();

router.use(authenticate);

// Purchase Orders
router.get('/purchase-orders', requireAction('supply-chain', 'view'), getPurchaseOrders);
router.post('/purchase-orders', requireAction('supply-chain', 'create'), validate(purchaseOrderSchema), createPurchaseOrder);
router.get('/purchase-orders/:id', requireAction('supply-chain', 'view'), getPurchaseOrderById);

// Goods Receipt Notes (GRN)
router.get('/grns', requireAction('supply-chain', 'view'), getGRNs);
router.post('/grns', requireAction('supply-chain', 'workflow'), validate(grnSchema), createGRN);

// Material Issues
router.get('/material-issues', requireAction('supply-chain', 'view'), getMaterialIssues);
router.post('/material-issues', requireAction('supply-chain', 'workflow'), validate(materialIssueSchema), createMaterialIssue);

// Stock Adjustments & Movements
router.post('/stock-adjustments', requireAction('supply-chain', 'workflow'), validate(stockAdjustmentSchema), createStockAdjustment);
router.get('/stock-movements', requireAction('supply-chain', 'view'), getStockMovements);

export default router;

import express from 'express';
import {
  getSalesReport,
  getProductionReport,
  getInventoryReport,
  getProcurementReport,
  getLogisticsReport,
  getFinancialsReport,
  getOrderStatusReport
} from '../controllers/admin/reportController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/permission.js';

const router = express.Router();

router.use(authenticate);
router.use(requireAdmin);

// 7 Centralized Reporting Endpoints
router.get('/sales', getSalesReport);
router.get('/production', getProductionReport);
router.get('/inventory', getInventoryReport);
router.get('/procurement', getProcurementReport);
router.get('/logistics', getLogisticsReport);
router.get('/financials', getFinancialsReport);
router.get('/order-status', getOrderStatusReport);

export default router;

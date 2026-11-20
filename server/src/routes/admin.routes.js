import express from 'express';
import {
  getDashboardOverview, getOrderJourney,
  holdOrder, resumeOrder, cancelOrder,
  getAuditLogs
} from '../controllers/admin/adminController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/permission.js';

const router = express.Router();

router.use(authenticate);

// Centralized Admin Dashboard (Admin required)
router.get('/dashboard', requireAdmin, getDashboardOverview);

// Complete 22-Stage Order Journey (Accessible to Admin and Department Staff)
router.get('/orders/:id/journey', getOrderJourney);

// Order Status Overrides (Admin only)
router.post('/orders/:id/hold', requireAdmin, holdOrder);
router.post('/orders/:id/resume', requireAdmin, resumeOrder);
router.post('/orders/:id/cancel', requireAdmin, cancelOrder);

// Audit Logs (Admin only)
router.get('/audit-logs', requireAdmin, getAuditLogs);

export default router;

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { env } from './config/env.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { sendSuccess } from './utils/response.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import masterRoutes from './routes/master.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import salesRoutes from './routes/sales.routes.js';
import productionRoutes from './routes/production.routes.js';
import supplyChainRoutes from './routes/supplyChain.routes.js';
import logisticsRoutes from './routes/logistics.routes.js';
import adminRoutes from './routes/admin.routes.js';
import reportRoutes from './routes/report.routes.js';

const app = express();

// Security and HTTP middleware
app.use(helmet());
app.use(cors({
  origin: env.corsOrigin === '*' ? true : env.corsOrigin,
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging (skip in test environment)
if (env.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Global API Health Endpoint
app.get('/api/v1/health', (_req, res) => {
  return sendSuccess(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: env.nodeEnv,
    uptime: process.uptime()
  }, 'Cryo Enterprise ERP API is operational');
});

// Mount modular departmental routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/master', masterRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/production', productionRoutes);
app.use('/api/v1/supply-chain', supplyChainRoutes);
app.use('/api/v1/logistics', logisticsRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/reports', reportRoutes);

// Fallback handlers
app.use(notFound);
app.use(errorHandler);

export default app;

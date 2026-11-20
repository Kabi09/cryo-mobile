import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import { env } from '../src/config/env.js';

describe('Order 22-Stage Journey & Admin Reporting Test Suite', () => {
  let adminToken = '';

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(env.mongodbUri);
    }
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@cryoerp.com', password: 'CryoPass@2026' });
    adminToken = res.body.data.accessToken;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('GET /api/v1/admin/orders/SO-001/journey - aggregates all 22 workflow stages', async () => {
    const res = await request(app)
      .get('/api/v1/admin/orders/SO-001/journey')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.order.code).toBe('SO-001');
    expect(res.body.data.stages).toHaveLength(22);
    expect(res.body.data.stages[0].title).toBe('Customer Enquiry Received');
    expect(res.body.data.stages[21].title).toBe('Delivery Tracking, POD & Balance Payment Collected');
    expect(res.body.data.linkedDocuments.quotation).toBeDefined();
    expect(res.body.data.linkedDocuments.productionOrder).toBeDefined();
    expect(res.body.data.linkedDocuments.deliveryOrder).toBeDefined();
  });

  test('GET /api/v1/reports/sales - returns aggregated sales KPIs', async () => {
    const res = await request(app)
      .get('/api/v1/reports/sales')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.totalRevenue).toBe(150000);
    expect(res.body.data.totalUnits).toBe(2);
  });

  test('GET /api/v1/reports/inventory - calculates inventory valuation and stock levels', async () => {
    const res = await request(app)
      .get('/api/v1/reports/inventory')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.totalItems).toBeGreaterThanOrEqual(3);
    expect(res.body.data.lowStockCount).toBeGreaterThanOrEqual(1);
  });
});

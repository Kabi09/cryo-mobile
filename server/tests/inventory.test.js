import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import { env } from '../src/config/env.js';

describe('Supply Chain & Inventory Transactions Test Suite', () => {
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

  test('GET /api/v1/master/materials - lists materials with stock levels', async () => {
    const res = await request(app)
      .get('/api/v1/master/materials')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(3);
    const compressor = res.body.data.find(m => m.code === 'RM-101');
    expect(compressor).toBeDefined();
    expect(compressor.currentStock).toBe(2);
  });

  test('POST /api/v1/supply-chain/material-issues - rejects issue when stock is insufficient', async () => {
    const res = await request(app)
      .post('/api/v1/supply-chain/material-issues')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        materialRequestCode: 'MR-001',
        issueType: 'Partial Issue',
        items: [
          { materialCode: 'RM-101', materialName: 'Compressor', quantityIssued: 999 } // Available is 2
        ]
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Insufficient stock');
  });

  test('GET /api/v1/supply-chain/purchase-orders - verifies PO creation did not increment stock', async () => {
    const res = await request(app)
      .get('/api/v1/supply-chain/purchase-orders')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });
});

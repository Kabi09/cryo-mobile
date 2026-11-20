import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import { env } from '../src/config/env.js';

describe('Auth & Permission API Test Suite', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(env.mongodbUri);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  let adminToken = '';
  let salesToken = '';

  test('POST /api/v1/auth/login - valid admin login', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@cryoerp.com',
        password: 'CryoPass@2026'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.isAdmin).toBe(true);
    adminToken = res.body.data.accessToken;
  });

  test('POST /api/v1/auth/login - invalid password returns 401', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@cryoerp.com',
        password: 'WrongPassword'
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/v1/auth/login - sales executive login', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'arun@example.com',
        password: 'CryoPass@2026'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.isAdmin).toBe(false);
    expect(res.body.data.user.departments).toContain('sales');
    salesToken = res.body.data.accessToken;
  });

  test('GET /api/v1/auth/me - authenticated profile', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe('admin@cryoerp.com');
  });

  test('GET /api/v1/auth/me - without token returns 401', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.status).toBe(401);
  });

  test('GET /api/v1/admin/dashboard - admin succeeds, sales fails with 403', async () => {
    const adminRes = await request(app)
      .get('/api/v1/admin/dashboard')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(adminRes.status).toBe(200);
    expect(adminRes.body.data.kpis).toBeDefined();

    const salesRes = await request(app)
      .get('/api/v1/admin/dashboard')
      .set('Authorization', `Bearer ${salesToken}`);
    expect(salesRes.status).toBe(403);
  });
});

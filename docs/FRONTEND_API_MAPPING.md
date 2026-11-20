# Cryo Enterprise ERP – Frontend to Backend API Mapping

## 1. Overview

This document maps every existing React frontend store method, service call, and screen action from Phase 3 (`src/stores/erpStore.js`, `src/stores/authStore.js`, `src/services/apiClient.js`) to its corresponding Phase 4 backend REST endpoint.

---

## 2. Authentication & Persona Mapping

| Frontend Function | Current Mock Logic (`src/stores/authStore.js`) | Phase 4 Backend API | Request Payload | Response Mapping |
|---|---|---|---|---|
| `login(email, password)` | Sets active persona in local memory | `POST /api/v1/auth/login` | `{ email, password }` | Stores `accessToken` in localStorage & user object in Zustand |
| `logout()` | Clears Zustand session | `POST /api/v1/auth/logout` | None (Bearer header) | Clears auth tokens |
| `refreshSession()` | N/A | `POST /api/v1/auth/refresh` | `{ refreshToken }` | Updates `accessToken` |
| `fetchMe()` | Reads mock persona | `GET /api/v1/auth/me` | None (Bearer header) | Populates user permissions and employee profile |

### Mock Persona Credentials
- **Admin**: `admin@cryoerp.com` / `CryoPass@2026`
- **Multi-Dept (Sales Full + Prod View)**: `arun@example.com` / `CryoPass@2026`
- **Single-Dept (Supply Chain)**: `murugan@cryoerp.com` / `CryoPass@2026`
- **View-Only Employee**: `viewer@cryoerp.com` / `CryoPass@2026`
- **Draft User**: `kavya@cryoerp.com` / `CryoPass@2026`

---

## 3. Departmental Store & Screen Actions Mapping

### 3.1 Shared Master Data
| Frontend Screen | Current Mock Source | Backend Endpoint | Status |
|---|---|---|---|
| Customer List & Create | `initialDB.customers` | `GET /api/v1/master/customers`<br>`POST /api/v1/master/customers` | Ready for integration |
| Product Catalog | `initialDB.products` | `GET /api/v1/master/products`<br>`POST /api/v1/master/products` | Ready for integration |
| Material Stock List | `initialDB.materials` | `GET /api/v1/master/materials`<br>`POST /api/v1/master/materials` | Ready for integration |
| Supplier Directory | `initialDB.suppliers` | `GET /api/v1/master/suppliers`<br>`POST /api/v1/master/suppliers` | Ready for integration |
| Vehicle Fleet List | `initialDB.vehicles` | `GET /api/v1/master/vehicles`<br>`POST /api/v1/master/vehicles` | Ready for integration |
| Courier Partners | `initialDB.couriers` | `GET /api/v1/master/couriers`<br>`POST /api/v1/master/couriers` | Ready for integration |

### 3.2 Sales Management
| Frontend Screen / Action | Store Method | Backend Endpoint | Stage |
|---|---|---|---|
| Enquiry List | `initialDB.enquiries` | `GET /api/v1/sales/enquiries` | Stage 1 |
| Create Enquiry | `addEnquiry()` | `POST /api/v1/sales/enquiries` | Stage 1 |
| Qualify Enquiry | Local state update | `POST /api/v1/sales/enquiries/:id/qualify` | Stage 3 |
| Quotation List & Create | `initialDB.quotations` | `GET /api/v1/sales/quotations`<br>`POST /api/v1/sales/quotations` | Stage 4 |
| Revise Quotation | Local state update | `POST /api/v1/sales/quotations/:id/revise` | Stage 7 |
| Accept Quotation | Local state update | `POST /api/v1/sales/quotations/:id/accept` | Stage 8 |
| Proforma Invoice | Local state | `POST /api/v1/sales/proforma-invoices` | Stage 9 |
| Customer PO (CPO) | `initialDB.order.cpoId` | `POST /api/v1/sales/cpos` | Stage 10 |
| Record Advance Payment | Local state | `POST /api/v1/sales/payments` | Stage 11 |
| Confirm Sales Order | `initialDB.salesOrders` | `POST /api/v1/sales/orders/confirm` | Stage 12 |

### 3.3 Production Management
| Frontend Screen / Action | Store Method | Backend Endpoint | Stage |
|---|---|---|---|
| Production Order List | `initialDB.productionOrders` | `GET /api/v1/production/orders` | Stage 13 |
| Confirm BOM | `order.bomConfirmed` | `POST /api/v1/production/orders/:id/bom` | Stage 13 |
| Material Request | `initialDB.materialRequests` | `POST /api/v1/production/material-requests` | Stage 14 |
| Confirm Material Receipt | Local state | `POST /api/v1/production/material-receipts` | Stage 18 |
| Log Daily Assembly Progress | `order.prodProgress` | `POST /api/v1/production/orders/:id/daily-updates` | Stage 19 |
| Quality Inspection Pass | `order.qcStatus = 'Passed'` | `POST /api/v1/production/quality-inspections` | Stage 20 |

### 3.4 Supply Chain Management
| Frontend Screen / Action | Store Method | Backend Endpoint | Stage |
|---|---|---|---|
| Stock Check & Partial Issue | `issueMaterialPartial()` | `POST /api/v1/supply-chain/material-issues` | Stage 15 |
| Create PO for Shortage | `createPO()` | `POST /api/v1/supply-chain/purchase-orders` | Stage 16 |
| Goods Receipt Note (GRN) | `confirmGRN()` | `POST /api/v1/supply-chain/grns` | Stage 17 |
| Remaining Material Issue | `issueMaterialFull()` | `POST /api/v1/supply-chain/material-issues` | Stage 18 |
| Stock Movement History | N/A | `GET /api/v1/supply-chain/stock-movements` | Audit |

### 3.5 Logistics & Delivery Management
| Frontend Screen / Action | Store Method | Backend Endpoint | Stage |
|---|---|---|---|
| Delivery Plan List | `initialDB.deliveryPlans` | `GET /api/v1/logistics/orders` | Stage 21 |
| Packing Verification | `order.pkgId` | `POST /api/v1/logistics/packing` | Stage 21 |
| Delivery Challan | `order.dcId` | `POST /api/v1/logistics/challans` | Stage 21 |
| Dispatch Vehicle | `dispatchOrder()` | `POST /api/v1/logistics/orders/:id/dispatch` | Stage 21 |
| Proof of Delivery (POD) & Balance Collection | `recordPOD()` | `POST /api/v1/logistics/orders/:id/pod` | Stage 22 |
| Delivery Expenses | Local state | `GET /api/v1/logistics/expenses`<br>`POST /api/v1/logistics/expenses` | Financials |

### 3.6 Centralized Admin & Reports
| Frontend Screen | Current Mock Source | Backend Endpoint | Status |
|---|---|---|---|
| Central Admin Dashboard | Computed from `erpStore` | `GET /api/v1/admin/dashboard` | Ready |
| Order 22-Stage Journey | `order.completedStageNum` | `GET /api/v1/admin/orders/:id/journey` | Ready |
| Order Hold / Cancel | N/A | `POST /api/v1/admin/orders/:id/hold`<br>`POST /api/v1/admin/orders/:id/cancel` | Ready |
| Audit Logs | N/A | `GET /api/v1/admin/audit-logs` | Ready |
| 7 Centralized Reports | Computed mock data | `GET /api/v1/reports/*` (sales, production, inventory, procurement, logistics, financials, order-status) | Ready |

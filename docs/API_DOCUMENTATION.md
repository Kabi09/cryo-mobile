# Cryo Enterprise ERP – Complete REST API Documentation

## 1. Standard API Architecture

- **Base URL**: `http://localhost:5000/api/v1`
- **Authentication**: JWT Bearer token via `Authorization: Bearer <accessToken>` header.
- **Token Rotation**:
  - Access Token expires in 15 minutes (`JWT_EXPIRES_IN=15m`).
  - Refresh Token expires in 7 days (`JWT_REFRESH_EXPIRES_IN=7d`).
- **Response Structure**:
```json
{
  "success": true,
  "message": "Human readable message",
  "data": { ... },
  "meta": { ... }
}
```
- **Error Structure**:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    { "field": "email", "message": "A valid email address is required" }
  ]
}
```

---

## 2. API Endpoints Directory

### 2.1 System & Health
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/health` | None | API uptime, MongoDB connection status, and environment |

### 2.2 Authentication & Profile (`/api/v1/auth`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | None | Authenticate with `{ email, password }` -> returns `{ user, accessToken, refreshToken }` |
| `POST` | `/api/v1/auth/refresh` | None | Rotate and issue new access token using `{ refreshToken }` |
| `POST` | `/api/v1/auth/logout` | Bearer | Invalidate active refresh session |
| `GET` | `/api/v1/auth/me` | Bearer | Get current user details, assigned departments, and granular permissions |
| `POST` | `/api/v1/auth/change-password`| Bearer | Update account password using `{ currentPassword, newPassword }` |
| `POST` | `/api/v1/auth/reset-password` | Admin | Reset password for any user account |

### 2.3 Master Data (`/api/v1/master`)
| Method | Endpoint | Permission | Description |
|---|---|---|---|
| `GET` | `/api/v1/master/customers` | Authenticated | List all customers (supports `?search=&status=`) |
| `POST` | `/api/v1/master/customers` | Sales Create | Register customer (auto `CUST-xxx`) |
| `GET` | `/api/v1/master/customers/:id` | Authenticated | Get customer by ID or code |
| `PUT` | `/api/v1/master/customers/:id` | Sales Edit | Update customer details |
| `GET` | `/api/v1/master/products` | Authenticated | List products (`?category=&status=`) |
| `POST` | `/api/v1/master/products` | Admin | Create product specification (auto `PRD-xxx`) |
| `GET` | `/api/v1/master/products/:id` | Authenticated | Get product by ID or code |
| `PUT` | `/api/v1/master/products/:id` | Admin | Update product details |
| `GET` | `/api/v1/master/materials` | Authenticated | List inventory items (`?lowStock=true`) |
| `POST` | `/api/v1/master/materials` | Supply Chain Create | Register raw material (does not increment stock) |
| `GET` | `/api/v1/master/materials/:id` | Authenticated | Get material by code (e.g. `RM-101`) |
| `PUT` | `/api/v1/master/materials/:id` | Supply Chain Edit | Update material specs or thresholds |
| `GET` | `/api/v1/master/suppliers` | Authenticated | List registered suppliers |
| `POST` | `/api/v1/master/suppliers` | Supply Chain Create | Register supplier |
| `GET` | `/api/v1/master/vehicles` | Authenticated | List fleet vehicles |
| `POST` | `/api/v1/master/vehicles` | Logistics Create | Register vehicle |
| `GET` | `/api/v1/master/couriers` | Authenticated | List third-party courier transport providers |
| `POST` | `/api/v1/master/couriers` | Logistics Create | Register courier partner |

### 2.4 Employee Management & Access Control (`/api/v1/employees`)
| Method | Endpoint | Permission | Description |
|---|---|---|---|
| `GET` | `/api/v1/employees` | Employees View | List active employees with department filter |
| `POST` | `/api/v1/employees` | Employees Create | Create employee record (auto `EMP-xxx`) |
| `GET` | `/api/v1/employees/departments/list`| Authenticated | Get all active departments |
| `GET` | `/api/v1/employees/roles/list` | Authenticated | Get predefined role templates |
| `GET` | `/api/v1/employees/:id` | Employees View | Get employee profile |
| `PUT` | `/api/v1/employees/:id` | Employees Edit | Update employee profile |
| `GET` | `/api/v1/employees/accounts/list` | Admin | List all user login accounts and active sessions |
| `POST` | `/api/v1/employees/accounts` | Admin | Provision user account with roles and permissions |
| `PUT` | `/api/v1/employees/accounts/:id/permissions` | Admin | Update department access and actions |

### 2.5 Sales Department (`/api/v1/sales`)
| Method | Endpoint | Permission | Description |
|---|---|---|---|
| `GET` | `/api/v1/sales/enquiries` | Sales View | List customer enquiries |
| `POST` | `/api/v1/sales/enquiries` | Sales Create | Create enquiry (auto `ENQ-xxx`) |
| `POST` | `/api/v1/sales/enquiries/:id/qualify`| Sales Workflow | Mark enquiry Qualified (Stage 3) |
| `POST` | `/api/v1/sales/enquiries/:id/follow-up`| Sales Create | Record client follow-up interaction |
| `GET` | `/api/v1/sales/quotations` | Sales View | List quotations |
| `POST` | `/api/v1/sales/quotations` | Sales Create | Generate quotation (auto `QT-xxx v1`) |
| `POST` | `/api/v1/sales/quotations/:id/revise` | Sales Workflow | Revise pricing/specs (supersedes old, creates `v2`) |
| `POST` | `/api/v1/sales/quotations/:id/accept` | Sales Workflow | Customer accepts quotation (Stage 8) |
| `GET` | `/api/v1/sales/proforma-invoices` | Sales View | List Proforma Invoices |
| `POST` | `/api/v1/sales/proforma-invoices` | Sales Create | Issue Proforma Invoice (auto `PI-xxx`) |
| `GET` | `/api/v1/sales/cpos` | Sales View | List Customer Purchase Orders |
| `POST` | `/api/v1/sales/cpos` | Sales Create | Log client PO (`CPO-xxx`, Stage 10) |
| `GET` | `/api/v1/sales/payments` | Sales View | View customer payment ledger |
| `POST` | `/api/v1/sales/payments` | Sales Workflow | Record & verify advance payment (Stage 11) |
| `GET` | `/api/v1/sales/orders` | Sales View | List all sales orders |
| `GET` | `/api/v1/sales/orders/:id` | Sales View | Get sales order details |
| `POST` | `/api/v1/sales/orders/confirm` | Sales Workflow | Confirm order -> emits Stage 12 `Sent to Production` |

### 2.6 Production Department (`/api/v1/production`)
| Method | Endpoint | Permission | Description |
|---|---|---|---|
| `GET` | `/api/v1/production/orders` | Production View | List production orders |
| `POST` | `/api/v1/production/orders` | Production Create | Initialize production order from confirmed SO (auto `PRO-xxx`) |
| `GET` | `/api/v1/production/orders/:id` | Production View | Get production order with BOM, MR, Updates, and QC |
| `POST` | `/api/v1/production/orders/:id/bom` | Production Workflow | Lock and confirm Bill of Materials (`BOM-xxx`) |
| `POST` | `/api/v1/production/material-requests`| Production Create | Submit requisition to supply chain (`MR-xxx`, Stage 14) |
| `POST` | `/api/v1/production/material-receipts`| Production Workflow | Confirm shopfloor receipt without duplicate inventory deduction (Stage 18) |
| `POST` | `/api/v1/production/orders/:id/daily-updates` | Production Create | Log assembly progress (25%, 50%, 75%, 100%, Stage 19) |
| `POST` | `/api/v1/production/quality-inspections` | Production Workflow | Log QC inspection; if passed, triggers handover to Logistics (Stage 20) |

### 2.7 Supply Chain & Warehouse (`/api/v1/supply-chain`)
| Method | Endpoint | Permission | Description |
|---|---|---|---|
| `GET` | `/api/v1/supply-chain/purchase-orders` | Supply Chain View | List POs |
| `POST` | `/api/v1/supply-chain/purchase-orders`| Supply Chain Create | Create PO for shortages (`PO-xxx`, Stage 16, does NOT modify stock) |
| `GET` | `/api/v1/supply-chain/purchase-orders/:id`| Supply Chain View | Get PO details |
| `GET` | `/api/v1/supply-chain/grns` | Supply Chain View | List Goods Receipt Notes |
| `POST` | `/api/v1/supply-chain/grns` | Supply Chain Workflow | Verify GRN (`GRN-xxx`, Stage 17, atomically increments stock & writes ledger) |
| `GET` | `/api/v1/supply-chain/material-issues` | Supply Chain View | List material issue vouchers |
| `POST` | `/api/v1/supply-chain/material-issues` | Supply Chain Workflow | Issue stock (`MI-xxx`, validates stock, atomically decrements stock & writes ledger) |
| `POST` | `/api/v1/supply-chain/stock-adjustments`| Supply Chain Workflow | Correct physical count variances (`ADJ-xxx`) |
| `GET` | `/api/v1/supply-chain/stock-movements` | Supply Chain View | Audit full chronological stock movement ledger |

### 2.8 Logistics & Delivery (`/api/v1/logistics`)
| Method | Endpoint | Permission | Description |
|---|---|---|---|
| `GET` | `/api/v1/logistics/orders` | Logistics View | List delivery consignments |
| `POST` | `/api/v1/logistics/orders` | Logistics Create | Create delivery plan (`DEL-xxx`, Own Vehicle / Courier) |
| `GET` | `/api/v1/logistics/orders/:id` | Logistics View | Consignment details with packing, challan, and POD |
| `POST` | `/api/v1/logistics/packing` | Logistics Create | Verify & seal packaging (`PKG-xxx`) |
| `POST` | `/api/v1/logistics/challans` | Logistics Create | Generate Delivery Challan (`DC-xxx`) |
| `POST` | `/api/v1/logistics/orders/:id/dispatch`| Logistics Workflow | Dispatch order (`status: In Transit`, vehicle status updated, Stage 21) |
| `POST` | `/api/v1/logistics/orders/:id/pod` | Logistics Workflow | Record Proof of Delivery (`POD-xxx`), collect balance payment (Stage 22 complete) |
| `GET` | `/api/v1/logistics/expenses` | Logistics View | List trip expenses |
| `POST` | `/api/v1/logistics/expenses` | Logistics Create | Log fuel, toll, or allowance expense (`EXP-xxx`) |

### 2.9 Centralized Admin & Reports (`/api/v1/admin` & `/api/v1/reports`)
| Method | Endpoint | Permission | Description |
|---|---|---|---|
| `GET` | `/api/v1/admin/dashboard` | Admin | Real-time enterprise totals, cash flow, and departmental bottlenecks |
| `GET` | `/api/v1/admin/orders/:id/journey` | Authenticated | Complete 22-stage end-to-end journey tracker with all linked documents |
| `POST` | `/api/v1/admin/orders/:id/hold` | Admin | Place order on administrative hold |
| `POST` | `/api/v1/admin/orders/:id/resume` | Admin | Resume order workflow |
| `POST` | `/api/v1/admin/orders/:id/cancel` | Admin | Administrative order cancellation |
| `GET` | `/api/v1/admin/audit-logs` | Admin | Query system audit trail (`?department=&resource=`) |
| `GET` | `/api/v1/reports/sales` | Admin | Sales pipeline, revenue, and product distribution |
| `GET` | `/api/v1/reports/production` | Admin | Production output, completion rates, and QC pass rates |
| `GET` | `/api/v1/reports/inventory` | Admin | Inventory valuation and reorder warning list |
| `GET` | `/api/v1/reports/procurement` | Admin | Supplier spend, delivery performance, and PO fulfillment |
| `GET` | `/api/v1/reports/logistics` | Admin | Fleet deliveries, in-transit status, and transport expenses |
| `GET` | `/api/v1/reports/financials` | Admin | Collections, receivables aging, and gross margin cash flow |
| `GET` | `/api/v1/reports/order-status` | Admin | Master order stage ledger (1-22) |

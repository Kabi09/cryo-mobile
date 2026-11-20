# Cryo Enterprise ERP – Backend Requirements Specification

## 1. Executive Summary & Architecture Overview

Cryo Enterprise ERP backend is designed as a clean, modular monolithic REST API built with Node.js, Express.js, MongoDB (Mongoose), and JavaScript ES Modules (`"type": "module"`). It provides centralized, role-based access to the complete order lifecycle across 5 departments (Sales, Production, Supply Chain, Logistics, Employee Management) plus an Executive Admin and Reporting module.

- **Base URL Prefix**: `/api/v1`
- **Module Architecture**:
  - `server/src/controllers/` (auth, sales, production, supply-chain, logistics, employees, admin, master-data, reports)
  - `server/src/models/` (Mongoose data models with strict schemas, indexes, and validation)
  - `server/src/services/` (atomic business transactions, inventory invariants, payment validation, document sequencing)
  - `server/src/routes/` (REST route definitions with middleware)
  - `server/src/middleware/` (JWT authentication, role/department permission enforcement, Joi input validation, centralized error handling)
  - `server/src/utils/` (standard response envelope, custom API error classes, atomic counter sequences)
  - `server/src/scripts/` (demo seed script `seed.js`)

---

## 2. Shared Master Data Requirements

| Entity | Collection | Key Fields | Frontend Screen / Need | API Endpoints | Business Rules |
|---|---|---|---|---|---|
| **Customer** | `customers` | `code` (CUST-xxx), `name`, `contactPerson`, `phone`, `email`, `city`, `address`, `gstin`, `creditLimit`, `status` | Sales, Admin Master Data | `GET /customers`<br>`POST /customers`<br>`GET /customers/:id`<br>`PUT /customers/:id` | Unique `code` and `gstin`. Case-insensitive email search. |
| **Product** | `products` | `code` (PRD-xxx), `sku`, `name`, `model`, `category`, `price`, `description`, `specifications`, `status` | Sales, Production, Admin | `GET /products`<br>`POST /products`<br>`GET /products/:id`<br>`PUT /products/:id` | Base prices in minor currency units or precise decimals. Model is unique. |
| **Material** | `materials` | `code` (MAT-xx / RM-xxx), `name`, `unit`, `minStock`, `currentStock`, `allocatedStock`, `specifications`, `category` | Supply Chain, Production BOM | `GET /materials`<br>`POST /materials`<br>`GET /materials/:id`<br>`PUT /materials/:id` | Creating a material does NOT increment stock. Stock changes only via GRN, Issue, Return, Adjustment. |
| **Supplier** | `suppliers` | `code` (SUP-xx), `name`, `contactPerson`, `phone`, `email`, `city`, `address`, `gstin`, `materialsSupplied`, `status` | Supply Chain POs | `GET /suppliers`<br>`POST /suppliers`<br>`GET /suppliers/:id`<br>`PUT /suppliers/:id` | Linked to Purchase Orders and GRNs. |
| **Vehicle** | `vehicles` | `regNumber`, `vehicleType`, `capacity`, `driverName`, `driverPhone`, `status` (Available, In Transit, Maintenance) | Logistics Fleet | `GET /vehicles`<br>`POST /vehicles`<br>`GET /vehicles/:id`<br>`PUT /vehicles/:id` | Status updates on dispatch and delivery completion. |
| **Courier Provider**| `courier_providers`| `code`, `name`, `serviceType`, `contactPerson`, `phone`, `trackingUrlTemplate`, `status` | Logistics Third-Party | `GET /couriers`<br>`POST /couriers`<br>`GET /couriers/:id`<br>`PUT /couriers/:id` | Generates customer tracking links. |

---

## 3. Department Requirements & Business Rules

### 3.1 Authentication & Employee Management
- **Models**: `UserAccount`, `Employee`, `Department`, `Role`, `Permission`, `RefreshSession`, `AuditLog`.
- **Personas**:
  - `admin@cryoerp.com`: Centralized Admin (Priya Nair) - Full access across all 5 departments & admin tools.
  - `arun@example.com`: Senior Sales Exec (Arun Kumar) - Sales (full CRUD + workflow), Production (view-only).
  - `murugan@cryoerp.com`: Stores Manager (Murugan S) - Supply Chain (full CRUD + workflow).
  - `viewer@cryoerp.com`: Auditor (Ramesh Viewer) - View-only across sales & production.
  - `kavya@cryoerp.com`: Draft Assistant (Kavya Drafts) - Create/edit draft only, no workflow approval/dispatch.
- **Tokens**: Access Token (JWT, 15 min expiry), Refresh Token (HTTP-only / rotation session in DB, 7 days).
- **Audit Logs**: Every mutation logs `userId`, `action`, `resource`, `resourceId`, `ip`, `userAgent`, `timestamp`.

### 3.2 Sales Management
- **Models**: `Enquiry`, `FollowUp`, `Quotation`, `ProformaInvoice`, `CustomerPurchaseOrder`, `SalesOrder`, `CustomerPayment`.
- **Workflow Stages**:
  - Stage 01: Enquiry Received (`status: New`)
  - Stage 02: Follow-up & Discussion (`status: In Discussion`)
  - Stage 03: Enquiry Qualified (`status: Qualified`)
  - Stage 04: Quotation Created (`QT-001 v1`)
  - Stage 05: Quotation Sent
  - Stage 06: Follow-up & Commercial Review
  - Stage 07: Negotiation & Revision (`QT-001 v2`)
  - Stage 08: Quotation Accepted (`status: Accepted`)
  - Stage 09: Proforma Invoice Issued (`PI-001`)
  - Stage 10: Customer Purchase Order Logged (`CPO-001`, `PO-ABC-2026-99`)
  - Stage 11: Advance Payment Verified (`PAY-001`, ₹1,00,000 of ₹1,50,000)
  - Stage 12: Sales Order Confirmed (`SO-001`) -> Emits event/status `Sent to Production`.
- **Business Rules**:
  - Quotation revision maintains version history and supersedes previous revisions.
  - Sales Order cannot be confirmed without advance payment verification or explicit credit override.

### 3.3 Production Management
- **Models**: `ProductionOrder`, `BOM`, `MaterialRequest`, `MaterialReceipt`, `ProductionPlan`, `DailyProductionUpdate`, `QualityInspection`, `ReworkRecord`.
- **Workflow Stages**:
  - Stage 13: Production Order (`PRO-001`) created from confirmed `SO-001`; BOM prepared (`BOM-001`).
  - Stage 14: Material Request (`MR-001`) submitted to Supply Chain.
  - Stage 18: Material Receipt confirmed on shopfloor (100% components received).
  - Stage 19: Production Planning & Shopfloor Execution (Daily updates: Frame welding 25%, cooling circuit 50%, wiring 75%, final assembly 100%).
  - Stage 20: Quality Inspection (`QC-001`) approval (zero defects, -86.2°C achieved) -> Handover to Logistics.
- **Business Rules**:
  - Material receipt on shopfloor marks components as physically available for assembly, but does **NOT** double-decrement warehouse inventory. Warehouse inventory is deducted during Material Issue.
  - Production order cannot be marked "Ready for Delivery" without passing Quality Inspection.

### 3.4 Supply Chain Management
- **Models**: `Inventory`, `StockMovement`, `PurchaseRequirement`, `PurchaseOrder`, `GoodsReceiptNote`, `MaterialIssue`, `MaterialReturn`, `StockAdjustment`.
- **Workflow Stages**:
  - Stage 15: Stock availability verification & Partial Issue (`MI-001` - Compressor 2, Steel 5).
  - Stage 16: Purchase Requirement generated for shortages (Steel 3, Temp Controller 2); Purchase Order (`PO-001`) sent to ABC Industrial Supplies.
  - Stage 17: Materials received; Goods Receipt Note (`GRN-001`) confirmed into accepted inventory.
  - Stage 18: Remaining Issue (`MI-002` - Steel 3, Temp Controller 2) completed.
- **Strict Invariants**:
  - PO creation does **NOT** modify inventory stock.
  - GRN acceptance increments `currentStock` atomically.
  - Material Issue decrements `currentStock` atomically and creates a permanent `StockMovement` ledger entry.
  - `currentStock` must never become negative. Transactions abort if requested qty > available qty.

### 3.5 Logistics & Delivery Management
- **Models**: `DeliveryOrder`, `DeliveryPlan`, `PackingRecord`, `DeliveryChallan`, `DispatchRecord`, `TrackingUpdate`, `ProofOfDelivery`, `DeliveryExpense`, `TransportPayment`.
- **Workflow Stages**:
  - Stage 21: Delivery Order created (`DEL-001`); Packaging inspected (`PKG-001`); Delivery Challan generated (`DC-001`); Dispatched via Own Vehicle (`VEH-01`, Driver Selvam).
  - Stage 22: Live Tracking Updates logged -> Reached Destination -> Customer Signs Proof of Delivery (`POD-001`) -> Final ₹50,000 balance collected -> Order closed.
- **Business Rules**:
  - Dispatch requires valid packaging record and generated Delivery Challan.
  - Payment balance condition ("Collect balance on delivery") enforces collecting ₹50,000 before/at POD recording to mark order fully settled.

### 3.6 Admin Management & Reporting
- **Models**: `CompanySettings`, `ApprovalRequest`, `AuditLog`.
- **Capabilities**:
  - Centralized KPI calculation (Total Revenue, Advance Collected, Balance Due, Active Orders, Bottlenecks).
  - Order 22-stage end-to-end journey tracker query (`/api/v1/admin/orders/:id/journey`).
  - Pending action and approval queues (hold, cancellation, credit override, rework authorization).
  - 7 Report Generators:
    1. Sales Performance & Pipeline
    2. Production Output & Cycle Time
    3. Inventory Valuation & Reorder Warnings
    4. Procurement & Supplier Rating
    5. Logistics & Fleet Utilization
    6. Customer & Supplier Payments Cash Flow
    7. Order Status & Stage Completion Ledger

---

## 4. API Endpoints Matrix

See `docs/API_DOCUMENTATION.md` for complete query parameters and JSON schema payloads.

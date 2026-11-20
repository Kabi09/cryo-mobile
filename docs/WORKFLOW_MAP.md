# Cryo Enterprise ERP – End-to-End Workflow Map

## 1. Complete Integrated 22-Stage Workflow

Cryo Enterprise ERP operates on a single connected order lifecycle that connects Sales, Production, Supply Chain, Logistics, and Admin management without duplicate data entry.

```text
STAGE 01: Customer Enquiry Received (Sales)
  ↓
STAGE 02: Enquiry Follow-up & Technical Discussion (Sales)
  ↓
STAGE 03: Enquiry Qualified (Sales)
  ↓
STAGE 04: Quotation Created (Sales)
  ↓
STAGE 05: Quotation Sent to Customer (Sales)
  ↓
STAGE 06: Customer Quotation Follow-up & Commercial Review (Sales)
  ↓
STAGE 07: Price & Spec Negotiation (Revision v2) (Sales)
  ↓
STAGE 08: Quotation Accepted (Sales)
  ↓
STAGE 09: Proforma Invoice (PI) Issued (Sales)
  ↓
STAGE 10: Customer Purchase Order (CPO) Received & Logged (Sales)
  ↓
STAGE 11: Advance Payment Verified (₹1,00,000 / ₹1,50,000) (Sales / Admin)
  ↓
STAGE 12: Confirmed Sales Order (SO-001) → Sent to Production (Sales)
  ↓
STAGE 13: Production Order (PRO-001) Created & BOM Prepared (Production)
  ↓
STAGE 14: Material Request (MR-001) Issued to Supply Chain (Production)
  ↓
STAGE 15: Supply Chain Stock Check & Partial Issue (MI-001) (Supply Chain)
  ↓
STAGE 16: Purchase Order (PO-001) Created for Stock Shortage (Supply Chain)
  ↓
STAGE 17: Materials Received & Goods Receipt Note (GRN-001) Confirmed (Supply Chain)
  ↓
STAGE 18: Remaining Materials Issued (MI-002) & Received in Shopfloor (SCM / Prod)
  ↓
STAGE 19: Production Planning & Shopfloor Execution (Daily Updates) (Production)
  ↓
STAGE 20: Quality Check (QC) Approval & Handover to Logistics (Production)
  ↓
STAGE 21: Delivery Planning, Packaging, Challan & Dispatch (Logistics)
  ↓
STAGE 22: Delivery Tracking, POD & Balance Payment Collected (Logistics / Admin)
```

## 2. Shared Golden Order Scenario (ABC Laboratory)

All modules reference the same synchronized state:

- **Customer**: ABC Laboratory (Dr. Ramesh Babu, +91 98402 55110, ramesh@abclabs.in)
- **Product**: Deep Freezer (-80°C) (CRYO-DF80, Model: DF80-340L)
- **Quantity**: 2 Units
- **Pricing & Payment Terms**:
  - Total Order Value: ₹1,50,000
  - Advance Received: ₹1,00,000
  - Outstanding Balance: ₹50,000 (Payment condition: Collect balance on delivery)
- **BOM Required Materials**:
  - `RM-101`: Compressor — 2 Units (Pieces)
  - `RM-102`: Steel Sheet — 8 Sheets
  - `RM-103`: Temperature Controller — 2 Units (Pieces)
- **Initial Inventory State**:
  - Compressor: 2 available in stock (Full stock available)
  - Steel Sheet: 5 available in stock (Shortage: 3 sheets)
  - Temperature Controller: 0 available in stock (Shortage: 2 units)
- **Supply Chain Execution**:
  - **Partial Issue 1 (MI-001)**: Issues 2 Compressors, 5 Steel Sheets.
  - **Purchase Requirement & PO-001**: Orders 3 Steel Sheets and 2 Temperature Controllers from ABC Industrial Supplies.
  - **GRN-001**: Confirms receipt of 3 Steel Sheets and 2 Temperature Controllers into accepted stock.
  - **Remaining Issue 2 (MI-002)**: Issues remaining 3 Steel Sheets and 2 Temperature Controllers.
  - **Production Receipt**: Shopfloor confirms 100% materials received.
- **Production Execution**:
  - Assembly progress updates: Frame Welding (25%) → Cooling Circuit Integration (50%) → Wiring & Sensors (75%) → Final Assembly (100%).
  - QC Inspection: Passed with zero defects.
  - Handover to Logistics generated: Ready for Delivery.
- **Logistics Execution**:
  - Delivery Plan: DEL-001 created.
  - Payment status verified: ₹1,00,000 Advance verified, ₹50,000 due on delivery.
  - Packaging: PKG-001 inspected and approved.
  - Delivery Challan: DC-001 generated.
  - Vehicle Dispatch: Own Vehicle (TN 01 AB 1234, Driver: Selvam, +91 94441 23456).
  - Tracking & Status: Dispatched → In Transit → Reached Customer Site.
  - Customer Handover: Proof of Delivery (POD) signed.
  - Payment Collection: Final ₹50,000 collected (Cheque/Bank Transfer).
  - Admin & Sales notified: Order 100% completed and settled.

## 3. Cross-Department Data Rules

1. **No Duplicate Masters**: Customers and Products are created once and referenced everywhere via IDs (`CUST-001`, `PRD-001`).
2. **Inventory Invariance**:
   - Creating Material Master does not increase stock.
   - Creating PO does not increase stock.
   - GRN confirmation increases accepted inventory.
   - Material Issue decreases inventory.
   - Production Receipt does NOT deduct inventory again.
3. **Admin Visibility**:
   - Centralized Order Journey visualizes all 22 stages.
   - Admin can jump directly into any department screen for the order.

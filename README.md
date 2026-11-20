# Cryo Enterprise ERP – Mobile-First Frontend Application

Cryo Enterprise ERP is a modern, simple, and user-friendly mobile-first Enterprise Resource Planning application built with React, Vite, Material UI (MUI), SCSS Modules, and Google Material Icons.

It unifies **Sales**, **Production**, **Supply Chain**, **Logistics**, **Employee & Access Control**, and **Centralized Admin Management** under a shared responsive design system and cross-department order lifecycle.

---

## 1. Technology Stack

- **Framework**: React 18 with Vite
- **Language**: JavaScript (JSX)
- **UI Components**: Material UI (MUI v6)
- **Icons**: Google Material Icons (`@mui/icons-material`)
- **Styling**: SCSS Modules (`.module.scss`) with centralized SCSS design tokens
- **Typography**: Google Font `Inter`
- **Navigation & Routing**: React Router DOM (v6) with nested routes and role-based guards
- **State Management**: Zustand (`useAuthStore`, `useErpStore`)
- **API Client Foundation**: Axios configured for future backend integration

---

## 2. Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Installation

```bash
# Clone the repository
git clone https://github.com/Kabi09/cryo-mobile.git
cd cryo-mobile

# Install dependencies
npm install
```

### Running Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

### Running Linter

```bash
npm run lint
```

---

## 3. Key Modules & Features

### 🏛️ Centralized Admin Management (`/admin`)
- **6 Key Business Metric Cards**: Real-time revenue, order pipeline, production progress, stores, dispatch, and approvals.
- **22-Stage Order Journey Tracker**: Complete interactive timeline from customer enquiry to final delivery and balance collection.
- **Approvals & Financials**: Quotation discounts, new material master requests, and customer payment ledgers.
- **7 Departmental Reports**: Sales, shopfloor output, inventory valuation, procurement, fleet turnaround, and receivables.

### 💼 Sales Management (`/sales`)
- **Pipeline Stepper**: Enquiry ➔ Follow-up ➔ Quotation ➔ Customer PO ➔ Advance Payment ➔ Send to Production.
- **Enquiry Management**: Search, filter, add new enquiry, and qualify leads.
- **Quotations & Negotiation**: Create quotations with 18% GST calculation, printable PDF preview modal, revision v1/v2, acceptance, and rejection.
- **Customer POs & Sales Orders**: Confirmed sales orders with one-click transfer to Production.

### 🏭 Production Management (`/production`)
- **Shopfloor Stepper**: Incoming SO ➔ BOM & MR ➔ Material Receipt ➔ Daily Assembly ➔ QC & Handover.
- **Orders & BOM**: Production Orders (PRO-001) linked to Bill of Materials (BOM-001).
- **Daily Assembly Progress**: Interactive stage progress tracking (25% ➔ 50% ➔ 75% ➔ 100%).
- **Quality Control (QC)**: Sign off zero defects, -86.2°C temperature test confirmation, and handover to Logistics.

### 📦 Supply Chain & Stores (`/supply-chain`)
- **Fulfillment Stepper**: MR Received ➔ Stock Check ➔ Partial Issue MI-001 ➔ PO & GRN ➔ Full Issue MI-002.
- **Raw Materials Master**: Real-time stock levels, safety stock thresholds, and low-stock alerts.
- **Purchase Orders & GRN**: Confirmed Goods Receipt Notes automatically increase accepted inventory.
- **Material Issues**: Decreases physical inventory stock with non-negative stock guards.

### 🚚 Logistics & Delivery (`/logistics`)
- **Fulfillment Stepper**: Ready Order ➔ Delivery Plan ➔ Packing & DC ➔ Dispatch ➔ POD & Balance ₹.
- **Fleet & Dispatch**: Own vehicle (TN 01 AB 1234) and courier dispatch options with Delivery Challan (DC-001) generation.
- **Live Milestone Tracking**: Real-time delivery status updates.
- **Proof of Delivery (POD)**: Customer signature sign-off and on-site balance payment collection.

### 👥 Employee Management & Permissions (`/employees`)
- **Staff Directory**: Employee roster and department assignment.
- **Granular Permission Matrix**: View, Create, Edit, and Workflow action rights per department.
- **Login Accounts**: Status activation and deactivation.

---

## 4. Test Personas (Development Mode)

Switch test personas instantly via the top header bar or login screen:

1. **Priya Nair (Admin)**: Full access to all 5 departments and Centralized Admin HQ.
2. **Arun Kumar**: Sales full access + Production view-only.
3. **Murugan S**: Supply Chain & Stores access only.
4. **Ramesh Viewer**: Read-only auditor across departments.
5. **Kavya Drafts**: Create and edit data without workflow transition permissions.

---

## 5. Documentation

- `project.md`: Single source of truth for all changes, architecture, and decisions.
- `AGENTS.md`: Mandatory engineering rules, styling conventions, and change workflows.
- `docs/SCREEN_INVENTORY.md`: Complete inventory of all 271 catalog screens and 22 stages.
- `docs/NAVIGATION_MAP.md`: High-level routing hierarchy and bottom navigation tabs.
- `docs/WORKFLOW_MAP.md`: Detailed end-to-end 22-stage order lifecycle.
- `docs/PHASE_3_COMPLETION.md`: Comprehensive Phase 3 completion report.

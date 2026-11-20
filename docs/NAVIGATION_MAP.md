# Cryo Enterprise ERP – Navigation Map

## 1. High-Level Routing Structure

The application uses `react-router-dom` with nested route hierarchies, centralized layouts, and mock authorization route guards.

```text
/                                      -> Redirects based on auth status
├── /login                             -> Common Cryo ERP Login
├── /forgot-password                   -> Password Recovery
├── /first-login-password              -> Force password reset on initial login
├── /select-department                 -> Department Selector (for multi-department users)
├── /unauthorized                      -> Access Restricted Screen
│
├── /admin/*                           -> AdminLayout (Full access & centralized control)
│   ├── /admin/dashboard               -> Centralized Admin Dashboard
│   ├── /admin/departments-overview    -> Departments Overview
│   ├── /admin/dept-switcher           -> Department Switcher
│   ├── /admin/global-search           -> Global Unified Search
│   ├── /admin/all-orders              -> Centralized Orders List
│   ├── /admin/order-journey           -> Complete Order Journey (22 Stages)
│   ├── /admin/manage-order            -> Order Actions Hub
│   ├── /admin/order-hold-cancel       -> Order Hold / Cancellation
│   ├── /admin/pending-actions         -> Pending Actions Queue
│   ├── /admin/approvals               -> Approvals Queue
│   ├── /admin/approval-details/:id    -> Approval Inspection
│   ├── /admin/master-data             -> Shared Master Data
│   ├── /admin/customers-admin         -> Customers Overview
│   ├── /admin/products-admin          -> Products Overview
│   ├── /admin/payments-dashboard      -> Payments & Expenses Overview
│   ├── /admin/customer-payments       -> Customer Payments List
│   ├── /admin/outstanding-payments    -> Outstanding Payments
│   ├── /admin/record-cust-payment     -> Record Customer Payment
│   ├── /admin/supplier-payments       -> Supplier Payments List
│   ├── /admin/record-sup-payment      -> Record Supplier Payment
│   ├── /admin/delivery-expenses       -> Delivery Expenses
│   ├── /admin/reports-dashboard       -> Reports Dashboard
│   ├── /admin/report-sales            -> Sales Report
│   ├── /admin/report-production       -> Production Report
│   ├── /admin/report-inventory        -> Inventory Report
│   ├── /admin/report-purchase         -> Purchase Report
│   ├── /admin/report-logistics        -> Logistics Report
│   ├── /admin/report-payment          -> Payment Report
│   ├── /admin/report-order-status     -> Order Status Report
│   ├── /admin/notifications           -> Notifications
│   ├── /admin/activity-logs           -> Centralized Audit Logs
│   ├── /admin/activity-details/:id    -> Audit Log Details
│   ├── /admin/document-centre         -> Document Centre
│   ├── /admin/company-settings        -> Company Settings
│   ├── /admin/edit-company            -> Edit Company Profile
│   ├── /admin/doc-settings            -> Document Settings
│   ├── /admin/workflow-settings       -> Workflow Settings
│   ├── /admin/profile                 -> Admin Profile
│   ├── /admin/change-password         -> Change Password
│   └── /admin/more                    -> More Menu
│
├── /sales/*                           -> DepartmentLayout (dept="sales")
│   ├── /sales/dashboard               -> Sales Dashboard (Tab: Home)
│   ├── /sales/enquiry-list            -> Enquiries List (Tab: Enquiries)
│   ├── /sales/create-enquiry          -> Create Enquiry
│   ├── /sales/enquiry-details/:id     -> Enquiry Details
│   ├── /sales/edit-enquiry/:id        -> Edit Enquiry
│   ├── /sales/qualified-enquiries     -> Qualified Enquiries
│   ├── /sales/followups               -> Follow-ups List (Tab: Follow-ups)
│   ├── /sales/add-followup            -> Add Follow-up
│   ├── /sales/update-followup/:id     -> Update Follow-up
│   ├── /sales/quotation-list          -> Quotations List (Tab: Orders)
│   ├── /sales/create-quotation        -> Create Quotation
│   ├── /sales/quotation-preview/:id   -> Quotation Preview
│   ├── /sales/send-quotation/:id      -> Send Quotation Sheet
│   ├── /sales/quotation-details/:id   -> Quotation Details
│   ├── /sales/quotation-acceptance/:id -> Quotation Acceptance
│   ├── /sales/quotation-negotiation/:id -> Quotation Negotiation
│   ├── /sales/revise-quotation/:id    -> Revise Quotation
│   ├── /sales/quotation-rejection/:id -> Quotation Rejection
│   ├── /sales/pi-list                 -> Proforma Invoice List
│   ├── /sales/create-pi               -> Create Proforma Invoice
│   ├── /sales/pi-details/:id          -> PI Details & Preview
│   ├── /sales/po-list                 -> Customer Purchase Orders List
│   ├── /sales/record-po               -> Record Customer Purchase Order
│   ├── /sales/po-details/:id          -> Customer PO Details
│   ├── /sales/payments                -> Payments List
│   ├── /sales/record-payment          -> Record Payment
│   ├── /sales/payment-details/:id     -> Payment Details
│   ├── /sales/so-list                 -> Sales Orders List
│   ├── /sales/create-so               -> Create Sales Order
│   ├── /sales/so-details/:id          -> Sales Order Details
│   ├── /sales/send-production/:id     -> Send to Production Confirmation
│   ├── /sales/customers               -> Customer Master List
│   ├── /sales/add-customer            -> Add Customer
│   ├── /sales/customer-details/:id    -> Customer Details
│   ├── /sales/edit-customer/:id       -> Edit Customer
│   ├── /sales/products                -> Product Master List
│   ├── /sales/add-product             -> Add Product
│   ├── /sales/product-details/:id     -> Product Details
│   ├── /sales/edit-product/:id        -> Edit Product
│   ├── /sales/orders-hub              -> Orders Hub
│   ├── /sales/notifications           -> Sales Notifications
│   ├── /sales/profile                 -> Sales Profile
│   └── /sales/more                    -> More Menu (Tab: More)
│
├── /production/*                      -> DepartmentLayout (dept="production")
│   ├── /production/dashboard          -> Production Dashboard (Tab: Home)
│   ├── /production/orders-hub         -> Orders Hub (Tab: Orders)
│   ├── /production/incoming-so-list   -> Incoming Sales Orders
│   ├── /production/incoming-so-details/:id -> Incoming SO Details
│   ├── /production/create-pro         -> Create Production Order
│   ├── /production/pro-list           -> Production Orders List
│   ├── /production/pro-details/:id    -> Production Order Details
│   ├── /production/edit-pro/:id       -> Edit Production Order
│   ├── /production/materials-hub      -> Materials Hub (Tab: Materials)
│   ├── /production/bom-list           -> BOM List
│   ├── /production/create-bom         -> Create BOM
│   ├── /production/bom-details/:id    -> BOM Details
│   ├── /production/edit-bom/:id       -> Edit BOM
│   ├── /production/mr-list            -> Material Requests List
│   ├── /production/create-mr          -> Create Material Request
│   ├── /production/mr-details/:id     -> Material Request Details
│   ├── /production/material-receipts  -> Material Receipts List
│   ├── /production/receipt-details/:id -> Receipt Confirmation Details
│   ├── /production/confirm-receipt/:id -> Confirm Material Receipt
│   ├── /production/production-hub     -> Production Hub (Tab: Production)
│   ├── /production/planning           -> Production Planning Schedule
│   ├── /production/create-plan        -> Create Production Plan
│   ├── /production/plan-details/:id   -> Plan Details
│   ├── /production/daily-production   -> Daily Production Logs
│   ├── /production/add-daily-entry    -> Add Daily Production Entry
│   ├── /production/progress-tracker/:id -> Production Progress Tracker
│   ├── /production/add-mr             -> Additional Material Request
│   ├── /production/qc-list            -> Quality Check List
│   ├── /production/record-qc          -> Record Quality Check
│   ├── /production/qc-details/:id     -> QC Details
│   ├── /production/rework-list        -> Rework Orders List
│   ├── /production/record-rework      -> Record Rework
│   ├── /production/completed-list     -> Completed Production Orders
│   ├── /production/completed-details/:id -> Completed Order Details
│   ├── /production/send-logistics/:id -> Handover to Logistics
│   ├── /production/notifications      -> Notifications
│   ├── /production/profile            -> Profile
│   └── /production/more               -> More Menu (Tab: More)
│
├── /supply-chain/*                    -> DepartmentLayout (dept="supply-chain")
│   ├── /supply-chain/dashboard        -> Supply Chain Dashboard (Tab: Home)
│   ├── /supply-chain/requests-hub     -> Requests Hub (Tab: Requests)
│   ├── /supply-chain/mr-list          -> Material Requests List
│   ├── /supply-chain/mr-details/:id   -> Material Request Details
│   ├── /supply-chain/stock-check/:id  -> Stock Availability Check
│   ├── /supply-chain/pending-shortage -> Pending Material Shortages
│   ├── /supply-chain/inventory-hub    -> Inventory Hub (Tab: Inventory)
│   ├── /supply-chain/inventory        -> Inventory Stock List
│   ├── /supply-chain/inventory-details/:id -> Inventory Item Details
│   ├── /supply-chain/stock-history/:id -> Stock Movement History
│   ├── /supply-chain/stock-adjustment -> Stock Adjustment
│   ├── /supply-chain/materials-list   -> Materials Master
│   ├── /supply-chain/add-material     -> Add Material
│   ├── /supply-chain/material-details/:id -> Material Details
│   ├── /supply-chain/edit-material/:id -> Edit Material
│   ├── /supply-chain/material-approval/:id -> Material Approval
│   ├── /supply-chain/purchase-hub     -> Purchase Hub (Tab: Purchase)
│   ├── /supply-chain/suppliers-list   -> Suppliers Master
│   ├── /supply-chain/add-supplier     -> Add Supplier
│   ├── /supply-chain/supplier-details/:id -> Supplier Details
│   ├── /supply-chain/edit-supplier/:id -> Edit Supplier
│   ├── /supply-chain/pr-list          -> Purchase Requirements List
│   ├── /supply-chain/create-pr        -> Create Purchase Requirement
│   ├── /supply-chain/pr-details/:id   -> Purchase Requirement Details
│   ├── /supply-chain/po-list          -> Purchase Orders List
│   ├── /supply-chain/create-po        -> Create Purchase Order
│   ├── /supply-chain/po-preview/:id   -> PO Preview
│   ├── /supply-chain/po-details/:id   -> PO Details
│   ├── /supply-chain/edit-po/:id      -> Edit Purchase Order
│   ├── /supply-chain/grn-list         -> GRN List
│   ├── /supply-chain/create-grn       -> Create GRN
│   ├── /supply-chain/confirm-grn/:id  -> Confirm GRN
│   ├── /supply-chain/grn-details/:id  -> GRN Details
│   ├── /supply-chain/mi-list          -> Material Issues List
│   ├── /supply-chain/create-mi        -> Create Material Issue
│   ├── /supply-chain/confirm-mi/:id   -> Confirm Material Issue
│   ├── /supply-chain/mi-details/:id   -> Material Issue Details
│   ├── /supply-chain/material-return  -> Material Returns
│   ├── /supply-chain/notifications    -> Notifications
│   ├── /supply-chain/profile          -> Profile
│   └── /supply-chain/more             -> More Menu (Tab: More)
│
├── /logistics/*                       -> DepartmentLayout (dept="logistics")
│   ├── /logistics/dashboard           -> Logistics Dashboard (Tab: Home)
│   ├── /logistics/orders-hub          -> Orders Hub (Tab: Orders)
│   ├── /logistics/ready-list          -> Ready for Delivery Orders
│   ├── /logistics/completed-pro-details/:id -> Completed PRO Details
│   ├── /logistics/plan-list           -> Delivery Plans List
│   ├── /logistics/create-plan         -> Create Delivery Plan
│   ├── /logistics/plan-details/:id    -> Plan Details
│   ├── /logistics/edit-plan/:id       -> Edit Delivery Plan
│   ├── /logistics/packing-list        -> Packing List
│   ├── /logistics/packing-details/:id -> Packing Inspection
│   ├── /logistics/challans-list       -> Delivery Challans List
│   ├── /logistics/create-challan      -> Create Delivery Challan
│   ├── /logistics/challan-preview/:id -> Challan Preview
│   ├── /logistics/dispatch-hub        -> Dispatch Hub (Tab: Dispatch)
│   ├── /logistics/dispatch-queue      -> Dispatch Queue
│   ├── /logistics/dispatch-own        -> Own Vehicle Dispatch
│   ├── /logistics/dispatch-courier    -> Courier Dispatch
│   ├── /logistics/dispatch-confirm/:id -> Dispatch Confirmation
│   ├── /logistics/tracking-hub        -> Tracking Hub (Tab: Tracking)
│   ├── /logistics/tracking-list       -> Active Deliveries Tracking
│   ├── /logistics/tracking-details/:id -> Live Tracking Details
│   ├── /logistics/add-tracking-update/:id -> Manual Tracking Update
│   ├── /logistics/delayed-delivery    -> Delayed Deliveries
│   ├── /logistics/failed-delivery     -> Failed Deliveries
│   ├── /logistics/reschedule-delivery/:id -> Reschedule Delivery
│   ├── /logistics/pod-confirm/:id     -> Proof of Delivery / Customer Confirmation
│   ├── /logistics/collect-payment/:id -> Customer Payment Collection
│   ├── /logistics/completed-deliveries -> Completed Deliveries
│   ├── /logistics/vehicles-list       -> Vehicles Master
│   ├── /logistics/add-vehicle         -> Add Vehicle
│   ├── /logistics/vehicle-details/:id -> Vehicle Details
│   ├── /logistics/edit-vehicle/:id    -> Edit Vehicle
│   ├── /logistics/couriers-list       -> Courier Providers Master
│   ├── /logistics/add-courier         -> Add Courier Provider
│   ├── /logistics/courier-details/:id -> Courier Provider Details
│   ├── /logistics/edit-courier/:id    -> Edit Courier Provider
│   ├── /logistics/expenses-list       -> Transport Expenses
│   ├── /logistics/add-expense         -> Record Transport Expense
│   ├── /logistics/notifications       -> Notifications
│   ├── /logistics/profile             -> Profile
│   └── /logistics/more                -> More Menu (Tab: More)
│
├── /employees/*                       -> DepartmentLayout (dept="employees")
│   ├── /employees/dashboard           -> Employee Dashboard (Tab: Home)
│   ├── /employees/employees-list      -> Employees List (Tab: Employees)
│   ├── /employees/add-employee        -> Add Employee
│   ├── /employees/employee-details/:id -> Employee Details
│   ├── /employees/edit-employee/:id   -> Edit Employee
│   ├── /employees/assign-departments/:id -> Assign Departments
│   ├── /employees/departments-list    -> Departments List (Tab: Departments)
│   ├── /employees/add-department      -> Add Department
│   ├── /employees/department-details/:id -> Department Details
│   ├── /employees/edit-department/:id -> Edit Department
│   ├── /employees/permissions-hub     -> Access Hub (Tab: Access)
│   ├── /employees/roles-list          -> Roles List
│   ├── /employees/create-role         -> Create Role
│   ├── /employees/role-details/:id    -> Role Details
│   ├── /employees/edit-role/:id       -> Edit Role
│   ├── /employees/assign-role/:id     -> Assign Role to Employee
│   ├── /employees/emp-permissions-list -> Employee Permissions Overview
│   ├── /employees/configure-permissions/:id -> Configure Permission Matrix
│   ├── /employees/permission-review/:id -> Permission Review & Confirmation
│   ├── /employees/accounts-list       -> Login Accounts List
│   ├── /employees/create-account      -> Create Login Account
│   ├── /employees/account-details/:id -> Login Account Details
│   ├── /employees/reset-password/:id  -> Reset Employee Password
│   ├── /employees/activity-logs       -> Employee Activity Audit Logs
│   ├── /employees/activity-details/:id -> Activity Log Inspection
│   ├── /employees/profile             -> Profile
│   └── /employees/more                -> More Menu (Tab: More)
│
└── /*                                 -> 404 Not Found Screen
```

## 2. Fixed Bottom Navigation by Department

Each department layout renders its own fixed bottom navigation bar:

| Department | Tab 1 | Tab 2 | Tab 3 | Tab 4 | Tab 5 |
|---|---|---|---|---|---|
| **Admin** | Home (`/admin/dashboard`) | Departments (`/admin/departments-overview`) | Orders (`/admin/all-orders`) | Reports (`/admin/reports-dashboard`) | More (`/admin/more`) |
| **Sales** | Home (`/sales/dashboard`) | Enquiries (`/sales/enquiry-list`) | Follow-ups (`/sales/followups`) | Orders (`/sales/quotation-list`) | More (`/sales/more`) |
| **Production** | Home (`/production/dashboard`) | Orders (`/production/orders-hub`) | Materials (`/production/materials-hub`) | Production (`/production/production-hub`) | More (`/production/more`) |
| **Supply Chain** | Home (`/supply-chain/dashboard`) | Requests (`/supply-chain/requests-hub`) | Inventory (`/supply-chain/inventory-hub`) | Purchase (`/supply-chain/purchase-hub`) | More (`/supply-chain/more`) |
| **Logistics** | Home (`/logistics/dashboard`) | Orders (`/logistics/orders-hub`) | Dispatch (`/logistics/dispatch-hub`) | Tracking (`/logistics/tracking-hub`) | More (`/logistics/more`) |
| **Employees** | Home (`/employees/dashboard`) | Employees (`/employees/employees-list`) | Departments (`/employees/departments-list`) | Access (`/employees/permissions-hub`) | More (`/employees/more`) |

## 3. Persistent Top Navigation & Return to Admin

1. **Admin Return Banner**: When an Administrator is browsing any department workspace, an omnipresent top bar shows:
   `[Admin Access Mode] Viewing as Admin ➔ [Return to Admin Dashboard]`
2. **Department Switcher Drawer**: Accessible from the top header on any screen to switch between authorized departments or change mock test personas.
3. **Back Navigation**: Standard back button on all detail, create, and edit screens returning to their parent list or hub screen.

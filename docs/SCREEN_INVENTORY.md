# Cryo Enterprise ERP – Screen Inventory

Complete inventory of all screens discovered across the approved Stitch HTML design files.

## Screen Inventory Summary

| Department / Module | Design File | Discovered Screens | Target Route Scope | Status |
|---|---|---|---|---|
| Admin Management | `design/cryo_erp_centralized_admin_management_mobile_app.html` | 47 screens | `/admin/*` | Planned for Batch 3C-3I |
| Employee Management & Permissions | `design/cryo_erp_employee_management_permissions_mobile_app.html` | 36 screens | `/employees/*` | Planned for Batch 3C-3I |
| Logistics & Delivery Management | `design/cryo_erp_logistics_delivery_management_mobile_app.html` | 58 screens | `/logistics/*` | Planned for Batch 3C-3I |
| Production Management | `design/cryo_erp_production_management_mobile_app.html` | 43 screens | `/production/*` | Planned for Batch 3C-3I |
| Sales Management | `design/cryo_erp_sales_management_mobile_app.html` | 44 screens | `/sales/*` | Planned for Batch 3C-3I |
| Supply Chain Management | `design/cryo_erp_supply_chain_management_mobile_app.html` | 43 screens | `/supply-chain/*` | Planned for Batch 3C-3I |
| Integrated Handoff Suite | `design/cryo_enterprise_erp_complete_integrated_mobile_app_react_native_handoff.html` | 22 End-to-End Stages + Common Auth | `/`, `/login`, `/select-department` | Planned for Batch 3C & 3J |
| **TOTAL** | **7 Design Files** | **271 Catalog Screens + 22 Stages** | Complete ERP Suite | In Progress |

## Admin Management
**Design File**: `design/cryo_erp_centralized_admin_management_mobile_app.html`

| Screen ID | Screen Name | Group / Category | Type | Route Path | Bottom Nav Item | Primary Actions | Implementation Status |
|---|---|---|---|---|---|---|---|
| `admin-login` | Admin Login | Core & Navigation | Auth | `/admin/admin-login` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `dashboard` | Centralized Admin Dashboard | Core & Navigation | Dashboard | `/admin/dashboard` | N/A | View Metrics, Quick Navigation, Search | Pending (Batch 3) |
| `departments-overview` | Departments Overview | Core & Navigation | Hub / Overview | `/admin/departments-overview` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `dept-switcher` | Department Switcher | Core & Navigation | List | `/admin/dept-switcher` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `global-search` | Global Search | Core & Navigation | List | `/admin/global-search` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `more` | More Menu | Core & Navigation | List | `/admin/more` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `profile` | Admin Profile | Core & Navigation | Profile | `/admin/profile` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `change-password` | Change Password | Core & Navigation | List | `/admin/change-password` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ws-sales` | Sales Workspace (Full Access) | 5 Full-Access Department Workspaces | List | `/admin/ws-sales` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ws-production` | Production Workspace (Full Access) | 5 Full-Access Department Workspaces | List | `/admin/ws-production` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ws-supply-chain` | Supply Chain Workspace (Full Access) | 5 Full-Access Department Workspaces | List | `/admin/ws-supply-chain` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ws-logistics` | Logistics Workspace (Full Access) | 5 Full-Access Department Workspaces | List | `/admin/ws-logistics` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ws-employees` | Employee & Access Workspace | 5 Full-Access Department Workspaces | List | `/admin/ws-employees` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `all-orders` | All Orders List | Centralized Orders & Approvals | List | `/admin/all-orders` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `order-journey` | Complete Order Journey (22 Steps) | Centralized Orders & Approvals | List | `/admin/order-journey` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `manage-order` | Manage Order Action Hub | Centralized Orders & Approvals | List | `/admin/manage-order` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `order-hold-cancel` | Order Hold & Cancellation | Centralized Orders & Approvals | List | `/admin/order-hold-cancel` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `pending-actions` | Pending Actions Queue | Centralized Orders & Approvals | List | `/admin/pending-actions` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `approvals` | Approvals Queue | Centralized Orders & Approvals | List | `/admin/approvals` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `approval-details` | Approval Details | Centralized Orders & Approvals | Details | `/admin/approval-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `master-data` | Centralized Master Data | Shared Master Data | List | `/admin/master-data` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `customers-admin` | Customers – Admin Overview | Shared Master Data | List | `/admin/customers-admin` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `products-admin` | Products – Admin Overview | Shared Master Data | List | `/admin/products-admin` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `payments-dashboard` | Payments & Expenses Dashboard | Payments & Expenses | Dashboard | `/admin/payments-dashboard` | N/A | View Metrics, Quick Navigation, Search | Pending (Batch 3) |
| `customer-payments` | Customer Payments List | Payments & Expenses | List | `/admin/customer-payments` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `outstanding-payments` | Outstanding Payments | Payments & Expenses | List | `/admin/outstanding-payments` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `record-cust-payment` | Record Customer Payment | Payments & Expenses | Form (Create) | `/admin/record-cust-payment` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `supplier-payments` | Supplier Payments | Payments & Expenses | List | `/admin/supplier-payments` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `record-sup-payment` | Record Supplier Payment | Payments & Expenses | Form (Create) | `/admin/record-sup-payment` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `delivery-expenses` | Delivery Expenses | Payments & Expenses | List | `/admin/delivery-expenses` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `reports-dashboard` | Reports Dashboard | Centralized Reports (7 Modules) | Dashboard | `/admin/reports-dashboard` | N/A | View Metrics, Quick Navigation, Search | Pending (Batch 3) |
| `report-sales` | Sales Reports | Centralized Reports (7 Modules) | Report | `/admin/report-sales` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `report-production` | Production Reports | Centralized Reports (7 Modules) | Report | `/admin/report-production` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `report-inventory` | Inventory Reports | Centralized Reports (7 Modules) | Report | `/admin/report-inventory` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `report-purchase` | Purchase Reports | Centralized Reports (7 Modules) | Report | `/admin/report-purchase` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `report-logistics` | Logistics Reports | Centralized Reports (7 Modules) | Report | `/admin/report-logistics` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `report-payment` | Payment Reports | Centralized Reports (7 Modules) | Report | `/admin/report-payment` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `report-order-status` | Order Status Reports | Centralized Reports (7 Modules) | Report | `/admin/report-order-status` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `notifications` | Centralized Notifications | System, Docs, Audit & Settings | Notifications | `/admin/notifications` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `activity-logs` | Centralized Activity Logs | System, Docs, Audit & Settings | List | `/admin/activity-logs` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `activity-details` | Activity Details | System, Docs, Audit & Settings | Details | `/admin/activity-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `document-centre` | Document Centre | System, Docs, Audit & Settings | List | `/admin/document-centre` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `company-settings` | Company Settings | System, Docs, Audit & Settings | List | `/admin/company-settings` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `edit-company` | Edit Company Profile | System, Docs, Audit & Settings | Form (Edit) | `/admin/edit-company` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `doc-settings` | Document Settings | System, Docs, Audit & Settings | List | `/admin/doc-settings` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `workflow-settings` | Workflow Settings | System, Docs, Audit & Settings | List | `/admin/workflow-settings` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ui-states` | Common UI States (15) | System, Docs, Audit & Settings | State Gallery | `/admin/ui-states` | N/A | View, Navigate, Filter | Pending (Batch 3) |

## Employee Management & Permissions
**Design File**: `design/cryo_erp_employee_management_permissions_mobile_app.html`

| Screen ID | Screen Name | Group / Category | Type | Route Path | Bottom Nav Item | Primary Actions | Implementation Status |
|---|---|---|---|---|---|---|---|
| `dashboard` | Employee Dashboard | Core & Navigation | Dashboard | `/employees/dashboard` | N/A | View Metrics, Quick Navigation, Search | Pending (Batch 3) |
| `permissions-hub` | Access & Permissions Hub | Core & Navigation | Hub / Overview | `/employees/permissions-hub` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `more` | More Menu | Core & Navigation | List | `/employees/more` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `profile` | Profile | Core & Navigation | Profile | `/employees/profile` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `change-password` | Change Password | Core & Navigation | List | `/employees/change-password` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `employees-list` | Employees List | Employees & Department Assignment | List | `/employees/employees-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `add-employee` | Add Employee | Employees & Department Assignment | Form (Create) | `/employees/add-employee` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `employee-details` | Employee Details | Employees & Department Assignment | Details | `/employees/employee-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-employee` | Edit Employee | Employees & Department Assignment | Form (Edit) | `/employees/edit-employee` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `assign-departments` | Assign Departments | Employees & Department Assignment | List | `/employees/assign-departments` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `departments-list` | Departments List | Departments | List | `/employees/departments-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `add-department` | Add Department | Departments | Form (Create) | `/employees/add-department` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `department-details` | Department Details | Departments | Details | `/employees/department-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-department` | Edit Department | Departments | Form (Edit) | `/employees/edit-department` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `roles-list` | Roles List | Roles & Permission Matrices | List | `/employees/roles-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-role` | Create Role | Roles & Permission Matrices | Form (Create) | `/employees/create-role` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `role-details` | Role Details | Roles & Permission Matrices | Details | `/employees/role-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-role` | Edit Role | Roles & Permission Matrices | Form (Edit) | `/employees/edit-role` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `assign-role` | Assign Role | Roles & Permission Matrices | List | `/employees/assign-role` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `emp-permissions-list` | Employee Permissions List | Roles & Permission Matrices | List | `/employees/emp-permissions-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `configure-permissions` | Configure Permissions Matrix | Roles & Permission Matrices | List | `/employees/configure-permissions` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `permission-review` | Permission Review | Roles & Permission Matrices | List | `/employees/permission-review` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `accounts-list` | Login Accounts List | Login Accounts & Audit Logs | List | `/employees/accounts-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-account` | Create Login Account | Login Accounts & Audit Logs | Form (Create) | `/employees/create-account` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `account-details` | Login Account Details | Login Accounts & Audit Logs | Details | `/employees/account-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `reset-password` | Reset Password | Login Accounts & Audit Logs | List | `/employees/reset-password` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `toggle-account-sheet` | Activate / Deactivate (Sheet) | Login Accounts & Audit Logs | Bottom Sheet / Modal | `/employees/toggle-account-sheet` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `activity-logs` | Activity Logs | Login Accounts & Audit Logs | List | `/employees/activity-logs` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `activity-details` | Activity Details | Login Accounts & Audit Logs | Details | `/employees/activity-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `common-login` | Common Employee Login | Common Login & Dept Switching | Auth | `/employees/common-login` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `first-login-password` | First Login Password Change | Common Login & Dept Switching | Auth | `/employees/first-login-password` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `forgot-password` | Forgot Password | Common Login & Dept Switching | List | `/employees/forgot-password` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `dept-selection` | Employee Dept Selection | Common Login & Dept Switching | List | `/employees/dept-selection` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `switch-dept` | Switch Department | Common Login & Dept Switching | List | `/employees/switch-dept` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `permission-denied` | Permission Denied | Common Login & Dept Switching | List | `/employees/permission-denied` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ui-states` | Common UI States (16) | Common UI States | State Gallery | `/employees/ui-states` | N/A | View, Navigate, Filter | Pending (Batch 3) |

## Logistics & Delivery Management
**Design File**: `design/cryo_erp_logistics_delivery_management_mobile_app.html`

| Screen ID | Screen Name | Group / Category | Type | Route Path | Bottom Nav Item | Primary Actions | Implementation Status |
|---|---|---|---|---|---|---|---|
| `dashboard` | Logistics Dashboard | Core & Hubs | Dashboard | `/logistics/dashboard` | N/A | View Metrics, Quick Navigation, Search | Pending (Batch 3) |
| `orders-hub` | Orders Hub | Core & Hubs | Hub / Overview | `/logistics/orders-hub` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `dispatch-hub` | Dispatch Hub | Core & Hubs | Hub / Overview | `/logistics/dispatch-hub` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `more` | More Menu | Core & Hubs | List | `/logistics/more` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `notifications` | Notifications | Core & Hubs | Notifications | `/logistics/notifications` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `profile` | Profile | Core & Hubs | Profile | `/logistics/profile` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ready-list` | Ready for Delivery List | Ready Orders & Delivery Planning | List | `/logistics/ready-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `completed-pro-details` | Completed PRO Details | Ready Orders & Delivery Planning | Details | `/logistics/completed-pro-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `plan-list` | Delivery Planning List | Ready Orders & Delivery Planning | List | `/logistics/plan-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-plan` | Create Delivery Plan | Ready Orders & Delivery Planning | Form (Create) | `/logistics/create-plan` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `plan-details` | Delivery Plan Details | Ready Orders & Delivery Planning | Details | `/logistics/plan-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-plan` | Edit Delivery Plan | Ready Orders & Delivery Planning | Form (Edit) | `/logistics/edit-plan` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `vehicles-list` | Vehicles Master List | Vehicles & Courier Masters | List | `/logistics/vehicles-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `add-vehicle` | Add Vehicle | Vehicles & Courier Masters | Form (Create) | `/logistics/add-vehicle` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `vehicle-details` | Vehicle Details | Vehicles & Courier Masters | Details | `/logistics/vehicle-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-vehicle` | Edit Vehicle | Vehicles & Courier Masters | Form (Edit) | `/logistics/edit-vehicle` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `vehicle-select-sheet` | Select Vehicle (Sheet) | Vehicles & Courier Masters | Bottom Sheet / Modal | `/logistics/vehicle-select-sheet` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `providers-list` | Courier & Transport List | Vehicles & Courier Masters | List | `/logistics/providers-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `add-provider` | Add Provider | Vehicles & Courier Masters | Form (Create) | `/logistics/add-provider` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `provider-details` | Provider Details | Vehicles & Courier Masters | Details | `/logistics/provider-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-provider` | Edit Provider | Vehicles & Courier Masters | Form (Edit) | `/logistics/edit-provider` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `provider-select-sheet` | Select Provider (Sheet) | Vehicles & Courier Masters | Bottom Sheet / Modal | `/logistics/provider-select-sheet` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `payments-list` | Customer Payments List | Customer Payments | List | `/logistics/payments-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `payment-verify` | Payment Verification | Customer Payments | List | `/logistics/payment-verify` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `record-payment` | Record Customer Payment | Customer Payments | Form (Create) | `/logistics/record-payment` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `payment-details` | Customer Payment Details | Customer Payments | Details | `/logistics/payment-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `packing-list` | Packing List | Packing, Challan & Dispatch | List | `/logistics/packing-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `prepare-packing` | Prepare Packing | Packing, Challan & Dispatch | List | `/logistics/prepare-packing` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `packing-details` | Packing Details | Packing, Challan & Dispatch | Details | `/logistics/packing-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `packing-preview` | Packing List Preview | Packing, Challan & Dispatch | Preview | `/logistics/packing-preview` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `challan-list` | Delivery Challans List | Packing, Challan & Dispatch | List | `/logistics/challan-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-challan` | Create Delivery Challan | Packing, Challan & Dispatch | Form (Create) | `/logistics/create-challan` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `challan-preview` | Delivery Challan Preview | Packing, Challan & Dispatch | Preview | `/logistics/challan-preview` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ready-dispatch` | Ready to Dispatch | Packing, Challan & Dispatch | List | `/logistics/ready-dispatch` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `dispatch-own` | Own Vehicle Dispatch | Packing, Challan & Dispatch | List | `/logistics/dispatch-own` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `dispatch-courier` | Courier / Transport Dispatch | Packing, Challan & Dispatch | List | `/logistics/dispatch-courier` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `dispatch-confirm` | Dispatch Confirmation | Packing, Challan & Dispatch | List | `/logistics/dispatch-confirm` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `dispatched-list` | Dispatched Orders List | Packing, Challan & Dispatch | List | `/logistics/dispatched-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `dispatch-details` | Dispatch Details | Packing, Challan & Dispatch | Details | `/logistics/dispatch-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `tracking-list` | Delivery Tracking List | Tracking, Exceptions & POD | List | `/logistics/tracking-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `track-own` | Own Vehicle Tracking | Tracking, Exceptions & POD | List | `/logistics/track-own` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `track-courier` | Courier Tracking | Tracking, Exceptions & POD | List | `/logistics/track-courier` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `update-status` | Update Delivery Status | Tracking, Exceptions & POD | List | `/logistics/update-status` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `delayed-list` | Delayed Deliveries | Tracking, Exceptions & POD | List | `/logistics/delayed-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `reschedule` | Reschedule Delivery | Tracking, Exceptions & POD | List | `/logistics/reschedule` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `delivery-failed` | Delivery Failed | Tracking, Exceptions & POD | List | `/logistics/delivery-failed` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `delivery-confirm` | Delivery Confirmation (POD) | Tracking, Exceptions & POD | List | `/logistics/delivery-confirm` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `delivery-success` | Delivery Success | Tracking, Exceptions & POD | List | `/logistics/delivery-success` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `pod-details` | Proof of Delivery Details | Tracking, Exceptions & POD | Details | `/logistics/pod-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `expenses-list` | Transport Expenses List | Expenses, Returns & History | List | `/logistics/expenses-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `add-expense` | Add Delivery Expense | Expenses, Returns & History | Form (Create) | `/logistics/add-expense` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `expense-details` | Delivery Expense Details | Expenses, Returns & History | Details | `/logistics/expense-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `record-transport-pay` | Record Transport Payment | Expenses, Returns & History | Form (Create) | `/logistics/record-transport-pay` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `product-return` | Product Return | Expenses, Returns & History | List | `/logistics/product-return` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `completed-list` | Completed Deliveries List | Expenses, Returns & History | List | `/logistics/completed-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `completed-details` | Completed Delivery Details | Expenses, Returns & History | Details | `/logistics/completed-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `delivery-history` | Delivery History | Expenses, Returns & History | List | `/logistics/delivery-history` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ui-states` | Common UI States (17) | Common UI States | State Gallery | `/logistics/ui-states` | N/A | View, Navigate, Filter | Pending (Batch 3) |

## Production Management
**Design File**: `design/cryo_erp_production_management_mobile_app.html`

| Screen ID | Screen Name | Group / Category | Type | Route Path | Bottom Nav Item | Primary Actions | Implementation Status |
|---|---|---|---|---|---|---|---|
| `dashboard` | Production Dashboard | Core & Navigation Hubs | Dashboard | `/production/dashboard` | N/A | View Metrics, Quick Navigation, Search | Pending (Batch 3) |
| `orders-hub` | Orders Hub | Core & Navigation Hubs | Hub / Overview | `/production/orders-hub` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `materials-hub` | Materials Hub | Core & Navigation Hubs | Hub / Overview | `/production/materials-hub` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `production-hub` | Production Hub | Core & Navigation Hubs | Hub / Overview | `/production/production-hub` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `more` | More Menu | Core & Navigation Hubs | List | `/production/more` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `notifications` | Notifications | Core & Navigation Hubs | Notifications | `/production/notifications` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `profile` | Profile | Core & Navigation Hubs | Profile | `/production/profile` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `incoming-so-list` | Incoming Sales Orders | Orders (Incoming & Production) | List | `/production/incoming-so-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `incoming-so-details` | Incoming SO Details | Orders (Incoming & Production) | Details | `/production/incoming-so-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `create-pro` | Create Production Order | Orders (Incoming & Production) | Form (Create) | `/production/create-pro` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `pro-list` | Production Orders List | Orders (Incoming & Production) | List | `/production/pro-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `pro-details` | Production Order Details | Orders (Incoming & Production) | Details | `/production/pro-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-pro` | Edit Production Order | Orders (Incoming & Production) | Form (Edit) | `/production/edit-pro` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `bom-list` | BOM List | BOM & Materials | List | `/production/bom-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-bom` | Create / Prepare BOM | BOM & Materials | Form (Create) | `/production/create-bom` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `add-material-sheet` | Request New Material (Sheet) | BOM & Materials | Form (Create) | `/production/add-material-sheet` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `bom-details` | BOM Details | BOM & Materials | Details | `/production/bom-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `mr-list` | Material Requests List | BOM & Materials | List | `/production/mr-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-mr` | Create Material Request | BOM & Materials | Form (Create) | `/production/create-mr` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `mr-details` | Material Request Details | BOM & Materials | Details | `/production/mr-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `receipt-list` | Material Receipts List | BOM & Materials | List | `/production/receipt-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `confirm-receipt` | Confirm Material Receipt | BOM & Materials | List | `/production/confirm-receipt` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `receipt-details` | Material Receipt Details | BOM & Materials | Details | `/production/receipt-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `plan-list` | Production Planning List | Planning & Daily Production | List | `/production/plan-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-plan` | Create Production Plan | Planning & Daily Production | Form (Create) | `/production/create-plan` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `plan-details` | Production Plan Details | Planning & Daily Production | Details | `/production/plan-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `start-prod-sheet` | Start Production (Sheet) | Planning & Daily Production | Bottom Sheet / Modal | `/production/start-prod-sheet` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `daily-list` | Daily Production List | Planning & Daily Production | List | `/production/daily-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `add-daily-update` | Add Daily Update | Planning & Daily Production | Form (Create) | `/production/add-daily-update` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `daily-update-details` | Daily Update Details | Planning & Daily Production | Details | `/production/daily-update-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `prod-progress` | Production Progress | Planning & Daily Production | List | `/production/prod-progress` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `additional-mr` | Additional Material Request | Planning & Daily Production | Form (Create) | `/production/additional-mr` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `mark-finished-sheet` | Mark Finished (Sheet) | Planning & Daily Production | Bottom Sheet / Modal | `/production/mark-finished-sheet` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `qc-list` | Quality Check List | Quality, Rework & Completion | List | `/production/qc-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `qc-inspection` | Quality Inspection | Quality, Rework & Completion | List | `/production/qc-inspection` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `qc-result` | Quality Check Result | Quality, Rework & Completion | List | `/production/qc-result` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-rework` | Create Rework | Quality, Rework & Completion | Form (Create) | `/production/create-rework` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `rework-details` | Rework Details & Update | Quality, Rework & Completion | Details | `/production/rework-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `complete-prod` | Complete Production | Quality, Rework & Completion | List | `/production/complete-prod` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `completed-list` | Completed Production List | Quality, Rework & Completion | List | `/production/completed-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `completed-details` | Completed Production Details | Quality, Rework & Completion | Details | `/production/completed-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `send-logistics-sheet` | Send to Logistics (Sheet) | Quality, Rework & Completion | Bottom Sheet / Modal | `/production/send-logistics-sheet` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ui-states` | Common UI States (13) | Common UI States | State Gallery | `/production/ui-states` | N/A | View, Navigate, Filter | Pending (Batch 3) |

## Sales Management
**Design File**: `design/cryo_erp_sales_management_mobile_app.html`

| Screen ID | Screen Name | Group / Category | Type | Route Path | Bottom Nav Item | Primary Actions | Implementation Status |
|---|---|---|---|---|---|---|---|
| `dashboard` | Sales Dashboard | Core & Navigation | Dashboard | `/sales/dashboard` | home | View Metrics, Quick Navigation, Search | Pending (Batch 3) |
| `orders-hub` | Orders Hub | Core & Navigation | Hub / Overview | `/sales/orders-hub` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `more` | More Menu | Core & Navigation | List | `/sales/more` | more | View, Navigate, Filter | Pending (Batch 3) |
| `profile` | Profile | Core & Navigation | Profile | `/sales/profile` | more | View, Navigate, Filter | Pending (Batch 3) |
| `notifications` | Notifications | Core & Navigation | Notifications | `/sales/notifications` | home | View, Navigate, Filter | Pending (Batch 3) |
| `enquiry-list` | Enquiry List | Enquiries | List | `/sales/enquiry-list` | enquiries | View, Navigate, Filter | Pending (Batch 3) |
| `create-enquiry` | Create Enquiry | Enquiries | Form (Create) | `/sales/create-enquiry` | enquiries | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `enquiry-details` | Enquiry Details | Enquiries | Details | `/sales/enquiry-details` | enquiries | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-enquiry` | Edit Enquiry | Enquiries | Form (Edit) | `/sales/edit-enquiry` | enquiries | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `qualified-enquiries` | Qualified Enquiries | Enquiries | List | `/sales/qualified-enquiries` | enquiries | View, Navigate, Filter | Pending (Batch 3) |
| `followups` | Follow-ups List | Follow-ups | List | `/sales/followups` | followups | View, Navigate, Filter | Pending (Batch 3) |
| `add-followup` | Add Follow-up | Follow-ups | Form (Create) | `/sales/add-followup` | followups | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `update-followup` | Update Follow-up | Follow-ups | List | `/sales/update-followup` | followups | View, Navigate, Filter | Pending (Batch 3) |
| `customers` | Customers List | Customer & Product Masters | List | `/sales/customers` | more | View, Navigate, Filter | Pending (Batch 3) |
| `add-customer` | Add Customer | Customer & Product Masters | Form (Create) | `/sales/add-customer` | more | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `customer-details` | Customer Details | Customer & Product Masters | Details | `/sales/customer-details` | more | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-customer` | Edit Customer | Customer & Product Masters | Form (Edit) | `/sales/edit-customer` | more | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `products` | Products List | Customer & Product Masters | List | `/sales/products` | more | View, Navigate, Filter | Pending (Batch 3) |
| `add-product` | Add Product | Customer & Product Masters | Form (Create) | `/sales/add-product` | more | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `product-details` | Product Details | Customer & Product Masters | Details | `/sales/product-details` | more | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-product` | Edit Product | Customer & Product Masters | Form (Edit) | `/sales/edit-product` | more | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `quotation-list` | Quotation List | Quotations & Negotiation | List | `/sales/quotation-list` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `create-quotation` | Create Quotation | Quotations & Negotiation | Form (Create) | `/sales/create-quotation` | orders | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `quotation-preview` | Quotation Preview | Quotations & Negotiation | Preview | `/sales/quotation-preview` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `send-quotation` | Send Quotation (Sheet) | Quotations & Negotiation | List | `/sales/send-quotation` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `quotation-details` | Quotation Details | Quotations & Negotiation | Details | `/sales/quotation-details` | orders | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `quotation-acceptance` | Quotation Acceptance | Quotations & Negotiation | List | `/sales/quotation-acceptance` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `quotation-negotiation` | Quotation Negotiation | Quotations & Negotiation | List | `/sales/quotation-negotiation` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `revise-quotation` | Revise Quotation | Quotations & Negotiation | List | `/sales/revise-quotation` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `quotation-rejection` | Quotation Rejection | Quotations & Negotiation | List | `/sales/quotation-rejection` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `pi-list` | Proforma Invoice List | Proforma Invoices & Customer PO | List | `/sales/pi-list` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `create-pi` | Create Proforma Invoice | Proforma Invoices & Customer PO | Form (Create) | `/sales/create-pi` | orders | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `pi-details` | PI Details & Preview | Proforma Invoices & Customer PO | Details | `/sales/pi-details` | orders | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `po-list` | Customer PO List | Proforma Invoices & Customer PO | List | `/sales/po-list` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `record-po` | Record Customer PO | Proforma Invoices & Customer PO | Form (Create) | `/sales/record-po` | orders | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `po-details` | Customer PO Details | Proforma Invoices & Customer PO | Details | `/sales/po-details` | orders | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `payments` | Payments List | Payments & Sales Orders | List | `/sales/payments` | more | View, Navigate, Filter | Pending (Batch 3) |
| `record-payment` | Record Payment | Payments & Sales Orders | Form (Create) | `/sales/record-payment` | more | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `payment-details` | Payment Details | Payments & Sales Orders | Details | `/sales/payment-details` | more | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `so-list` | Sales Order List | Payments & Sales Orders | List | `/sales/so-list` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `create-so` | Create Sales Order | Payments & Sales Orders | Form (Create) | `/sales/create-so` | orders | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `so-details` | Sales Order Details | Payments & Sales Orders | Details | `/sales/so-details` | orders | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `send-production` | Send to Production | Payments & Sales Orders | List | `/sales/send-production` | orders | View, Navigate, Filter | Pending (Batch 3) |
| `ui-states` | Common UI States (9) | System & Common UI States | State Gallery | `/sales/ui-states` | more | View, Navigate, Filter | Pending (Batch 3) |

## Supply Chain Management
**Design File**: `design/cryo_erp_supply_chain_management_mobile_app.html`

| Screen ID | Screen Name | Group / Category | Type | Route Path | Bottom Nav Item | Primary Actions | Implementation Status |
|---|---|---|---|---|---|---|---|
| `dashboard` | Supply Chain Dashboard | Core & Navigation Hubs | Dashboard | `/supply-chain/dashboard` | N/A | View Metrics, Quick Navigation, Search | Pending (Batch 3) |
| `requests-hub` | Requests Hub | Core & Navigation Hubs | Hub / Overview | `/supply-chain/requests-hub` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `inventory-hub` | Inventory Hub | Core & Navigation Hubs | Hub / Overview | `/supply-chain/inventory-hub` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `purchase-hub` | Purchase Hub | Core & Navigation Hubs | Hub / Overview | `/supply-chain/purchase-hub` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `more` | More Menu | Core & Navigation Hubs | List | `/supply-chain/more` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `notifications` | Notifications | Core & Navigation Hubs | Notifications | `/supply-chain/notifications` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `profile` | Profile | Core & Navigation Hubs | Profile | `/supply-chain/profile` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `mr-list` | Material Requests List | Production Requests & Stock Check | List | `/supply-chain/mr-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `mr-details` | Material Request Details | Production Requests & Stock Check | Details | `/supply-chain/mr-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `stock-check` | Stock Availability Check | Production Requests & Stock Check | List | `/supply-chain/stock-check` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `pending-shortage` | Pending Material Shortages | Production Requests & Stock Check | List | `/supply-chain/pending-shortage` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `materials-list` | Materials Master List | Materials Master & Inventory | List | `/supply-chain/materials-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `add-material` | Add Material | Materials Master & Inventory | Form (Create) | `/supply-chain/add-material` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `material-details` | Material Details | Materials Master & Inventory | Details | `/supply-chain/material-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-material` | Edit Material | Materials Master & Inventory | Form (Edit) | `/supply-chain/edit-material` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `material-approval` | New Material Approval | Materials Master & Inventory | List | `/supply-chain/material-approval` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `inventory` | Inventory List | Materials Master & Inventory | List | `/supply-chain/inventory` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `inventory-details` | Inventory Details | Materials Master & Inventory | Details | `/supply-chain/inventory-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `stock-history` | Stock History | Materials Master & Inventory | List | `/supply-chain/stock-history` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `stock-adjustment` | Stock Adjustment | Materials Master & Inventory | List | `/supply-chain/stock-adjustment` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `suppliers-list` | Suppliers List | Suppliers & Purchasing | List | `/supply-chain/suppliers-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `add-supplier` | Add Supplier | Suppliers & Purchasing | Form (Create) | `/supply-chain/add-supplier` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `supplier-details` | Supplier Details | Suppliers & Purchasing | Details | `/supply-chain/supplier-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-supplier` | Edit Supplier | Suppliers & Purchasing | Form (Edit) | `/supply-chain/edit-supplier` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `pr-list` | Purchase Requirements | Suppliers & Purchasing | List | `/supply-chain/pr-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-pr` | Create Purchase Req | Suppliers & Purchasing | Form (Create) | `/supply-chain/create-pr` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `pr-details` | Purchase Req Details | Suppliers & Purchasing | Details | `/supply-chain/pr-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `po-list` | Purchase Orders List | Suppliers & Purchasing | List | `/supply-chain/po-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-po` | Create Purchase Order | Suppliers & Purchasing | Form (Create) | `/supply-chain/create-po` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `po-preview` | PO Preview | Suppliers & Purchasing | Preview | `/supply-chain/po-preview` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `send-po-sheet` | Send PO (Sheet) | Suppliers & Purchasing | Bottom Sheet / Modal | `/supply-chain/send-po-sheet` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `po-details` | PO Details | Suppliers & Purchasing | Details | `/supply-chain/po-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `edit-po` | Edit Purchase Order | Suppliers & Purchasing | Form (Edit) | `/supply-chain/edit-po` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `grn-list` | GRN List | GRN, Material Issues & Returns | List | `/supply-chain/grn-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-grn` | Create GRN | GRN, Material Issues & Returns | Form (Create) | `/supply-chain/create-grn` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `confirm-grn` | GRN Confirmation | GRN, Material Issues & Returns | List | `/supply-chain/confirm-grn` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `grn-details` | GRN Details | GRN, Material Issues & Returns | Details | `/supply-chain/grn-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `mi-list` | Material Issues List | GRN, Material Issues & Returns | List | `/supply-chain/mi-list` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `create-mi` | Create Material Issue | GRN, Material Issues & Returns | Form (Create) | `/supply-chain/create-mi` | N/A | Input, Validate, Submit, Cancel | Pending (Batch 3) |
| `confirm-mi` | Confirm Material Issue | GRN, Material Issues & Returns | List | `/supply-chain/confirm-mi` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `mi-details` | Material Issue Details | GRN, Material Issues & Returns | Details | `/supply-chain/mi-details` | N/A | View Details, Edit, Transition Workflow | Pending (Batch 3) |
| `material-return` | Material Return | GRN, Material Issues & Returns | List | `/supply-chain/material-return` | N/A | View, Navigate, Filter | Pending (Batch 3) |
| `ui-states` | Common UI States (17) | Common UI States | State Gallery | `/supply-chain/ui-states` | N/A | View, Navigate, Filter | Pending (Batch 3) |

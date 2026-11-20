# Project Documentation

## Project Overview
- Project purpose: Complete, modern, simple, and user-friendly mobile-first React frontend application for Cryo Enterprise ERP, converted from Google Stitch approved HTML designs.
- Technology stack: React 18, Vite, JavaScript (JSX), Material UI (MUI v6), Google Material Icons (`@mui/icons-material`), SCSS, SCSS Modules, Google Fonts (`Inter`), React Router DOM v6, Zustand for shared application state, Axios for future API client architecture, React Hook Form for complex forms.
- Main architecture: Mobile-first responsive web architecture with department-based modules (`admin`, `sales`, `production`, `supply-chain`, `logistics`, `employees`), shared layout wrappers with persistent department bottom navigations, centralized theme, and unified mock database state across all departments.
- Important conventions: Every visual component has its own folder (`ComponentName/ComponentName.jsx` and `ComponentName.module.scss`). Standard container layout `.container -> .wrapper -> .toprow, .middlerow, .bottomrow`. Strictly no React Native, Next.js, TypeScript, Tailwind, Bootstrap, or unsupported icon libraries.

## Project Structure
- Important folders:
  - `design/`: Read-only original HTML design references from Google Stitch (7 HTML files).
  - `docs/`: Screen inventory (`SCREEN_INVENTORY.md`), navigation map (`NAVIGATION_MAP.md`), workflow map (`WORKFLOW_MAP.md`), and completion report (`PHASE_3_COMPLETION.md`).
  - `src/assets/`: Static brand assets and icons.
  - `src/components/common/`: Shared reusable components (`AppHeader`, `PageHeader`, `StatusBadge`, `SummaryCard`, `DepartmentSwitcher`).
  - `src/components/navigation/`: Navigation components (`DepartmentBottomNav`).
  - `src/layouts/`: Common layouts (`AuthLayout`, `AdminLayout`, `DepartmentLayout`).
  - `src/modules/`: Department modules (`auth`, `admin`, `sales`, `production`, `supply-chain`, `logistics`, `employees`, `shared`).
  - `src/stores/`: Zustand stores (`authStore.js`, `erpStore.js`).
  - `src/styles/`: Global variables (`_variables.scss`), mixins (`_mixins.scss`), and reset styles (`global.scss`).
  - `src/theme/`: Centralized MUI ThemeProvider configuration (`theme.js`, `ThemeProvider.jsx`).
  - `src/services/`: API client foundation (`apiClient.js`).
  - `src/utils/`: Formatting utilities (`formatters.js`).
  - `src/constants/`: Department and persona definitions (`departments.js`, `personas.js`).
- Important files:
  - `project.md`: Single source of truth for all changes and decisions.
  - `AGENTS.md`: Mandatory development rules and workflows.
  - `src/App.jsx`: Main application router and route guards.
  - `src/main.jsx`: Vite React root entry point.
- Component structure: Dedicated folder per visual component with JSX + SCSS Module.
- Shared utilities: Currency formatting (INR), date formatting, ID generators, badge helpers.

## UI & Styling Rules
- MUI usage: Base standard components (`Box`, `Stack`, `Grid`, `Button`, `TextField`, `Card`, `Dialog`, `Drawer`, `Menu`, etc.) customized via theme.
- Google Material Icons: Standard icons imported from `@mui/icons-material`.
- SCSS Modules: Component-specific layouts, responsiveness, spacing, and styling using `.module.scss`.
- Google Fonts: Primary font is `Inter`, sans-serif.
- Responsive approach: Mobile-first (320px–480px) scaling up to Tablet (768px), Laptop (1024px), Desktop (1440px), and Wide Desktop (1920px) without horizontal clipping.
- Component structure: `.container -> .wrapper -> .toprow, .middlerow, .bottomrow`.

## Application Logic
- Authentication: Development mock authentication with switchable personas (Admin Priya Nair, Multi-department Arun Kumar, Single-department Murugan S, View-Only Ramesh, Draft User Kavya).
- State management: Zustand store for auth session and a single connected ERP mock database (`erpStore`) driving order `SO-001` through all 22 workflow stages.
- API handling: Mock service layer with simulated latency and clean REST-like interfaces ready for future backend integration.
- Business logic:
  - Material master and PO creation do not increase inventory.
  - GRN confirmation increases accepted stock.
  - Material issue decreases stock (partial and full issues tracked).
  - Production material receipt marks shopfloor readiness without duplicate inventory deductions.
  - Sales order requires quotation acceptance and PO logging.
  - Delivery dispatch requires payment verification and packing challan.
  - Delivery confirmation (POD) triggers final balance payment collection.
- Validation: Controlled inputs validating required fields, numbers, and email formats.
- Error handling: Graceful empty states, error alerts, and 404/unauthorized screens.

## API / Backend Integration
- Integration status: Backend complete and operational under `server/` with Node.js, Express.js, MongoDB (Mongoose), ES Modules, and JWT auth. Frontend mock state in root is preserved for future Phase 5 API wiring.
- API endpoints: 45+ REST endpoints prefixed at `/api/v1` covering Auth, Master Data, Employees, Sales, Production, Supply Chain, Logistics, Admin, and Reports.
- Request methods: Standard REST patterns (GET, POST, PUT, DELETE).
- Payload structures: Validated with strict Joi schemas; standard JSON response envelope `{ success, message, data, meta }`.
- Authentication requirements: Dual JWT (15-minute access token + 7-day rotated refresh token) with granular RBAC permissions.
- Database: MongoDB Server 8.0.4 with 24 business entity collections, atomic sequence counters, and immutable stock movement ledger.

## Components

### AppHeader
- Location: `src/components/common/AppHeader/`
- Purpose: Sticky top application header showing Cryo logo, current department, persona switcher, notifications, and profile.
- Props: `title`, `showBack`, `onBack`
- State: Persona switcher dropdown, profile drawer, department switcher.
- Logic: Synchronized with `authStore`.
- API dependencies: Mock auth state.
- Related components: `DepartmentSwitcher`, `AdminReturnBar`.

### DepartmentBottomNav
- Location: `src/components/navigation/DepartmentBottomNav/`
- Purpose: Fixed bottom navigation bar customized per active department.
- Props: `deptKey`
- State: Active navigation tab index based on `location.pathname`.
- Logic: Navigates using React Router.
- API dependencies: None.
- Related components: `DepartmentLayout`, `AdminLayout`.

### SummaryCard
- Location: `src/components/common/SummaryCard/`
- Purpose: Metric overview card with icon, value, title, and subtitle.
- Props: `title`, `value`, `subtitle`, `icon`, `accentColor`, `onClick`
- State: None.
- Logic: Formats and displays KPI metrics.

### StatusBadge
- Location: `src/components/common/StatusBadge/`
- Purpose: Color-coded status chip with indicator dot.
- Props: `status`, `size`
- State: None.
- Logic: Resolves colors dynamically via `getStatusColor`.

## Change History

### 2026-11-20
- **Phase 4 Complete: Cryo Enterprise ERP Backend Architecture, Database & Complete API Development**:
  - **Modular Monolithic Backend (`server/`)**: Initialized with Express.js, Mongoose, ES Modules, JWT auth (access & refresh rotation), bcrypt password hashing, Joi validation, Helmet, CORS, and Morgan.
  - **Atomic Concurrency Counters (`server/src/utils/counter.js`)**: Implemented MongoDB atomic `$inc` sequence generator for all ERP documents (`SO-xxx`, `PRO-xxx`, `MR-xxx`, `PO-xxx`, `GRN-xxx`, `DEL-xxx`, `DC-xxx`, etc.).
  - **Master Data Models & APIs (`/api/v1/master/*`)**: Customer, Product, Material, Supplier, Vehicle, CourierProvider with text search and unique constraints.
  - **Auth & Access Control (`/api/v1/auth/*`, `/api/v1/employees/*`)**: Implemented JWT authentication, password management, and granular RBAC permissions (`view`, `create`, `edit`, `workflow`) supporting all 5 personas.
  - **Sales Backend (`/api/v1/sales/*`)**: Models and controllers for Enquiry (qualify, follow-up), Quotation (v1 -> v2 price negotiation revision, acceptance), Proforma Invoice, Customer PO, Customer Payment (advance verification), and confirmed Sales Order (`SO-001`).
  - **Production Backend (`/api/v1/production/*`)**: Models and controllers for Production Order (`PRO-001`), BOM confirmation (`BOM-001`), Material Request (`MR-001`), Shopfloor Material Receipt (`RCPT-001`, verified without duplicate inventory deduction), Daily Updates (25% to 100%), and Quality Inspection (`QC-001` passed, triggering Logistics handover).
  - **Supply Chain Backend (`/api/v1/supply-chain/*`)**: Models and controllers for Purchase Orders (`PO-001`, stock unchanged), Goods Receipt Notes (`GRN-001`, atomic stock increment), Material Issues (`MI-001` partial, `MI-002` full, atomic stock deduction with negative stock validation), Stock Movements ledger, and Stock Adjustments.
  - **Logistics & Delivery Backend (`/api/v1/logistics/*`)**: Models and controllers for Delivery Order (`DEL-001`), Packing Record (`PKG-001`), Delivery Challan (`DC-001`), Vehicle Dispatch (marks vehicle In Transit), and Proof of Delivery (`POD-001` with collection of final ₹50,000 balance payment, vehicle release, and full order settlement).
  - **Centralized Admin & Reports (`/api/v1/admin/*`, `/api/v1/reports/*`)**: Executive dashboard metrics, 22-stage end-to-end order journey aggregator, administrative order hold/resume/cancel, audit logs, and 7 business reports (Sales, Production, Inventory, Procurement, Logistics, Financials, Order Status).
  - **Demo Seed Script (`npm run seed:demo`)**: Created `server/src/scripts/seed.js` cleanly dropping and populating MongoDB with master data, all 5 personas, and the golden order `SO-001` through all 22 lifecycle stages.
  - **Automated Test Suite (`npm test`)**: 12/12 unit and integration tests passing with Supertest and Jest covering Auth, 22-Stage Journey, Admin Reporting, and Inventory Invariants.
  - **Comprehensive Documentation**: Created `docs/BACKEND_REQUIREMENTS.md`, `docs/DATABASE_SCHEMA.md`, `docs/API_DOCUMENTATION.md`, `docs/FRONTEND_API_MAPPING.md`, `docs/PHASE_4_COMPLETION.md`, and updated `AGENTS.md`.
  - **Frontend Verification**: Root React frontend preserved completely, builds with 0 errors (`npm run build`), and passes linting with 0 errors (`npm run lint`).



#### Change
- What was changed: Completed Batch 3A – Complete repository inspection, screen inventory mapping, navigation architecture mapping, workflow mapping, and initial documentation.
- Files changed:
  - `project.md` (Created)
  - `AGENTS.md` (Created)
  - `docs/SCREEN_INVENTORY.md` (Created)
  - `docs/NAVIGATION_MAP.md` (Created)
  - `docs/WORKFLOW_MAP.md` (Created)
- Logic changed: Initialized single source of truth for project memory and recorded all 271 catalog screens and 22 integrated workflow stages from the 7 Stitch HTML design files.
- Reason: Comply with mandatory development protocol and establish architecture before writing application code.
- Impact: Established baseline documentation, tech stack boundaries, and implementation plan.
- Verification: Inspected all 7 design files, verified parsing of 271 screens, checked file creation.

#### Change
- What was changed: Completed Batch 3B – Application Initialization. Configured Vite, React 18, Material UI v6, Material Icons, Sass, SCSS Modules, Google Fonts (Inter), Zustand, and Axios.
- Files changed:
  - `package.json`
  - `vite.config.js`
  - `index.html`
  - `eslint.config.js`
  - `.gitignore`
  - `.env.example`
  - `public/favicon.svg`
  - `src/styles/_variables.scss`
  - `src/styles/_mixins.scss`
  - `src/styles/global.scss`
  - `src/theme/theme.js`
  - `src/theme/ThemeProvider.jsx`
  - `src/constants/departments.js`
  - `src/constants/personas.js`
  - `src/utils/formatters.js`
  - `src/services/apiClient.js`
  - `src/stores/authStore.js`
  - `src/stores/erpStore.js`
- Logic changed: Installed all dependencies and established design tokens, typography, and centralized mock database state.
- Reason: Foundational setup for Phase 3 application development.
- Verification: Successful npm package installation, CSS/theme definitions verified.

#### Change
- What was changed: Completed Batch 3C – Shared Components, Layouts, Common Screens & Mock Authentication.
- Files changed:
  - `src/components/common/AppHeader/`
  - `src/components/common/DepartmentSwitcher/`
  - `src/components/common/PageHeader/`
  - `src/components/common/StatusBadge/`
  - `src/components/common/SummaryCard/`
  - `src/components/navigation/DepartmentBottomNav/`
  - `src/layouts/AuthLayout/`
  - `src/layouts/DepartmentLayout/`
  - `src/layouts/AdminLayout/`
  - `src/modules/auth/Login/`
  - `src/modules/auth/SelectDepartment/`
  - `src/modules/auth/ForgotPassword/`
  - `src/modules/shared/Unauthorized/`
  - `src/modules/shared/NotFound/`
  - `src/modules/shared/Notifications/`
  - `src/modules/shared/Profile/`
- Logic changed: Implemented role-based layout rendering, department switching, bottom navigation, and shared visual components.
- Verification: Component builds verified with SCSS modules.

#### Change
- What was changed: Completed Batch 3D – Sales Management Module.
- Files changed:
  - `src/modules/sales/SalesDashboard/`
  - `src/modules/sales/EnquiryManagement/`
  - `src/modules/sales/FollowupManagement/`
  - `src/modules/sales/QuotationManagement/`
  - `src/modules/sales/OrderManagement/`
  - `src/modules/sales/CustomerProductMaster/`
  - `src/modules/sales/SalesMoreMenu/`
- Logic changed: Converted all Sales HTML prototype screens into interactive React components. Implemented Enquiry CRUD, Quotation creation with PDF preview, Customer PO recording, and Confirmed Sales Orders with "Send to Production" action.
- Verification: Verified form validation, quotation calculations, and state propagation to `useErpStore`.

#### Change
- What was changed: Completed Batch 3E – Production Management Module.
- Files changed:
  - `src/modules/production/ProductionDashboard/`
  - `src/modules/production/ProductionOrderBOM/`
  - `src/modules/production/ProductionDailyQC/`
  - `src/modules/production/ProductionMoreMenu/`
- Logic changed: Converted all Production HTML prototype screens into interactive React components. Implemented Production Orders (PRO-001), BOM-001 confirmation, Material Requests (MR-001), Material Receipts confirmation, Daily assembly progress tracking, and Quality Check pass.
- Verification: Verified shopfloor readiness checklist and Handover to Logistics transition.

#### Change
- What was changed: Completed Batch 3F – Supply Chain Management Module.
- Files changed:
  - `src/modules/supply-chain/SCMDashboard/`
  - `src/modules/supply-chain/SCMInventory/`
  - `src/modules/supply-chain/SCMPurchaseGRN/`
  - `src/modules/supply-chain/SCMMoreMenu/`
- Logic changed: Converted all Supply Chain HTML prototype screens. Implemented Raw Materials Master with safety stock alerts, Supplier Purchase Orders, Goods Receipt Note (GRN) confirmation (increases accepted inventory), and Material Issues (MI-001 & MI-002 decreases inventory).
- Verification: Verified stock invariance rules (creating PO does not increase stock; GRN confirmation increases stock; material issue decreases stock).

#### Change
- What was changed: Completed Batch 3G – Logistics & Delivery Management Module.
- Files changed:
  - `src/modules/logistics/LogisticsDashboard/`
  - `src/modules/logistics/LogisticsPlanningDispatch/`
  - `src/modules/logistics/LogisticsTrackingPOD/`
  - `src/modules/logistics/LogisticsMoreMenu/`
- Logic changed: Converted all Logistics HTML prototype screens. Implemented Delivery Planning (DEL-001), Packaging inspection (PKG-001), Delivery Challan preview (DC-001), Vehicle Dispatch, Live Milestone Tracking, Proof of Delivery (POD) signing, and on-delivery Balance Payment Collection.
- Verification: Verified order transition to "In Transit" and "Delivered" with balance payment settlement.

#### Change
- What was changed: Completed Batch 3H – Employee Management & Permissions Module.
- Files changed:
  - `src/modules/employees/EmployeeDashboard/`
  - `src/modules/employees/EmployeeListAccess/`
  - `src/modules/employees/PermissionMatrixRoles/`
  - `src/modules/employees/EmployeeMoreMenu/`
- Logic changed: Converted all Employee Management HTML prototype screens. Implemented Staff Directory, Department Assignment modal, and full reusable Permission Matrix component with granular action-level toggles (View, Create, Edit, Workflow).
- Verification: Verified persona switching and permission policy evaluation.

#### Change
- What was changed: Completed Batch 3I – Centralized Admin Management Module.
- Files changed:
  - `src/modules/admin/AdminDashboard/`
  - `src/modules/admin/OrderJourney/`
  - `src/modules/admin/AdminFinancialsApprovals/`
  - `src/modules/admin/AdminReports/`
  - `src/modules/admin/AdminMoreMenu/`
- Logic changed: Converted all Centralized Admin HTML prototype screens. Implemented 6 Business Overview Cards, complete 22-Stage Order Journey tracker with jump-to-screen actions, Management Approvals Queue, Customer Payments Ledger, and 7 Departmental Reports.
- Verification: Verified end-to-end order traceability and navigation links across all department screens.

#### Change
- What was changed: Completed Batch 3J – Integration, Testing, Code Quality & Phase 3 Documentation.
- Files changed:
  - `src/App.jsx`
  - `src/main.jsx`
  - `docs/PHASE_3_COMPLETION.md`
  - `project.md`
  - `README.md`
- Logic changed: Configured application router with full nested routing and fallback handlers. Fixed linting rules and verified production build.
- Verification: `npm run lint` passed with 0 errors. `npm run build` completed in 13.47s generating production-ready bundle.

## Current Progress
- Completed:
  - Batch 3A – Inspection and Documentation
  - Batch 3B – Application Initialization
  - Batch 3C – Shared Components and Common Layouts
  - Batch 3D – Sales Management
  - Batch 3E – Production Management
  - Batch 3F – Supply Chain Management
  - Batch 3G – Logistics Management
  - Batch 3H – Employee Management & Permissions
  - Batch 3I – Centralized Admin Management
  - Batch 3J – Integration, Quality Review & Completion Report
- In Progress: None (Phase 3 Completed).
- Pending: Phase 4 (Backend Integration & Production APIs, pending user request).

## Known Issues
- Issue: None. Production build and lint both exit with code 0.
- Status: Verified.
- Notes: Development mock mode is active; future backend endpoints remain documented as pending real server contract.

## Technical Decisions
- Decision: Select Google Font `Inter` as the unified typography across all modules.
- Reason: All 7 approved Stitch HTML designs consistently link to and declare `font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`.
- Date: 2026-11-20

- Decision: Consolidate mock order workflow around reference order `SO-001` (ABC Laboratory, Deep Freezer -80°C).
- Reason: Matches the exact mock scenario across all HTML design files and Section 34 of the specification.
- Date: 2026-11-20

- Decision: Component styling primarily using SCSS Modules with strict layout convention (`.container -> .wrapper -> .toprow, .middlerow, .bottomrow`).
- Reason: Comply with mandatory technology stack and prevent repetitive inline or sx styles.
- Date: 2026-11-20

## Important Notes
- The `design/` folder is read-only and remains preserved.
- No TypeScript, React Native, Tailwind CSS, or unsupported icon libraries were introduced.
- All visual components strictly adhere to the `.container -> .wrapper -> .toprow, .middlerow, .bottomrow` layout convention with SCSS Modules.

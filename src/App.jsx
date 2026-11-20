import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Layouts
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import DepartmentLayout from './layouts/DepartmentLayout/DepartmentLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

// Common / Auth
import Login from './modules/auth/Login/Login';
import SelectDepartment from './modules/auth/SelectDepartment/SelectDepartment';
import ForgotPassword from './modules/auth/ForgotPassword/ForgotPassword';
import Unauthorized from './modules/shared/Unauthorized/Unauthorized';
import NotFound from './modules/shared/NotFound/NotFound';
import Notifications from './modules/shared/Notifications/Notifications';
import Profile from './modules/shared/Profile/Profile';

// Sales
import SalesDashboard from './modules/sales/SalesDashboard/SalesDashboard';
import EnquiryManagement from './modules/sales/EnquiryManagement/EnquiryManagement';
import FollowupManagement from './modules/sales/FollowupManagement/FollowupManagement';
import QuotationManagement from './modules/sales/QuotationManagement/QuotationManagement';
import OrderManagement from './modules/sales/OrderManagement/OrderManagement';
import CustomerProductMaster from './modules/sales/CustomerProductMaster/CustomerProductMaster';
import SalesMoreMenu from './modules/sales/SalesMoreMenu/SalesMoreMenu';

// Production
import ProductionDashboard from './modules/production/ProductionDashboard/ProductionDashboard';
import ProductionOrderBOM from './modules/production/ProductionOrderBOM/ProductionOrderBOM';
import ProductionDailyQC from './modules/production/ProductionDailyQC/ProductionDailyQC';
import ProductionMoreMenu from './modules/production/ProductionMoreMenu/ProductionMoreMenu';

// Supply Chain
import SCMDashboard from './modules/supply-chain/SCMDashboard/SCMDashboard';
import SCMInventory from './modules/supply-chain/SCMInventory/SCMInventory';
import SCMPurchaseGRN from './modules/supply-chain/SCMPurchaseGRN/SCMPurchaseGRN';
import SCMMoreMenu from './modules/supply-chain/SCMMoreMenu/SCMMoreMenu';

// Logistics
import LogisticsDashboard from './modules/logistics/LogisticsDashboard/LogisticsDashboard';
import LogisticsPlanningDispatch from './modules/logistics/LogisticsPlanningDispatch/LogisticsPlanningDispatch';
import LogisticsTrackingPOD from './modules/logistics/LogisticsTrackingPOD/LogisticsTrackingPOD';
import LogisticsMoreMenu from './modules/logistics/LogisticsMoreMenu/LogisticsMoreMenu';

// Employees
import EmployeeDashboard from './modules/employees/EmployeeDashboard/EmployeeDashboard';
import EmployeeListAccess from './modules/employees/EmployeeListAccess/EmployeeListAccess';
import PermissionMatrixRoles from './modules/employees/PermissionMatrixRoles/PermissionMatrixRoles';
import EmployeeMoreMenu from './modules/employees/EmployeeMoreMenu/EmployeeMoreMenu';

// Admin
import AdminDashboard from './modules/admin/AdminDashboard/AdminDashboard';
import OrderJourney from './modules/admin/OrderJourney/OrderJourney';
import AdminFinancialsApprovals from './modules/admin/AdminFinancialsApprovals/AdminFinancialsApprovals';
import AdminReports from './modules/admin/AdminReports/AdminReports';
import AdminMoreMenu from './modules/admin/AdminMoreMenu/AdminMoreMenu';

export const App = () => {
  const { isAuthenticated, currentPersona, activeDept } = useAuthStore();

  const getDefaultRedirect = () => {
    if (!isAuthenticated) return '/login';
    if (currentPersona.isAdmin) return '/admin/dashboard';
    return `/${activeDept || currentPersona.depts[0] || 'sales'}/dashboard`;
  };

  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to={getDefaultRedirect()} replace />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/select-department" element={<SelectDepartment />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Admin Module */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="order-journey" element={<OrderJourney />} />
        <Route path="all-orders" element={<OrderJourney />} />
        <Route path="departments-overview" element={<AdminDashboard />} />
        <Route path="payments-dashboard" element={<AdminFinancialsApprovals />} />
        <Route path="approvals" element={<AdminFinancialsApprovals />} />
        <Route path="reports-dashboard" element={<AdminReports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="more" element={<AdminMoreMenu />} />
      </Route>

      {/* Sales Module */}
      <Route path="/sales" element={<DepartmentLayout deptKey="sales" />}>
        <Route path="dashboard" element={<SalesDashboard />} />
        <Route path="enquiry-list" element={<EnquiryManagement />} />
        <Route path="create-enquiry" element={<EnquiryManagement />} />
        <Route path="followups" element={<FollowupManagement />} />
        <Route path="quotation-list" element={<QuotationManagement />} />
        <Route path="create-quotation" element={<QuotationManagement />} />
        <Route path="so-list" element={<OrderManagement />} />
        <Route path="so-details/:id" element={<OrderManagement />} />
        <Route path="customers" element={<CustomerProductMaster />} />
        <Route path="products" element={<CustomerProductMaster />} />
        <Route path="payments" element={<OrderManagement />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="more" element={<SalesMoreMenu />} />
      </Route>

      {/* Production Module */}
      <Route path="/production" element={<DepartmentLayout deptKey="production" />}>
        <Route path="dashboard" element={<ProductionDashboard />} />
        <Route path="orders-hub" element={<ProductionOrderBOM />} />
        <Route path="materials-hub" element={<ProductionOrderBOM />} />
        <Route path="production-hub" element={<ProductionDailyQC />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="more" element={<ProductionMoreMenu />} />
      </Route>

      {/* Supply Chain Module */}
      <Route path="/supply-chain" element={<DepartmentLayout deptKey="supply-chain" />}>
        <Route path="dashboard" element={<SCMDashboard />} />
        <Route path="requests-hub" element={<SCMPurchaseGRN />} />
        <Route path="inventory-hub" element={<SCMInventory />} />
        <Route path="purchase-hub" element={<SCMPurchaseGRN />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="more" element={<SCMMoreMenu />} />
      </Route>

      {/* Logistics Module */}
      <Route path="/logistics" element={<DepartmentLayout deptKey="logistics" />}>
        <Route path="dashboard" element={<LogisticsDashboard />} />
        <Route path="orders-hub" element={<LogisticsPlanningDispatch />} />
        <Route path="dispatch-hub" element={<LogisticsPlanningDispatch />} />
        <Route path="tracking-hub" element={<LogisticsTrackingPOD />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="more" element={<LogisticsMoreMenu />} />
      </Route>

      {/* Employee & Permissions Module */}
      <Route path="/employees" element={<DepartmentLayout deptKey="employees" />}>
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="employees-list" element={<EmployeeListAccess />} />
        <Route path="departments-list" element={<EmployeeListAccess />} />
        <Route path="permissions-hub" element={<PermissionMatrixRoles />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="more" element={<EmployeeMoreMenu />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

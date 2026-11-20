// Department metadata, routes, colors, and navigation items

export const DEPARTMENTS = {
  admin: {
    key: 'admin',
    name: 'Admin & Management',
    shortName: 'Admin',
    path: '/admin',
    homeRoute: '/admin/dashboard',
    color: '#1E3A8A',
    lightBg: '#EFF6FF',
    borderColor: '#BFDBFE',
    badgeText: 'Admin HQ',
    navItems: [
      { id: 'home', label: 'Home', icon: 'Dashboard', path: '/admin/dashboard' },
      { id: 'departments', label: 'Departments', icon: 'Business', path: '/admin/departments-overview' },
      { id: 'orders', label: 'Orders', icon: 'Assignment', path: '/admin/all-orders' },
      { id: 'reports', label: 'Reports', icon: 'Assessment', path: '/admin/reports-dashboard' },
      { id: 'more', label: 'More', icon: 'MoreHoriz', path: '/admin/more' }
    ]
  },
  sales: {
    key: 'sales',
    name: 'Sales Management',
    shortName: 'Sales',
    path: '/sales',
    homeRoute: '/sales/dashboard',
    color: '#1D4ED8',
    lightBg: '#EFF6FF',
    borderColor: '#BFDBFE',
    badgeText: 'Sales Dept',
    navItems: [
      { id: 'home', label: 'Home', icon: 'Dashboard', path: '/sales/dashboard' },
      { id: 'enquiries', label: 'Enquiries', icon: 'ContactMail', path: '/sales/enquiry-list' },
      { id: 'followups', label: 'Follow-ups', icon: 'Schedule', path: '/sales/followups' },
      { id: 'orders', label: 'Orders', icon: 'ReceiptLong', path: '/sales/quotation-list' },
      { id: 'more', label: 'More', icon: 'MoreHoriz', path: '/sales/more' }
    ]
  },
  production: {
    key: 'production',
    name: 'Production Management',
    shortName: 'Production',
    path: '/production',
    homeRoute: '/production/dashboard',
    color: '#0D9488',
    lightBg: '#F0FDFA',
    borderColor: '#99F6E4',
    badgeText: 'Shopfloor',
    navItems: [
      { id: 'home', label: 'Home', icon: 'Dashboard', path: '/production/dashboard' },
      { id: 'orders', label: 'Orders', icon: 'PrecisionManufacturing', path: '/production/orders-hub' },
      { id: 'materials', label: 'Materials', icon: 'Layers', path: '/production/materials-hub' },
      { id: 'production', label: 'Production', icon: 'Engineering', path: '/production/production-hub' },
      { id: 'more', label: 'More', icon: 'MoreHoriz', path: '/production/more' }
    ]
  },
  'supply-chain': {
    key: 'supply-chain',
    name: 'Supply Chain Management',
    shortName: 'Supply Chain',
    path: '/supply-chain',
    homeRoute: '/supply-chain/dashboard',
    color: '#D97706',
    lightBg: '#FFFBEB',
    borderColor: '#FDE68A',
    badgeText: 'Inventory & Procurement',
    navItems: [
      { id: 'home', label: 'Home', icon: 'Dashboard', path: '/supply-chain/dashboard' },
      { id: 'requests', label: 'Requests', icon: 'Inventory', path: '/supply-chain/requests-hub' },
      { id: 'inventory', label: 'Inventory', icon: 'Warehouse', path: '/supply-chain/inventory-hub' },
      { id: 'purchase', label: 'Purchase', icon: 'ShoppingCart', path: '/supply-chain/purchase-hub' },
      { id: 'more', label: 'More', icon: 'MoreHoriz', path: '/supply-chain/more' }
    ]
  },
  logistics: {
    key: 'logistics',
    name: 'Logistics & Delivery',
    shortName: 'Logistics',
    path: '/logistics',
    homeRoute: '/logistics/dashboard',
    color: '#7C3AED',
    lightBg: '#F5F3FF',
    borderColor: '#DDD6FE',
    badgeText: 'Fleet & Dispatch',
    navItems: [
      { id: 'home', label: 'Home', icon: 'Dashboard', path: '/logistics/dashboard' },
      { id: 'orders', label: 'Orders', icon: 'LocalShipping', path: '/logistics/orders-hub' },
      { id: 'dispatch', label: 'Dispatch', icon: 'DepartureBoard', path: '/logistics/dispatch-hub' },
      { id: 'tracking', label: 'Tracking', icon: 'GpsFixed', path: '/logistics/tracking-hub' },
      { id: 'more', label: 'More', icon: 'MoreHoriz', path: '/logistics/more' }
    ]
  },
  employees: {
    key: 'employees',
    name: 'Employee & Permissions',
    shortName: 'Employees',
    path: '/employees',
    homeRoute: '/employees/dashboard',
    color: '#0284C7',
    lightBg: '#F0F9FF',
    borderColor: '#BAE6FD',
    badgeText: 'Access & HR Admin',
    navItems: [
      { id: 'home', label: 'Home', icon: 'Dashboard', path: '/employees/dashboard' },
      { id: 'employees', label: 'Employees', icon: 'People', path: '/employees/employees-list' },
      { id: 'departments', label: 'Departments', icon: 'CorporateFare', path: '/employees/departments-list' },
      { id: 'access', label: 'Access', icon: 'Security', path: '/employees/permissions-hub' },
      { id: 'more', label: 'More', icon: 'MoreHoriz', path: '/employees/more' }
    ]
  }
};

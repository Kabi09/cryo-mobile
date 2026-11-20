// Mock development personas per specification section 23 & stitch handoff

export const PERSONAS = {
  admin: {
    key: 'admin',
    id: 'EMP-ADM-001',
    name: 'Priya Nair',
    email: 'admin@cryoerp.com',
    role: 'Centralized Administrator',
    label: 'Full Admin Access (All Depts)',
    isAdmin: true,
    depts: ['sales', 'production', 'supply-chain', 'logistics', 'employees'],
    perms: {
      sales: { view: true, create: true, edit: true, workflow: true },
      production: { view: true, create: true, edit: true, workflow: true },
      'supply-chain': { view: true, create: true, edit: true, workflow: true },
      logistics: { view: true, create: true, edit: true, workflow: true },
      employees: { view: true, create: true, edit: true, workflow: true }
    }
  },
  multi: {
    key: 'multi',
    id: 'EMP-001',
    name: 'Arun Kumar',
    email: 'arun@example.com',
    role: 'Senior Sales Executive',
    label: 'Arun (Sales Full + Prod View)',
    isAdmin: false,
    depts: ['sales', 'production'],
    perms: {
      sales: { view: true, create: true, edit: true, workflow: true },
      production: { view: true, create: false, edit: false, workflow: false }
    }
  },
  single: {
    key: 'single',
    id: 'EMP-SC-308',
    name: 'Murugan S',
    email: 'murugan@cryoerp.com',
    role: 'Warehouse & Stores Manager',
    label: 'Single Dept (Supply Chain)',
    isAdmin: false,
    depts: ['supply-chain'],
    perms: {
      'supply-chain': { view: true, create: true, edit: true, workflow: true }
    }
  },
  viewonly: {
    key: 'viewonly',
    id: 'EMP-VW-009',
    name: 'Ramesh Viewer',
    email: 'viewer@cryoerp.com',
    role: 'Auditor & Observer',
    label: 'View-Only Employee',
    isAdmin: false,
    depts: ['sales', 'production'],
    perms: {
      sales: { view: true, create: false, edit: false, workflow: false },
      production: { view: true, create: false, edit: false, workflow: false }
    }
  },
  nowf: {
    key: 'nowf',
    id: 'EMP-DR-012',
    name: 'Kavya Drafts',
    email: 'kavya@cryoerp.com',
    role: 'Data Entry Assistant',
    label: 'Create/Edit Only (No Workflow)',
    isAdmin: false,
    depts: ['sales'],
    perms: {
      sales: { view: true, create: true, edit: true, workflow: false }
    }
  }
};

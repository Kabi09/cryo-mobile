import { create } from 'zustand';

const initialDB = {
  // Master Records
  customers: [
    { id: 'CUST-001', name: 'ABC Laboratory', contact: 'Dr. Ramesh Babu', phone: '+91 98402 55110', email: 'ramesh@abclabs.in', city: 'Chennai', gst: '33AABCA1234F1Z5', address: 'Plot 45, Guindy Industrial Estate, Chennai - 600032' },
    { id: 'CUST-002', name: 'Apex Pharma Labs', contact: 'Rajesh Kulkarni', phone: '+91 98201 44512', email: 'rk@apexpharma.com', city: 'Mumbai', gst: '27AAPCL9988D1Z2', address: 'Phase II, MIDC Turbhe, Navi Mumbai - 400705' }
  ],
  products: [
    { id: 'PRD-001', code: 'CRYO-DF80', name: 'Deep Freezer (-80°C)', model: 'DF80-340L', price: 75000, category: 'Ultra Low Freezers', description: 'Dual cascade cooling, -86°C capability with micro-controller PID.' },
    { id: 'PRD-002', code: 'CRYO-INC200', name: 'Laboratory Incubator', model: 'INC-200D', price: 95000, category: 'Incubators', description: 'Microbiological BOD incubator with digital display.' },
    { id: 'PRD-003', code: 'CRYO-WB18', name: 'Digital Water Bath', model: 'WB-18SS', price: 28500, category: 'Water Baths', description: 'Double walled stainless steel water bath with stirrer.' }
  ],
  materials: [
    { id: 'MAT-01', code: 'RM-101', name: 'Compressor', unit: 'Pieces', stock: 2, minStock: 2, spec: 'Embraco 1.5 HP Low Temp' },
    { id: 'MAT-02', code: 'RM-102', name: 'Steel Sheet', unit: 'Sheets', stock: 5, minStock: 6, spec: 'SS 304 1.2mm Mirror Finish' },
    { id: 'MAT-03', code: 'RM-103', name: 'Temperature Controller', unit: 'Pieces', stock: 0, minStock: 4, spec: 'Dixell Microprocessor PID Controller' }
  ],
  suppliers: [
    { id: 'SUP-01', name: 'ABC Industrial Supplies', contact: 'Suresh Raina', phone: '+91 98405 11223', email: 'suresh@abcsupplies.com', city: 'Chennai' },
    { id: 'SUP-02', name: 'Precision Cryo Components', contact: 'Vikas Gupta', phone: '+91 98110 33445', email: 'vikas@precisecryo.in', city: 'Pune' }
  ],
  vehicles: [
    { id: 'VEH-01', regNo: 'TN 01 AB 1234', type: 'Mini Truck', capacity: '1.5 Ton', driver: 'Selvam', phone: '+91 94441 23456', status: 'Available' },
    { id: 'VEH-02', regNo: 'TN 02 CD 5678', type: 'Heavy Cargo', capacity: '3.5 Ton', driver: 'Murthy', phone: '+91 94442 34567', status: 'In Transit' }
  ],
  couriers: [
    { id: 'PROV-01', name: 'Sample Road Transport', type: 'Road Transport', phone: '+91 98409 22110', contact: 'Ramesh Transport', trackingUrl: 'https://sampletransport.in/track' },
    { id: 'PROV-02', name: 'BlueDart Express', type: 'Courier Express', phone: '+91 1860 233 1234', contact: 'BlueDart Desk', trackingUrl: 'https://bluedart.com/track' }
  ],

  // Golden Order SO-001 connected state across all departments
  order: {
    enqId: 'ENQ-001',
    enqStatus: 'Qualified',
    qtId: 'QT-001',
    qtVersion: 2,
    qtStatus: 'Accepted',
    qtNegotiated: true,
    piId: 'PI-001',
    cpoId: 'CPO-001',
    cpoNumber: 'PO-ABC-2026-99',
    soId: 'SO-001',
    customerId: 'CUST-001',
    customer: 'ABC Laboratory',
    productId: 'PRD-001',
    product: 'Deep Freezer (-80°C)',
    qty: 2,
    unitPrice: 75000,
    orderValue: 150000,
    receivedAmount: 100000,
    balanceAmount: 50000,
    paymentArrangement: 'Collect balance on delivery',
    paymentStatus: 'Advance Received (₹1,00,000 / ₹1,50,000)',
    proId: 'PRO-001',
    proStatus: 'Materials Ready',
    bomId: 'BOM-001',
    bomConfirmed: true,
    mrId: 'MR-001',
    mrStatus: 'Fully Issued',
    mi1Issued: true,
    mi2Issued: true,
    poId: 'PO-001',
    poStatus: 'GRN Confirmed',
    grnId: 'GRN-001',
    grnConfirmed: true,
    prodProgress: 100,
    qcStatus: 'Passed',
    qcNotes: 'Zero defects. Temperature stabilization test passed (-86.2°C achieved).',
    delId: 'DEL-001',
    pkgId: 'PKG-001',
    dcId: 'DC-001',
    delMethod: 'Own Vehicle',
    delStatus: 'In Transit',
    podRecorded: false,
    podSignature: null,
    finalPaymentCollected: false,
    completedStageNum: 21 // 1 through 22
  },

  // Linked Operational Lists
  enquiries: [
    { id: 'ENQ-001', date: '2026-11-15', customer: 'ABC Laboratory', customerId: 'CUST-001', product: 'Deep Freezer (-80°C)', qty: 2, status: 'Qualified', budget: 160000, source: 'Direct Website' },
    { id: 'ENQ-002', date: '2026-11-18', customer: 'Apex Pharma Labs', customerId: 'CUST-002', product: 'Laboratory Incubator', qty: 1, status: 'Follow-up Needed', budget: 100000, source: 'Exhibition' }
  ],
  quotations: [
    { id: 'QT-001', date: '2026-11-16', customer: 'ABC Laboratory', version: 2, amount: 150000, status: 'Accepted', validUntil: '2026-12-15' },
    { id: 'QT-002', date: '2026-11-19', customer: 'Apex Pharma Labs', version: 1, amount: 95000, status: 'Sent', validUntil: '2026-12-20' }
  ],
  salesOrders: [
    { id: 'SO-001', date: '2026-11-17', customer: 'ABC Laboratory', product: 'Deep Freezer (-80°C)', qty: 2, amount: 150000, advance: 100000, status: 'Ready for Dispatch' }
  ],
  productionOrders: [
    { id: 'PRO-001', date: '2026-11-17', soRef: 'SO-001', product: 'Deep Freezer (-80°C)', qty: 2, bomRef: 'BOM-001', status: 'Completed (Ready for Delivery)', progress: 100 }
  ],
  materialRequests: [
    { id: 'MR-001', proRef: 'PRO-001', date: '2026-11-17', status: 'Fully Issued', items: [
      { code: 'RM-101', name: 'Compressor', req: 2, issued: 2 },
      { code: 'RM-102', name: 'Steel Sheet', req: 8, issued: 8 },
      { code: 'RM-103', name: 'Temperature Controller', req: 2, issued: 2 }
    ]}
  ],
  purchaseOrders: [
    { id: 'PO-001', date: '2026-11-18', supplier: 'ABC Industrial Supplies', mrRef: 'MR-001', amount: 32000, status: 'Delivered (GRN Confirmed)', items: [
      { code: 'RM-102', name: 'Steel Sheet', qty: 3, unitPrice: 4000 },
      { code: 'RM-103', name: 'Temperature Controller', qty: 2, unitPrice: 10000 }
    ]}
  ],
  grns: [
    { id: 'GRN-001', date: '2026-11-19', poRef: 'PO-001', supplier: 'ABC Industrial Supplies', status: 'Accepted into Stock', items: [
      { code: 'RM-102', name: 'Steel Sheet', received: 3, accepted: 3 },
      { code: 'RM-103', name: 'Temperature Controller', received: 2, accepted: 2 }
    ]}
  ],
  materialIssues: [
    { id: 'MI-001', mrRef: 'MR-001', date: '2026-11-17', type: 'Partial Issue', items: [{ code: 'RM-101', qty: 2 }, { code: 'RM-102', qty: 5 }] },
    { id: 'MI-002', mrRef: 'MR-001', date: '2026-11-19', type: 'Remaining Issue', items: [{ code: 'RM-102', qty: 3 }, { code: 'RM-103', qty: 2 }] }
  ],
  deliveryPlans: [
    { id: 'DEL-001', proRef: 'PRO-001', customer: 'ABC Laboratory', destination: 'Chennai Guindy', method: 'Own Vehicle', vehicleRef: 'VEH-01', status: 'In Transit', challanRef: 'DC-001' }
  ],
  payments: [
    { id: 'PAY-001', date: '2026-11-17', ref: 'SO-001', customer: 'ABC Laboratory', type: 'Advance Payment', mode: 'Bank Transfer (NEFT)', amount: 100000, status: 'Verified' }
  ],
  approvals: [
    { id: 'APR-01', type: 'Quotation Discount (12%)', ref: 'QT-005', dept: 'Sales', by: 'Arun Kumar', status: 'Pending' },
    { id: 'APR-02', type: 'New Material Master Request', ref: 'NMA-01', dept: 'Supply Chain', by: 'Deepak Raj', status: 'Pending' }
  ],
  activityLogs: [
    { id: 'LOG-01', time: '10:15 AM', dept: 'Sales', user: 'Arun Kumar', text: 'QT-001 accepted after revision → SO-001 generated' },
    { id: 'LOG-02', time: '11:00 AM', dept: 'Production', user: 'Rajan S', text: 'PRO-001 created with BOM-001 → MR-001 issued to SCM' },
    { id: 'LOG-03', time: '11:45 AM', dept: 'Supply Chain', user: 'Murugan S', text: 'MI-001 partial issue & PO-001 placed for steel/controllers' },
    { id: 'LOG-04', time: '02:30 PM', dept: 'Supply Chain', user: 'Murugan S', text: 'GRN-001 confirmed → MI-002 complete issue fulfilled' },
    { id: 'LOG-05', time: '04:15 PM', dept: 'Production', user: 'Rajan S', text: 'Assembly & QC testing passed (Zero defects) → Handover to Logistics' },
    { id: 'LOG-06', time: '05:00 PM', dept: 'Logistics', user: 'Selvam', text: 'DEL-001 dispatch started via Own Vehicle TN 01 AB 1234' }
  ]
};

export const useErpStore = create((set, get) => ({
  ...initialDB,

  // Action to advance order workflow stage
  advanceOrderStage: (stageNum) => {
    set((state) => ({
      order: { ...state.order, completedStageNum: Math.max(state.order.completedStageNum, stageNum) }
    }));
  },

  // Create Customer
  createCustomer: (customer) => {
    const id = `CUST-${String(get().customers.length + 1).padStart(3, '0')}`;
    const newCustomer = { id, ...customer };
    set((state) => ({
      customers: [newCustomer, ...state.customers],
      activityLogs: [{ id: `LOG-${Date.now()}`, time: 'Just now', dept: 'Sales', user: 'Current User', text: `Created Customer ${newCustomer.name} (${id})` }, ...state.activityLogs]
    }));
    return newCustomer;
  },

  // Create Product
  createProduct: (product) => {
    const id = `PRD-${String(get().products.length + 1).padStart(3, '0')}`;
    const newProduct = { id, ...product };
    set((state) => ({
      products: [newProduct, ...state.products],
      activityLogs: [{ id: `LOG-${Date.now()}`, time: 'Just now', dept: 'Sales', user: 'Current User', text: `Added Product Master ${newProduct.name} (${id})` }, ...state.activityLogs]
    }));
    return newProduct;
  },

  // Create Enquiry
  createEnquiry: (enquiry) => {
    const id = `ENQ-${String(get().enquiries.length + 1).padStart(3, '0')}`;
    const newEnq = { id, date: new Date().toISOString().split('T')[0], status: 'New Enquiry', ...enquiry };
    set((state) => ({
      enquiries: [newEnq, ...state.enquiries],
      activityLogs: [{ id: `LOG-${Date.now()}`, time: 'Just now', dept: 'Sales', user: 'Current User', text: `Logged new enquiry ${id} for ${newEnq.customer}` }, ...state.activityLogs]
    }));
    return newEnq;
  },

  // Qualify Enquiry
  qualifyEnquiry: (id) => {
    set((state) => ({
      enquiries: state.enquiries.map((e) => (e.id === id ? { ...e, status: 'Qualified' } : e)),
      activityLogs: [{ id: `LOG-${Date.now()}`, time: 'Just now', dept: 'Sales', user: 'Current User', text: `Qualified enquiry ${id}` }, ...state.activityLogs]
    }));
  },

  // Create Quotation
  createQuotation: (quotation) => {
    const id = `QT-${String(get().quotations.length + 1).padStart(3, '0')}`;
    const newQt = { id, date: new Date().toISOString().split('T')[0], status: 'Sent', version: 1, ...quotation };
    set((state) => ({
      quotations: [newQt, ...state.quotations],
      activityLogs: [{ id: `LOG-${Date.now()}`, time: 'Just now', dept: 'Sales', user: 'Current User', text: `Generated Quotation ${id} (${newQt.customer})` }, ...state.activityLogs]
    }));
    return newQt;
  },

  // Confirm GRN -> Increases accepted inventory
  confirmGRN: (grnId) => {
    const state = get();
    const grn = state.grns.find((g) => g.id === grnId);
    if (!grn) return;

    // Increase material stocks
    const updatedMaterials = state.materials.map((m) => {
      const match = grn.items.find((item) => item.code === m.code);
      if (match) {
        return { ...m, stock: m.stock + match.accepted };
      }
      return m;
    });

    set((s) => ({
      materials: updatedMaterials,
      grns: s.grns.map((g) => (g.id === grnId ? { ...g, status: 'Accepted into Stock' } : g)),
      order: { ...s.order, grnConfirmed: true, completedStageNum: Math.max(s.order.completedStageNum, 17) },
      activityLogs: [{ id: `LOG-${Date.now()}`, time: 'Just now', dept: 'Supply Chain', user: 'Stores Manager', text: `GRN ${grnId} accepted. Inventory stocks updated.` }, ...s.activityLogs]
    }));
  },

  // Material Issue -> Decreases inventory
  issueMaterials: (mrId, isPartial = false) => {
    const state = get();
    const mr = state.materialRequests.find((m) => m.id === mrId);
    if (!mr) return;

    // Decrement stock
    const updatedMaterials = state.materials.map((m) => {
      const match = mr.items.find((it) => it.code === m.code);
      if (match) {
        const issueQty = isPartial ? Math.min(m.stock, match.req) : match.req - match.issued;
        return { ...m, stock: Math.max(0, m.stock - issueQty) };
      }
      return m;
    });

    const newIssueId = `MI-${String(state.materialIssues.length + 1).padStart(3, '0')}`;
    const newIssue = {
      id: newIssueId,
      mrRef: mrId,
      date: new Date().toISOString().split('T')[0],
      type: isPartial ? 'Partial Issue' : 'Remaining Issue',
      items: mr.items.map((it) => ({ code: it.code, qty: isPartial ? Math.min(it.req, 2) : it.req }))
    };

    set((s) => ({
      materials: updatedMaterials,
      materialIssues: [newIssue, ...s.materialIssues],
      order: {
        ...s.order,
        mi1Issued: true,
        mi2Issued: !isPartial,
        mrStatus: isPartial ? 'Partially Issued' : 'Fully Issued',
        completedStageNum: Math.max(s.order.completedStageNum, isPartial ? 15 : 18)
      },
      activityLogs: [{ id: `LOG-${Date.now()}`, time: 'Just now', dept: 'Supply Chain', user: 'Stores Manager', text: `${newIssue.type} ${newIssueId} executed for ${mrId}` }, ...s.activityLogs]
    }));
  },

  // Complete Production Handover
  handoverToLogistics: () => {
    set((state) => ({
      order: { ...state.order, proStatus: 'Completed (Ready for Delivery)', prodProgress: 100, qcStatus: 'Passed', completedStageNum: Math.max(state.order.completedStageNum, 20) },
      activityLogs: [{ id: `LOG-${Date.now()}`, time: 'Just now', dept: 'Production', user: 'Shopfloor Lead', text: `PRO-001 QC Approved and handed over to Logistics.` }, ...state.activityLogs]
    }));
  },

  // Record POD & Delivery Completion
  confirmDelivery: (signatureData) => {
    set((state) => ({
      order: {
        ...state.order,
        delStatus: 'Delivered',
        podRecorded: true,
        podSignature: signatureData || 'Customer Verified',
        completedStageNum: 22
      },
      activityLogs: [{ id: `LOG-${Date.now()}`, time: 'Just now', dept: 'Logistics', user: 'Delivery Driver', text: `DEL-001 delivered to ABC Laboratory. POD recorded.` }, ...state.activityLogs]
    }));
  },

  // Record Payment
  recordPayment: (payment) => {
    const id = `PAY-${String(get().payments.length + 1).padStart(3, '0')}`;
    const newPayment = { id, date: new Date().toISOString().split('T')[0], status: 'Verified', ...payment };
    set((state) => {
      const isGoldenOrder = payment.ref === 'SO-001';
      const updatedOrder = isGoldenOrder
        ? {
            ...state.order,
            receivedAmount: state.order.receivedAmount + Number(payment.amount),
            balanceAmount: Math.max(0, state.order.orderValue - (state.order.receivedAmount + Number(payment.amount))),
            finalPaymentCollected: state.order.receivedAmount + Number(payment.amount) >= state.order.orderValue
          }
        : state.order;

      return {
        payments: [newPayment, ...state.payments],
        order: updatedOrder,
        activityLogs: [{ id: `LOG-${Date.now()}`, time: 'Just now', dept: 'Sales', user: 'Accounts', text: `Payment of ₹${payment.amount} recorded (${newPayment.id})` }, ...state.activityLogs]
      };
    });
    return newPayment;
  },

  // Reset to default sample scenario
  resetDemoData: () => set(initialDB)
}));

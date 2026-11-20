import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { Customer } from '../models/Customer.js';
import { Product } from '../models/Product.js';
import { Material } from '../models/Material.js';
import { Supplier } from '../models/Supplier.js';
import { Vehicle } from '../models/Vehicle.js';
import { CourierProvider } from '../models/CourierProvider.js';
import { Department } from '../models/Department.js';
import { Role } from '../models/Role.js';
import { Employee } from '../models/Employee.js';
import { UserAccount } from '../models/UserAccount.js';
import { Counter } from '../utils/counter.js';
import { Enquiry } from '../models/Enquiry.js';
import { Quotation } from '../models/Quotation.js';
import { ProformaInvoice } from '../models/ProformaInvoice.js';
import { CustomerPurchaseOrder } from '../models/CustomerPurchaseOrder.js';
import { CustomerPayment } from '../models/CustomerPayment.js';
import { SalesOrder } from '../models/SalesOrder.js';
import { ProductionOrder } from '../models/ProductionOrder.js';
import { BOM } from '../models/BOM.js';
import { MaterialRequest } from '../models/MaterialRequest.js';
import { MaterialReceipt } from '../models/MaterialReceipt.js';
import { PurchaseOrder } from '../models/PurchaseOrder.js';
import { GoodsReceiptNote } from '../models/GoodsReceiptNote.js';
import { MaterialIssue } from '../models/MaterialIssue.js';
import { StockMovement } from '../models/StockMovement.js';
import { DailyProductionUpdate } from '../models/DailyProductionUpdate.js';
import { QualityInspection } from '../models/QualityInspection.js';
import { DeliveryOrder } from '../models/DeliveryOrder.js';
import { PackingRecord } from '../models/PackingRecord.js';
import { DeliveryChallan } from '../models/DeliveryChallan.js';
import { ProofOfDelivery } from '../models/ProofOfDelivery.js';
import { DeliveryExpense } from '../models/DeliveryExpense.js';
import { AuditLog } from '../models/AuditLog.js';

async function seed() {
  try {
    console.log(`[Seed] Connecting to MongoDB: ${env.mongodbUri}`);
    await mongoose.connect(env.mongodbUri);

    console.log('[Seed] Dropping existing database to clean indexes...');
    await mongoose.connection.dropDatabase();

    // 1. Initialize Counters
    console.log('[Seed] Setting up sequence counters...');
    await Counter.insertMany([
      { _id: 'CUST', seq: 2 },
      { _id: 'PRD', seq: 3 },
      { _id: 'MAT', seq: 3 },
      { _id: 'SUP', seq: 2 },
      { _id: 'VEH', seq: 2 },
      { _id: 'PROV', seq: 2 },
      { _id: 'EMP', seq: 5 },
      { _id: 'ENQ', seq: 2 },
      { _id: 'QT', seq: 2 },
      { _id: 'PI', seq: 1 },
      { _id: 'CPO', seq: 1 },
      { _id: 'PAY', seq: 2 },
      { _id: 'SO', seq: 1 },
      { _id: 'PRO', seq: 1 },
      { _id: 'BOM', seq: 1 },
      { _id: 'MR', seq: 1 },
      { _id: 'PO', seq: 1 },
      { _id: 'GRN', seq: 1 },
      { _id: 'MI', seq: 2 },
      { _id: 'RCPT', seq: 1 },
      { _id: 'QC', seq: 1 },
      { _id: 'DEL', seq: 1 },
      { _id: 'PKG', seq: 1 },
      { _id: 'DC', seq: 1 },
      { _id: 'POD', seq: 1 },
      { _id: 'EXP', seq: 2 }
    ]);

    // 2. Seed Master Data
    console.log('[Seed] Inserting Customers & Products...');
    const [cust1, _cust2] = await Customer.insertMany([
      {
        code: 'CUST-001',
        name: 'ABC Laboratory',
        contactPerson: 'Dr. Ramesh Babu',
        phone: '+91 98402 55110',
        email: 'ramesh@abclabs.in',
        city: 'Chennai',
        address: 'Plot 45, Guindy Industrial Estate, Chennai - 600032',
        gstin: '33AABCA1234F1Z5',
        creditLimit: 500000,
        status: 'Active'
      },
      {
        code: 'CUST-002',
        name: 'Apex Pharma Labs',
        contactPerson: 'Rajesh Kulkarni',
        phone: '+91 98201 44512',
        email: 'rk@apexpharma.com',
        city: 'Mumbai',
        address: 'Phase II, MIDC Turbhe, Navi Mumbai - 400705',
        gstin: '27AAPCL9988D1Z2',
        creditLimit: 750000,
        status: 'Active'
      }
    ]);

    const [prd1] = await Product.insertMany([
      {
        code: 'PRD-001',
        sku: 'CRYO-DF80',
        name: 'Deep Freezer (-80°C)',
        model: 'DF80-340L',
        category: 'Ultra Low Freezers',
        price: 75000,
        description: 'Dual cascade cooling, -86°C capability with micro-controller PID.'
      },
      {
        code: 'PRD-002',
        sku: 'CRYO-INC200',
        name: 'Laboratory Incubator',
        model: 'INC-200D',
        category: 'Incubators',
        price: 95000,
        description: 'Microbiological BOD incubator with digital display.'
      },
      {
        code: 'PRD-003',
        sku: 'CRYO-WB18',
        name: 'Digital Water Bath',
        model: 'WB-18SS',
        category: 'Water Baths',
        price: 28500,
        description: 'Double walled stainless steel water bath with stirrer.'
      }
    ]);

    console.log('[Seed] Inserting Materials & Suppliers...');
    await Material.insertMany([
      {
        code: 'RM-101',
        name: 'Compressor',
        unit: 'Pieces',
        currentStock: 2,
        minStock: 2,
        unitPrice: 12000,
        spec: 'Embraco 1.5 HP Low Temp'
      },
      {
        code: 'RM-102',
        name: 'Steel Sheet',
        unit: 'Sheets',
        currentStock: 5,
        minStock: 6,
        unitPrice: 4000,
        spec: 'SS 304 1.2mm Mirror Finish'
      },
      {
        code: 'RM-103',
        name: 'Temperature Controller',
        unit: 'Pieces',
        currentStock: 0,
        minStock: 4,
        unitPrice: 10000,
        spec: 'Dixell Microprocessor PID Controller'
      }
    ]);

    await Supplier.insertMany([
      {
        code: 'SUP-01',
        name: 'ABC Industrial Supplies',
        contactPerson: 'Suresh Raina',
        phone: '+91 98405 11223',
        email: 'suresh@abcsupplies.com',
        city: 'Chennai',
        address: '14 Sidco Estate, Ambattur, Chennai - 600058',
        gstin: '33AAACB4321A1Z9',
        materialsSupplied: ['RM-102', 'RM-103']
      },
      {
        code: 'SUP-02',
        name: 'Precision Cryo Components',
        contactPerson: 'Vikas Gupta',
        phone: '+91 98110 33445',
        email: 'vikas@precisecryo.in',
        city: 'Pune',
        address: 'GIDC Industrial Zone, Bhosari, Pune - 411026',
        gstin: '27AABCP5678B1Z4',
        materialsSupplied: ['RM-101']
      }
    ]);

    console.log('[Seed] Inserting Fleet Vehicles & Couriers...');
    await Vehicle.insertMany([
      {
        code: 'VEH-01',
        regNumber: 'TN 01 AB 1234',
        vehicleType: 'Mini Truck',
        capacity: '1.5 Ton',
        driverName: 'Selvam',
        driverPhone: '+91 94441 23456',
        status: 'Available'
      },
      {
        code: 'VEH-02',
        regNumber: 'TN 02 CD 5678',
        vehicleType: 'Heavy Cargo',
        capacity: '3.5 Ton',
        driverName: 'Murthy',
        driverPhone: '+91 94442 34567',
        status: 'In Transit'
      }
    ]);

    await CourierProvider.insertMany([
      {
        code: 'PROV-01',
        name: 'Sample Road Transport',
        serviceType: 'Road Transport',
        phone: '+91 98409 22110',
        contactPerson: 'Ramesh Transport',
        trackingUrlTemplate: 'https://sampletransport.in/track?lr={TRACKING_NO}'
      },
      {
        code: 'PROV-02',
        name: 'BlueDart Express',
        serviceType: 'Courier Express',
        phone: '+91 1860 233 1234',
        contactPerson: 'BlueDart Desk',
        trackingUrlTemplate: 'https://bluedart.com/track?awb={TRACKING_NO}'
      }
    ]);

    // 3. Departments, Roles, Employees & User Accounts (5 Personas)
    console.log('[Seed] Setting up Departments, Roles & 5 Personas...');
    await Department.insertMany([
      { code: 'sales', name: 'Sales & Marketing', activeEmployeeCount: 1 },
      { code: 'production', name: 'Manufacturing & Assembly', activeEmployeeCount: 1 },
      { code: 'supply-chain', name: 'Procurement & Warehouse', activeEmployeeCount: 1 },
      { code: 'logistics', name: 'Dispatch & Fleet Logistics', activeEmployeeCount: 1 },
      { code: 'admin', name: 'Centralized Administration', activeEmployeeCount: 1 },
      { code: 'employees', name: 'Employee Access & Organization', activeEmployeeCount: 1 }
    ]);

    await Role.insertMany([
      { code: 'ADMIN', name: 'Executive Administrator', department: 'admin', permissions: { view: true, create: true, edit: true, workflow: true } },
      { code: 'SALES_EXEC', name: 'Senior Sales Executive', department: 'sales', permissions: { view: true, create: true, edit: true, workflow: true } },
      { code: 'STORES_MGR', name: 'Stores & Warehouse Manager', department: 'supply-chain', permissions: { view: true, create: true, edit: true, workflow: true } },
      { code: 'AUDITOR', name: 'Auditor & Observer', department: 'admin', permissions: { view: true, create: false, edit: false, workflow: false } },
      { code: 'DRAFT_USER', name: 'Data Entry Assistant', department: 'sales', permissions: { view: true, create: true, edit: true, workflow: false } }
    ]);

    const defaultPasswordHash = await UserAccount.hashPassword('CryoPass@2026');

    // Employees
    const [empAdmin, empArun, empMurugan, empViewer, empKavya] = await Employee.insertMany([
      {
        code: 'EMP-ADM-001',
        name: 'Priya Nair',
        email: 'admin@cryoerp.com',
        phone: '+91 98400 11000',
        designation: 'Centralized Administrator',
        department: 'admin'
      },
      {
        code: 'EMP-001',
        name: 'Arun Kumar',
        email: 'arun@example.com',
        phone: '+91 98401 22334',
        designation: 'Senior Sales Executive',
        department: 'sales'
      },
      {
        code: 'EMP-SC-308',
        name: 'Murugan S',
        email: 'murugan@cryoerp.com',
        phone: '+91 98403 44556',
        designation: 'Warehouse & Stores Manager',
        department: 'supply-chain'
      },
      {
        code: 'EMP-VW-009',
        name: 'Ramesh Viewer',
        email: 'viewer@cryoerp.com',
        phone: '+91 98404 55667',
        designation: 'Auditor & Observer',
        department: 'sales'
      },
      {
        code: 'EMP-DR-010',
        name: 'Kavya Drafts',
        email: 'kavya@cryoerp.com',
        phone: '+91 98405 66778',
        designation: 'Data Entry Assistant',
        department: 'sales'
      }
    ]);

    // Accounts
    await UserAccount.insertMany([
      {
        username: 'admin',
        email: 'admin@cryoerp.com',
        passwordHash: defaultPasswordHash,
        employeeId: empAdmin._id,
        role: 'Centralized Administrator',
        isAdmin: true,
        departments: ['sales', 'production', 'supply-chain', 'logistics', 'employees', 'admin'],
        permissions: {
          sales: { view: true, create: true, edit: true, workflow: true },
          production: { view: true, create: true, edit: true, workflow: true },
          'supply-chain': { view: true, create: true, edit: true, workflow: true },
          logistics: { view: true, create: true, edit: true, workflow: true },
          employees: { view: true, create: true, edit: true, workflow: true }
        }
      },
      {
        username: 'arun',
        email: 'arun@example.com',
        passwordHash: defaultPasswordHash,
        employeeId: empArun._id,
        role: 'Senior Sales Executive',
        isAdmin: false,
        departments: ['sales', 'production'],
        permissions: {
          sales: { view: true, create: true, edit: true, workflow: true },
          production: { view: true, create: false, edit: false, workflow: false }
        }
      },
      {
        username: 'murugan',
        email: 'murugan@cryoerp.com',
        passwordHash: defaultPasswordHash,
        employeeId: empMurugan._id,
        role: 'Warehouse & Stores Manager',
        isAdmin: false,
        departments: ['supply-chain'],
        permissions: {
          'supply-chain': { view: true, create: true, edit: true, workflow: true }
        }
      },
      {
        username: 'viewer',
        email: 'viewer@cryoerp.com',
        passwordHash: defaultPasswordHash,
        employeeId: empViewer._id,
        role: 'Auditor & Observer',
        isAdmin: false,
        departments: ['sales', 'production'],
        permissions: {
          sales: { view: true, create: false, edit: false, workflow: false },
          production: { view: true, create: false, edit: false, workflow: false }
        }
      },
      {
        username: 'kavya',
        email: 'kavya@cryoerp.com',
        passwordHash: defaultPasswordHash,
        employeeId: empKavya._id,
        role: 'Data Entry Assistant',
        isAdmin: false,
        departments: ['sales'],
        permissions: {
          sales: { view: true, create: true, edit: true, workflow: false }
        }
      }
    ]);

    // 4. Seed Golden Order SO-001 Complete 22-Stage Workflow
    console.log('[Seed] Seeding Golden Order SO-001 (ABC Laboratory, Deep Freezer)...');

    // Stage 1 - 3: Enquiry
    await Enquiry.create({
      code: 'ENQ-001',
      customerId: cust1._id,
      customerName: 'ABC Laboratory',
      contactPerson: 'Dr. Ramesh Babu',
      phone: '+91 98402 55110',
      email: 'ramesh@abclabs.in',
      productId: prd1._id,
      productName: 'Deep Freezer (-80°C)',
      quantity: 2,
      budget: 160000,
      source: 'Direct Website',
      status: 'Qualified',
      technicalRequirements: 'Dual cascade refrigeration with precision -86°C capability',
      followUps: [{
        date: new Date('2026-11-15'),
        notes: 'Customer inquired about 340L capacity and 2 units discount.',
        executive: 'Arun Kumar'
      }],
      qualifiedAt: new Date('2026-11-15')
    });

    // Stage 4 - 8: Quotation v1 and v2 (Accepted)
    await Quotation.create({
      code: 'QT-001',
      version: 1,
      enquiryCode: 'ENQ-001',
      customerId: cust1._id,
      customerName: 'ABC Laboratory',
      productId: prd1._id,
      productName: 'Deep Freezer (-80°C)',
      quantity: 2,
      unitPrice: 80000,
      totalAmount: 160000,
      status: 'Superseded',
      sentDate: new Date('2026-11-16')
    });

    await Quotation.create({
      code: 'QT-001',
      version: 2,
      enquiryCode: 'ENQ-001',
      customerId: cust1._id,
      customerName: 'ABC Laboratory',
      productId: prd1._id,
      productName: 'Deep Freezer (-80°C)',
      quantity: 2,
      unitPrice: 75000,
      totalAmount: 150000,
      paymentTerms: '66.7% advance with order, balance against delivery',
      status: 'Accepted',
      negotiationNotes: 'Discount agreed for institutional volume purchase of 2 units.',
      sentDate: new Date('2026-11-16'),
      acceptedDate: new Date('2026-11-16')
    });

    // Stage 9: Proforma Invoice
    await ProformaInvoice.create({
      code: 'PI-001',
      quotationCode: 'QT-001',
      customerId: cust1._id,
      customerName: 'ABC Laboratory',
      totalAmount: 150000,
      advanceRequired: 100000,
      balanceDue: 50000,
      status: 'Advance Received'
    });

    // Stage 10: Customer Purchase Order
    await CustomerPurchaseOrder.create({
      code: 'CPO-001',
      cpoNumber: 'PO-ABC-2026-99',
      quotationCode: 'QT-001',
      customerId: cust1._id,
      customerName: 'ABC Laboratory',
      orderValue: 150000,
      status: 'Verified',
      verifiedBy: 'Priya Nair'
    });

    // Stage 11: Advance Payment Verified (₹1,00,000)
    await CustomerPayment.create({
      code: 'PAY-001',
      salesOrderCode: 'SO-001',
      customerId: cust1._id,
      customerName: 'ABC Laboratory',
      paymentType: 'Advance',
      amount: 100000,
      paymentMode: 'NEFT/RTGS',
      referenceNumber: 'NEFT-HDFC-991823',
      verifiedBy: 'Priya Nair',
      status: 'Verified',
      notes: 'Advance 66.7% payment received for order SO-001'
    });

    // Stage 12: Sales Order Confirmed
    await SalesOrder.create({
      code: 'SO-001',
      enquiryCode: 'ENQ-001',
      quotationCode: 'QT-001',
      cpoNumber: 'PO-ABC-2026-99',
      customerId: cust1._id,
      customerName: 'ABC Laboratory',
      productId: prd1._id,
      productName: 'Deep Freezer (-80°C)',
      quantity: 2,
      unitPrice: 75000,
      orderValue: 150000,
      receivedAmount: 100000,
      balanceAmount: 50000,
      paymentArrangement: 'Collect balance on delivery',
      paymentStatus: 'Advance Received (₹1,00,000 / ₹1,50,000)',
      status: 'In Transit',
      completedStageNum: 21,
      productionOrderCode: 'PRO-001',
      deliveryOrderCode: 'DEL-001',
      confirmedDate: new Date('2026-11-17')
    });

    // Stage 13: Production Order & BOM
    await ProductionOrder.create({
      code: 'PRO-001',
      salesOrderCode: 'SO-001',
      customerName: 'ABC Laboratory',
      productId: prd1._id,
      productCode: 'PRD-001',
      productName: 'Deep Freezer (-80°C)',
      quantity: 2,
      bomCode: 'BOM-001',
      materialRequestCode: 'MR-001',
      status: 'Completed (Ready for Delivery)',
      progress: 100,
      startDate: new Date('2026-11-17'),
      completedDate: new Date('2026-11-19')
    });

    await BOM.create({
      code: 'BOM-001',
      productionOrderCode: 'PRO-001',
      productCode: 'PRD-001',
      productName: 'Deep Freezer (-80°C)',
      items: [
        { materialCode: 'RM-101', materialName: 'Compressor', unit: 'Pieces', quantityPerUnit: 1, totalQuantity: 2 },
        { materialCode: 'RM-102', materialName: 'Steel Sheet', unit: 'Sheets', quantityPerUnit: 4, totalQuantity: 8 },
        { materialCode: 'RM-103', materialName: 'Temperature Controller', unit: 'Pieces', quantityPerUnit: 1, totalQuantity: 2 }
      ],
      confirmed: true,
      confirmedBy: 'Production Lead',
      confirmedAt: new Date('2026-11-17')
    });

    // Stage 14: Material Request
    await MaterialRequest.create({
      code: 'MR-001',
      productionOrderCode: 'PRO-001',
      requestedBy: 'Shopfloor Engineer',
      status: 'Fully Issued',
      items: [
        { materialCode: 'RM-101', materialName: 'Compressor', unit: 'Pieces', requiredQty: 2, issuedQty: 2 },
        { materialCode: 'RM-102', materialName: 'Steel Sheet', unit: 'Sheets', requiredQty: 8, issuedQty: 8 },
        { materialCode: 'RM-103', materialName: 'Temperature Controller', unit: 'Pieces', requiredQty: 2, issuedQty: 2 }
      ]
    });

    // Stage 15: Stock Check & Partial Issue MI-001
    await MaterialIssue.create({
      code: 'MI-001',
      materialRequestCode: 'MR-001',
      productionOrderCode: 'PRO-001',
      issueType: 'Partial Issue',
      issuedBy: 'Murugan S',
      items: [
        { materialCode: 'RM-101', materialName: 'Compressor', quantityIssued: 2 },
        { materialCode: 'RM-102', materialName: 'Steel Sheet', quantityIssued: 5 }
      ],
      notes: 'Initial issue of currently available stock'
    });

    // Stage 16: Purchase Order for Shortage
    await PurchaseOrder.create({
      code: 'PO-001',
      supplierCode: 'SUP-01',
      supplierName: 'ABC Industrial Supplies',
      materialRequestCode: 'MR-001',
      totalAmount: 32000,
      status: 'Delivered (GRN Confirmed)',
      items: [
        { materialCode: 'RM-102', materialName: 'Steel Sheet', quantity: 3, unitPrice: 4000, totalPrice: 12000 },
        { materialCode: 'RM-103', materialName: 'Temperature Controller', quantity: 2, unitPrice: 10000, totalPrice: 20000 }
      ]
    });

    // Stage 17: GRN-001 Confirmation
    await GoodsReceiptNote.create({
      code: 'GRN-001',
      purchaseOrderCode: 'PO-001',
      supplierCode: 'SUP-01',
      supplierName: 'ABC Industrial Supplies',
      invoiceNumber: 'INV-ABC-8812',
      receivedBy: 'Murugan S',
      status: 'Accepted into Stock',
      items: [
        { materialCode: 'RM-102', materialName: 'Steel Sheet', receivedQty: 3, acceptedQty: 3 },
        { materialCode: 'RM-103', materialName: 'Temperature Controller', receivedQty: 2, acceptedQty: 2 }
      ]
    });

    // Stage 18: Remaining Issue MI-002 & Physical Receipt
    await MaterialIssue.create({
      code: 'MI-002',
      materialRequestCode: 'MR-001',
      productionOrderCode: 'PRO-001',
      issueType: 'Remaining Issue',
      issuedBy: 'Murugan S',
      items: [
        { materialCode: 'RM-102', materialName: 'Steel Sheet', quantityIssued: 3 },
        { materialCode: 'RM-103', materialName: 'Temperature Controller', quantityIssued: 2 }
      ],
      notes: 'Issued post-GRN receipt to complete 100% BOM requirement'
    });

    await MaterialReceipt.create({
      code: 'RCPT-001',
      productionOrderCode: 'PRO-001',
      materialRequestCode: 'MR-001',
      receivedBy: 'Assembly Supervisor',
      status: 'All Materials Received',
      items: [
        { materialCode: 'RM-101', materialName: 'Compressor', quantityReceived: 2 },
        { materialCode: 'RM-102', materialName: 'Steel Sheet', quantityReceived: 8 },
        { materialCode: 'RM-103', materialName: 'Temperature Controller', quantityReceived: 2 }
      ]
    });

    // Stage 19: Daily Updates (Assembly Execution)
    await DailyProductionUpdate.insertMany([
      { productionOrderCode: 'PRO-001', stageName: 'Frame Welding & Structural Body', progressPercentage: 25, operatorName: 'Karthik R' },
      { productionOrderCode: 'PRO-001', stageName: 'Cascade Cooling Circuit Integration', progressPercentage: 50, operatorName: 'Mani V' },
      { productionOrderCode: 'PRO-001', stageName: 'Wiring, Sensors & Microcontroller PID', progressPercentage: 75, operatorName: 'Shankar T' },
      { productionOrderCode: 'PRO-001', stageName: 'Final Assembly & Thermal Stabilization', progressPercentage: 100, operatorName: 'Karthik R' }
    ]);

    // Stage 20: Quality Inspection Passed
    await QualityInspection.create({
      code: 'QC-001',
      productionOrderCode: 'PRO-001',
      productCode: 'PRD-001',
      inspectedQuantity: 2,
      result: 'Passed',
      inspectorName: 'Quality Lead Sundar',
      handoverReady: true,
      testedParameters: [
        { name: 'Insulation Resistance', expected: '> 100 Megaohms', actual: '240 Megaohms', pass: true },
        { name: 'Cooling Pull-Down Test', expected: '< -80°C within 180 min', actual: '-86.2°C achieved in 142 min', pass: true },
        { name: 'Compressor Noise Level', expected: '< 55 dBA', actual: '48 dBA', pass: true },
        { name: 'Temperature Stability', expected: '+/- 1.5°C over 24 hrs', actual: '+/- 0.6°C recorded', pass: true }
      ],
      notes: 'Zero defects. Temperature stabilization test passed (-86.2°C achieved).'
    });

    // Stage 21: Delivery Planning, Packaging, Challan & Dispatch
    await DeliveryOrder.create({
      code: 'DEL-001',
      salesOrderCode: 'SO-001',
      productionOrderCode: 'PRO-001',
      customerName: 'ABC Laboratory',
      destinationAddress: 'Plot 45, Guindy Industrial Estate, Chennai - 600032',
      destinationCity: 'Chennai',
      deliveryMethod: 'Own Vehicle',
      vehicleCode: 'VEH-01',
      vehicleRegNumber: 'TN 01 AB 1234',
      driverName: 'Selvam',
      driverPhone: '+91 94441 23456',
      status: 'In Transit',
      packingRecordCode: 'PKG-001',
      challanCode: 'DC-001',
      balancePaymentDue: 50000,
      balancePaymentCollected: false,
      dispatchedAt: new Date('2026-11-20T09:00:00Z')
    });

    await PackingRecord.create({
      code: 'PKG-001',
      deliveryOrderCode: 'DEL-001',
      checkedBy: 'Packaging Officer',
      status: 'Verified & Sealed',
      grossWeightKg: 280,
      packageCount: 2
    });

    await DeliveryChallan.create({
      code: 'DC-001',
      deliveryOrderCode: 'DEL-001',
      salesOrderCode: 'SO-001',
      customerName: 'ABC Laboratory',
      shipToAddress: 'Plot 45, Guindy Industrial Estate, Chennai - 600032',
      vehicleRegNumber: 'TN 01 AB 1234',
      driverName: 'Selvam',
      issuedBy: 'Priya Nair',
      items: [
        { productName: 'Deep Freezer (-80°C)', quantity: 2, model: 'DF80-340L' }
      ]
    });

    await DeliveryExpense.create({
      code: 'EXP-001',
      deliveryOrderCode: 'DEL-001',
      category: 'Fuel',
      amount: 2500,
      paidBy: 'Driver Cash Advance'
    });

    await DeliveryExpense.create({
      code: 'EXP-002',
      deliveryOrderCode: 'DEL-001',
      category: 'Toll Plaza',
      amount: 420,
      paidBy: 'Fastag Fleet Account'
    });

    console.log('[Seed] Database successfully seeded with Golden Order SO-001 and 5 personas!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
}

seed();

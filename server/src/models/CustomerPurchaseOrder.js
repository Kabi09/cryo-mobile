import mongoose from 'mongoose';

const customerPurchaseOrderSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // CPO-001
  cpoNumber: { type: String, required: true, trim: true }, // e.g. PO-ABC-2026-99
  quotationCode: { type: String, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null },
  customerName: { type: String, required: true },
  orderValue: { type: Number, required: true },
  receivedDate: { type: Date, default: Date.now },
  deliveryLeadTime: { type: String, default: '4-6 weeks' },
  status: { type: String, enum: ['Logged', 'Verified', 'Rejected'], default: 'Logged' },
  documentUrl: { type: String, default: '' },
  verifiedBy: { type: String, default: '' }
}, {
  timestamps: true
});

export const CustomerPurchaseOrder = mongoose.models.CustomerPurchaseOrder || mongoose.model('CustomerPurchaseOrder', customerPurchaseOrderSchema);

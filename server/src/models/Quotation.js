import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema({
  code: { type: String, required: true, uppercase: true, trim: true }, // QT-001
  version: { type: Number, required: true, default: 1 },
  enquiryCode: { type: String, default: '' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null },
  customerName: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  taxRate: { type: Number, default: 18 },
  totalAmount: { type: Number, required: true, min: 0 },
  paymentTerms: { type: String, default: '66.7% advance with order, balance against delivery' },
  validUntil: { type: Date },
  status: {
    type: String,
    enum: ['Draft', 'Sent', 'In Negotiation', 'Accepted', 'Superseded', 'Rejected', 'Expired'],
    default: 'Draft'
  },
  negotiationNotes: { type: String, default: '' },
  sentDate: { type: Date, default: null },
  acceptedDate: { type: Date, default: null }
}, {
  timestamps: true
});

quotationSchema.index({ code: 1, version: 1 }, { unique: true });

export const Quotation = mongoose.models.Quotation || mongoose.model('Quotation', quotationSchema);

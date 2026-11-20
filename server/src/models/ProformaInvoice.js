import mongoose from 'mongoose';

const proformaInvoiceSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // PI-001
  quotationCode: { type: String, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null },
  customerName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  advanceRequired: { type: Number, required: true },
  balanceDue: { type: Number, required: true },
  paymentTerms: { type: String, default: 'Advance required to confirm production scheduling' },
  issuedDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Issued', 'Advance Received', 'Cancelled'], default: 'Issued' }
}, {
  timestamps: true
});

export const ProformaInvoice = mongoose.models.ProformaInvoice || mongoose.model('ProformaInvoice', proformaInvoiceSchema);

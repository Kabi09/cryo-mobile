import mongoose from 'mongoose';

const customerPaymentSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // PAY-001
  salesOrderCode: { type: String, required: true }, // SO-001
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null },
  customerName: { type: String, required: true },
  paymentType: {
    type: String,
    enum: ['Advance', 'Milestone', 'Final Balance', 'Refund'],
    required: true
  },
  amount: { type: Number, required: true, min: 1 },
  paymentMode: {
    type: String,
    enum: ['NEFT/RTGS', 'Cheque', 'UPI', 'Net Banking', 'Cash'],
    default: 'NEFT/RTGS'
  },
  referenceNumber: { type: String, default: '' },
  paymentDate: { type: Date, default: Date.now },
  verifiedBy: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Pending Verification', 'Verified', 'Rejected'],
    default: 'Verified'
  },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

export const CustomerPayment = mongoose.models.CustomerPayment || mongoose.model('CustomerPayment', customerPaymentSchema);

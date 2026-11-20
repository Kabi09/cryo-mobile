import mongoose from 'mongoose';

const deliveryExpenseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // EXP-001
  deliveryOrderCode: { type: String, required: true },
  category: {
    type: String,
    enum: ['Fuel', 'Toll Plaza', 'Driver Allowance', 'Third-Party Freight', 'Unloading Labor', 'Maintenance'],
    required: true
  },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  receiptRef: { type: String, default: '' },
  paidBy: { type: String, default: 'Driver Cash Advance' },
  status: { type: String, enum: ['Submitted', 'Approved', 'Reimbursed'], default: 'Approved' }
}, {
  timestamps: true
});

export const DeliveryExpense = mongoose.models.DeliveryExpense || mongoose.model('DeliveryExpense', deliveryExpenseSchema);

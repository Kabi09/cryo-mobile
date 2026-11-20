import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // CUST-001
  name: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  city: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  gstin: { type: String, trim: true, default: '' },
  creditLimit: { type: Number, default: 500000 },
  status: { type: String, enum: ['Active', 'Suspended', 'Inactive'], default: 'Active' }
}, {
  timestamps: true
});

customerSchema.index({ name: 'text', city: 'text' });

export const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

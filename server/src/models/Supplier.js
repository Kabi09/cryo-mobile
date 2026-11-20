import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // SUP-01
  name: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  city: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  gstin: { type: String, trim: true, default: '' },
  materialsSupplied: [{ type: String }],
  rating: { type: Number, default: 4.5, min: 1, max: 5 },
  status: { type: String, enum: ['Active', 'Blacklisted', 'Inactive'], default: 'Active' }
}, {
  timestamps: true
});

export const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);

import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // RM-101 / MAT-01
  name: { type: String, required: true, trim: true }, // Compressor
  unit: { type: String, required: true, trim: true }, // Pieces, Sheets, Kg, Meters
  currentStock: { type: Number, required: true, default: 0, min: 0 },
  allocatedStock: { type: Number, default: 0, min: 0 },
  minStock: { type: Number, default: 0, min: 0 },
  unitPrice: { type: Number, default: 0, min: 0 },
  spec: { type: String, default: '' },
  category: { type: String, default: 'Raw Material' },
  status: { type: String, enum: ['Active', 'Discontinued'], default: 'Active' }
}, {
  timestamps: true
});

export const Material = mongoose.models.Material || mongoose.model('Material', materialSchema);

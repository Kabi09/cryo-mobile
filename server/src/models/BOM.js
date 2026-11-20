import mongoose from 'mongoose';

const bomItemSchema = new mongoose.Schema({
  materialCode: { type: String, required: true }, // RM-101
  materialName: { type: String, required: true },
  unit: { type: String, default: 'Pieces' },
  quantityPerUnit: { type: Number, required: true, min: 0.01 },
  totalQuantity: { type: Number, required: true, min: 0.01 }
}, { _id: false });

const bomSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // BOM-001
  productionOrderCode: { type: String, required: true },
  productCode: { type: String, required: true },
  productName: { type: String, required: true },
  items: [bomItemSchema],
  confirmed: { type: Boolean, default: false },
  confirmedBy: { type: String, default: '' },
  confirmedAt: { type: Date, default: null }
}, {
  timestamps: true
});

export const BOM = mongoose.models.BOM || mongoose.model('BOM', bomSchema);

import mongoose from 'mongoose';

const stockAdjustmentSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // ADJ-001
  materialCode: { type: String, required: true },
  materialName: { type: String, required: true },
  previousStock: { type: Number, required: true },
  adjustedStock: { type: Number, required: true },
  variance: { type: Number, required: true }, // adjusted - previous
  reason: { type: String, required: true },
  authorizedBy: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const StockAdjustment = mongoose.models.StockAdjustment || mongoose.model('StockAdjustment', stockAdjustmentSchema);

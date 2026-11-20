import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // PRD-001
  sku: { type: String, required: true, unique: true, uppercase: true, trim: true }, // CRYO-DF80
  name: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true }, // DF80-340L
  category: { type: String, required: true, trim: true }, // Ultra Low Freezers
  price: { type: Number, required: true, min: 0 }, // 75000
  description: { type: String, default: '' },
  specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
  status: { type: String, enum: ['Active', 'Draft', 'Discontinued'], default: 'Active' }
}, {
  timestamps: true
});

productSchema.index({ name: 'text', model: 'text', category: 'text' });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

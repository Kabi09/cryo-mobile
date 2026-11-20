import mongoose from 'mongoose';

const mrItemSchema = new mongoose.Schema({
  materialCode: { type: String, required: true }, // RM-101
  materialName: { type: String, required: true },
  unit: { type: String, default: 'Pieces' },
  requiredQty: { type: Number, required: true },
  issuedQty: { type: Number, default: 0 }
}, { _id: false });

const materialRequestSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // MR-001
  productionOrderCode: { type: String, required: true }, // PRO-001
  requestedBy: { type: String, default: 'Shopfloor Engineer' },
  items: [mrItemSchema],
  status: {
    type: String,
    enum: ['Submitted', 'Partially Issued', 'Fully Issued', 'Cancelled'],
    default: 'Submitted'
  },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

export const MaterialRequest = mongoose.models.MaterialRequest || mongoose.model('MaterialRequest', materialRequestSchema);

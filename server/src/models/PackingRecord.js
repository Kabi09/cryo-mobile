import mongoose from 'mongoose';

const packingRecordSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // PKG-001
  deliveryOrderCode: { type: String, required: true },
  packingType: { type: String, default: 'Wooden Crate + Polyethylene Wrap' },
  packageCount: { type: Number, default: 1, min: 1 },
  grossWeightKg: { type: Number, default: 120 },
  checklist: [{
    item: String,
    passed: { type: Boolean, default: true }
  }],
  status: { type: String, enum: ['Packing In Progress', 'Verified & Sealed'], default: 'Verified & Sealed' },
  checkedBy: { type: String, required: true },
  verifiedDate: { type: Date, default: Date.now },
  notes: { type: String, default: 'Shock indicators and moisture barrier checked' }
}, {
  timestamps: true
});

export const PackingRecord = mongoose.models.PackingRecord || mongoose.model('PackingRecord', packingRecordSchema);

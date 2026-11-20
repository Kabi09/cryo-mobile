import mongoose from 'mongoose';

const testParameterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expected: { type: String, required: true },
  actual: { type: String, required: true },
  pass: { type: Boolean, default: true }
}, { _id: false });

const qualityInspectionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // QC-001
  productionOrderCode: { type: String, required: true },
  productCode: { type: String, required: true },
  inspectedQuantity: { type: Number, required: true },
  testedParameters: [testParameterSchema],
  result: {
    type: String,
    enum: ['Passed', 'Rework Required', 'Failed'],
    required: true
  },
  inspectorName: { type: String, required: true },
  testedDate: { type: Date, default: Date.now },
  notes: { type: String, default: '' },
  handoverReady: { type: Boolean, default: false }
}, {
  timestamps: true
});

export const QualityInspection = mongoose.models.QualityInspection || mongoose.model('QualityInspection', qualityInspectionSchema);

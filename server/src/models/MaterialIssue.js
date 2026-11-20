import mongoose from 'mongoose';

const miItemSchema = new mongoose.Schema({
  materialCode: { type: String, required: true },
  materialName: { type: String, required: true },
  quantityIssued: { type: Number, required: true, min: 1 },
  unit: { type: String, default: 'Pieces' }
}, { _id: false });

const materialIssueSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // MI-001, MI-002
  materialRequestCode: { type: String, required: true }, // MR-001
  productionOrderCode: { type: String, default: '' },
  issueType: {
    type: String,
    enum: ['Partial Issue', 'Remaining Issue', 'Full Issue'],
    default: 'Partial Issue'
  },
  items: [miItemSchema],
  issuedBy: { type: String, required: true },
  issuedDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Issued', 'Cancelled'], default: 'Issued' },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

export const MaterialIssue = mongoose.models.MaterialIssue || mongoose.model('MaterialIssue', materialIssueSchema);

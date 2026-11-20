import mongoose from 'mongoose';

const materialReceiptSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // RCPT-001
  productionOrderCode: { type: String, required: true },
  materialRequestCode: { type: String, required: true },
  receivedBy: { type: String, required: true },
  status: { type: String, enum: ['All Materials Received', 'Partial Receipt'], default: 'All Materials Received' },
  items: [{
    materialCode: String,
    materialName: String,
    quantityReceived: Number,
    condition: { type: String, default: 'OK' }
  }],
  notes: { type: String, default: 'All materials physically verified and accepted into production assembly bay' }
}, {
  timestamps: true
});

export const MaterialReceipt = mongoose.models.MaterialReceipt || mongoose.model('MaterialReceipt', materialReceiptSchema);

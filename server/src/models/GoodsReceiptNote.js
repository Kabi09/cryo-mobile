import mongoose from 'mongoose';

const grnItemSchema = new mongoose.Schema({
  materialCode: { type: String, required: true },
  materialName: { type: String, required: true },
  receivedQty: { type: Number, required: true, min: 0 },
  acceptedQty: { type: Number, required: true, min: 0 },
  rejectedQty: { type: Number, default: 0, min: 0 },
  unit: { type: String, default: 'Pieces' }
}, { _id: false });

const goodsReceiptNoteSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // GRN-001
  purchaseOrderCode: { type: String, required: true }, // PO-001
  supplierCode: { type: String, required: true },
  supplierName: { type: String, required: true },
  invoiceNumber: { type: String, default: '' },
  receivedDate: { type: Date, default: Date.now },
  items: [grnItemSchema],
  status: {
    type: String,
    enum: ['Accepted into Stock', 'Under Inspection', 'Rejected'],
    default: 'Accepted into Stock'
  },
  receivedBy: { type: String, required: true },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

export const GoodsReceiptNote = mongoose.models.GoodsReceiptNote || mongoose.model('GoodsReceiptNote', goodsReceiptNoteSchema);

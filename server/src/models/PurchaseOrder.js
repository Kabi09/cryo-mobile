import mongoose from 'mongoose';

const poItemSchema = new mongoose.Schema({
  materialCode: { type: String, required: true },
  materialName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  totalPrice: { type: Number, required: true, min: 0 }
}, { _id: false });

const purchaseOrderSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // PO-001
  supplierCode: { type: String, required: true }, // SUP-01
  supplierName: { type: String, required: true },
  materialRequestCode: { type: String, default: '' }, // MR-001
  items: [poItemSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  issuedDate: { type: Date, default: Date.now },
  expectedDeliveryDate: { type: Date },
  status: {
    type: String,
    enum: ['Draft', 'Issued to Supplier', 'Delivered (GRN Confirmed)', 'Cancelled'],
    default: 'Issued to Supplier'
  },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

export const PurchaseOrder = mongoose.models.PurchaseOrder || mongoose.model('PurchaseOrder', purchaseOrderSchema);

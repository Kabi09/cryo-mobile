import mongoose from 'mongoose';

const salesOrderSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // SO-001
  enquiryCode: { type: String, default: '' },
  quotationCode: { type: String, default: '' },
  cpoNumber: { type: String, default: '' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null },
  customerName: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  orderValue: { type: Number, required: true, min: 0 },
  receivedAmount: { type: Number, default: 0, min: 0 },
  balanceAmount: { type: Number, default: 0, min: 0 },
  paymentArrangement: { type: String, default: 'Collect balance on delivery' },
  paymentStatus: { type: String, default: 'Advance Pending' },
  status: {
    type: String,
    enum: [
      'Draft',
      'Advance Pending',
      'Confirmed (Sent to Production)',
      'In Production',
      'Completed (Ready for Delivery)',
      'In Transit',
      'Delivered',
      'Fully Settled',
      'On Hold',
      'Cancelled'
    ],
    default: 'Draft'
  },
  completedStageNum: { type: Number, default: 12, min: 1, max: 22 },
  productionOrderCode: { type: String, default: null },
  deliveryOrderCode: { type: String, default: null },
  confirmedDate: { type: Date, default: null },
  completedDate: { type: Date, default: null }
}, {
  timestamps: true
});

salesOrderSchema.index({ customerName: 1 });
salesOrderSchema.index({ status: 1 });

export const SalesOrder = mongoose.models.SalesOrder || mongoose.model('SalesOrder', salesOrderSchema);

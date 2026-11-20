import mongoose from 'mongoose';

const productionOrderSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // PRO-001
  salesOrderCode: { type: String, required: true }, // SO-001
  customerName: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  productCode: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  bomCode: { type: String, default: null },
  materialRequestCode: { type: String, default: null },
  status: {
    type: String,
    enum: [
      'Draft',
      'BOM Confirmed',
      'Material Requested',
      'Materials Ready',
      'In Assembly',
      'Under QC',
      'QC Passed',
      'Completed (Ready for Delivery)',
      'Handed Over to Logistics',
      'On Hold',
      'Cancelled'
    ],
    default: 'BOM Confirmed'
  },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  targetCompletionDate: { type: Date },
  startDate: { type: Date, default: null },
  completedDate: { type: Date, default: null },
  assignedSupervisor: { type: String, default: 'Production Supervisor' }
}, {
  timestamps: true
});

export const ProductionOrder = mongoose.models.ProductionOrder || mongoose.model('ProductionOrder', productionOrderSchema);

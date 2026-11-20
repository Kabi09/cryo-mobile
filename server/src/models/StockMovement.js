import mongoose from 'mongoose';

const stockMovementSchema = new mongoose.Schema({
  materialCode: { type: String, required: true },
  materialName: { type: String, required: true },
  movementType: {
    type: String,
    enum: ['GRN_RECEIPT', 'MATERIAL_ISSUE', 'RETURN', 'ADJUSTMENT'],
    required: true
  },
  quantity: { type: Number, required: true }, // positive for increase, negative for decrease
  balanceAfter: { type: Number, required: true },
  referenceDoc: { type: String, required: true }, // GRN-001, MI-001, etc.
  performedBy: { type: String, default: 'Warehouse Supervisor' },
  notes: { type: String, default: '' }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

stockMovementSchema.index({ materialCode: 1, createdAt: -1 });

export const StockMovement = mongoose.models.StockMovement || mongoose.model('StockMovement', stockMovementSchema);

import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g. 'CREATE_ORDER', 'GRN_ACCEPT', 'DISPATCH'
  department: { type: String, required: true },
  resource: { type: String, required: true }, // e.g. 'SalesOrder', 'GoodsReceiptNote'
  resourceId: { type: String, required: true }, // e.g. 'SO-001', 'GRN-001'
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount', default: null },
  userName: { type: String, default: 'System' },
  details: { type: mongoose.Schema.Types.Mixed, default: {} },
  ipAddress: { type: String, default: null },
  userAgent: { type: String, default: null }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

auditLogSchema.index({ department: 1, createdAt: -1 });
auditLogSchema.index({ resource: 1, resourceId: 1 });

export const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);

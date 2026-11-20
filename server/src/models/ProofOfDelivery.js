import mongoose from 'mongoose';

const proofOfDeliverySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // POD-001
  deliveryOrderCode: { type: String, required: true },
  salesOrderCode: { type: String, required: true },
  receivedByCustomer: { type: String, required: true },
  customerPhone: { type: String, default: '' },
  receivedDate: { type: Date, default: Date.now },
  signedSignatureData: { type: String, default: 'Digitally Verified on Mobile Handheld' },
  conditionOnArrival: { type: String, default: 'Good Condition (No Transit Damage)' },
  balanceCollected: { type: Number, default: 0 },
  paymentMode: { type: String, default: 'Cheque' },
  paymentRefNumber: { type: String, default: '' },
  verifiedByDriver: { type: String, default: '' },
  notes: { type: String, default: 'Customer verified temperature sensors and intact seal' }
}, {
  timestamps: true
});

export const ProofOfDelivery = mongoose.models.ProofOfDelivery || mongoose.model('ProofOfDelivery', proofOfDeliverySchema);

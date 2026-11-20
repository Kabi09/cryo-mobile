import mongoose from 'mongoose';

const deliveryChallanSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // DC-001
  deliveryOrderCode: { type: String, required: true },
  salesOrderCode: { type: String, required: true },
  customerName: { type: String, required: true },
  shipToAddress: { type: String, required: true },
  vehicleRegNumber: { type: String, default: '' },
  driverName: { type: String, default: '' },
  driverPhone: { type: String, default: '' },
  items: [{
    productName: String,
    quantity: Number,
    model: String
  }],
  issuedBy: { type: String, required: true },
  issuedDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Issued', 'Cancelled'], default: 'Issued' }
}, {
  timestamps: true
});

export const DeliveryChallan = mongoose.models.DeliveryChallan || mongoose.model('DeliveryChallan', deliveryChallanSchema);

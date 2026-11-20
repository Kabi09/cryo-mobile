import mongoose from 'mongoose';

const deliveryOrderSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // DEL-001
  salesOrderCode: { type: String, required: true }, // SO-001
  productionOrderCode: { type: String, default: '' },
  customerName: { type: String, required: true },
  destinationAddress: { type: String, required: true },
  destinationCity: { type: String, required: true },
  deliveryMethod: {
    type: String,
    enum: ['Own Vehicle', 'Third-Party Courier', 'Customer Pickup'],
    default: 'Own Vehicle'
  },
  vehicleCode: { type: String, default: '' }, // VEH-01
  vehicleRegNumber: { type: String, default: '' }, // TN 01 AB 1234
  driverName: { type: String, default: '' },
  driverPhone: { type: String, default: '' },
  courierProviderCode: { type: String, default: '' },
  courierTrackingNumber: { type: String, default: '' },
  status: {
    type: String,
    enum: [
      'Ready for Planning',
      'Plan Created',
      'Packed',
      'Challan Generated',
      'Dispatched',
      'In Transit',
      'Out for Delivery',
      'Delivered',
      'Returned',
      'Cancelled'
    ],
    default: 'Plan Created'
  },
  packingRecordCode: { type: String, default: null },
  challanCode: { type: String, default: null },
  proofOfDeliveryCode: { type: String, default: null },
  balancePaymentDue: { type: Number, default: 0 },
  balancePaymentCollected: { type: Boolean, default: false },
  dispatchedAt: { type: Date, default: null },
  deliveredAt: { type: Date, default: null },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

export const DeliveryOrder = mongoose.models.DeliveryOrder || mongoose.model('DeliveryOrder', deliveryOrderSchema);

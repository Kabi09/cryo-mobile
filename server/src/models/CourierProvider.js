import mongoose from 'mongoose';

const courierProviderSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // PROV-01
  name: { type: String, required: true, trim: true },
  serviceType: { type: String, required: true, trim: true }, // Road Transport, Air Cargo, Courier Express
  phone: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true, trim: true },
  trackingUrlTemplate: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, {
  timestamps: true
});

export const CourierProvider = mongoose.models.CourierProvider || mongoose.model('CourierProvider', courierProviderSchema);

import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // VEH-01
  regNumber: { type: String, required: true, unique: true, uppercase: true, trim: true }, // TN 01 AB 1234
  vehicleType: { type: String, required: true, trim: true }, // Mini Truck, Heavy Cargo
  capacity: { type: String, required: true, trim: true }, // 1.5 Ton
  driverName: { type: String, required: true, trim: true },
  driverPhone: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Available', 'In Transit', 'Maintenance'], default: 'Available' }
}, {
  timestamps: true
});

export const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

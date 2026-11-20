import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // e.g. EMP-ADM-001
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  designation: { type: String, required: true, trim: true },
  department: { type: String, required: true }, // e.g. 'sales', 'production', 'supply-chain', 'logistics', 'admin'
  joinedDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Active', 'On Leave', 'Resigned', 'Terminated'], default: 'Active' },
  reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null }
}, {
  timestamps: true
});

export const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

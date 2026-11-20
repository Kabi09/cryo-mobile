import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, lowercase: true, trim: true }, // 'sales', 'production', etc.
  name: { type: String, required: true, trim: true },
  headOfDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
  description: { type: String, default: '' },
  activeEmployeeCount: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, {
  timestamps: true
});

export const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);

import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  department: { type: String, required: true },
  description: { type: String, default: '' },
  permissions: {
    view: { type: Boolean, default: true },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    workflow: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

export const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

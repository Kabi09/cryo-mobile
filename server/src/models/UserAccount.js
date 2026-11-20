import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userAccountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
  role: { type: String, required: true, default: 'User' },
  isAdmin: { type: Boolean, default: false },
  departments: [{
    type: String,
    enum: ['sales', 'production', 'supply-chain', 'logistics', 'employees', 'admin']
  }],
  permissions: {
    sales: { view: Boolean, create: Boolean, edit: Boolean, workflow: Boolean },
    production: { view: Boolean, create: Boolean, edit: Boolean, workflow: Boolean },
    'supply-chain': { view: Boolean, create: Boolean, edit: Boolean, workflow: Boolean },
    logistics: { view: Boolean, create: Boolean, edit: Boolean, workflow: Boolean },
    employees: { view: Boolean, create: Boolean, edit: Boolean, workflow: Boolean }
  },
  status: { type: String, enum: ['Active', 'Suspended', 'Inactive'], default: 'Active' },
  lastLoginAt: { type: Date },
  refreshTokenHash: { type: String, default: null }
}, {
  timestamps: true
});

userAccountSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

userAccountSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const UserAccount = mongoose.models.UserAccount || mongoose.model('UserAccount', userAccountSchema);

import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // ENQ-001
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null },
  customerName: { type: String, required: true, trim: true },
  contactPerson: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  productName: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  budget: { type: Number, default: 0 },
  source: { type: String, default: 'Direct Website' },
  technicalRequirements: { type: String, default: '' },
  status: {
    type: String,
    enum: ['New', 'In Discussion', 'Follow-up Needed', 'Qualified', 'Quotation Created', 'Lost', 'Closed'],
    default: 'New'
  },
  followUps: [{
    date: { type: Date, default: Date.now },
    notes: String,
    executive: String,
    nextFollowUpDate: Date
  }],
  qualifiedAt: { type: Date, default: null }
}, {
  timestamps: true
});

export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

import mongoose from 'mongoose';

const dailyProductionUpdateSchema = new mongoose.Schema({
  productionOrderCode: { type: String, required: true },
  date: { type: Date, default: Date.now },
  shift: { type: String, enum: ['General Shift', 'Morning Shift', 'Evening Shift', 'Night Shift'], default: 'General Shift' },
  stageName: { type: String, required: true }, // Frame Welding, Cooling Circuit, Wiring, Final Assembly
  progressPercentage: { type: Number, required: true, min: 0, max: 100 },
  operatorName: { type: String, required: true },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

export const DailyProductionUpdate = mongoose.models.DailyProductionUpdate || mongoose.model('DailyProductionUpdate', dailyProductionUpdateSchema);

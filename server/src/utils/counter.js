import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

export const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

/**
 * Concurrency-safe atomic sequence generator
 * @param {string} key Prefix or identifier key (e.g. 'SO', 'PRO', 'MR', 'PO', 'GRN', 'DEL', 'DC')
 * @param {number} pad Minimum length of digits (default 3)
 * @returns {Promise<string>} Formatted code, e.g. 'SO-001'
 */
export async function getNextSequence(key, pad = 3) {
  const result = await Counter.findByIdAndUpdate(
    key,
    { $inc: { seq: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  const formattedNumber = String(result.seq).padStart(pad, '0');
  return `${key}-${formattedNumber}`;
}

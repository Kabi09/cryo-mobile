import mongoose from 'mongoose';

/**
 * Builds a query object that searches by _id (if valid ObjectId) or code field
 * @param {string} idOrCode Target ID or Code string (e.g. 'SO-001' or '60d5ec...')
 * @param {string} codeField Name of the human-readable code field (default: 'code')
 * @returns {object} Mongoose filter query
 */
export function buildIdOrCodeQuery(idOrCode, codeField = 'code') {
  if (!idOrCode) return {};
  const isObjectId = mongoose.Types.ObjectId.isValid(idOrCode) &&
    new mongoose.Types.ObjectId(idOrCode).toString() === idOrCode;

  if (isObjectId) {
    return { $or: [{ _id: idOrCode }, { [codeField]: idOrCode }] };
  }
  return { [codeField]: idOrCode };
}

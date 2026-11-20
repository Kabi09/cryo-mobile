// Shared formatting utilities

export const fmtINR = (val) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
};

export const formatDate = (dateInput) => {
  if (!dateInput) return '-';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return String(dateInput);
  }
};

export const getStatusColor = (status) => {
  const s = String(status || '').toLowerCase();
  if (['completed', 'delivered', 'accepted', 'confirmed', 'passed', 'approved', 'active', 'paid'].includes(s)) {
    return { bg: '#DCFCE7', text: '#15803D', border: '#86EFAC' };
  }
  if (['in progress', 'pending', 'waiting', 'in transit', 'dispatched', 'partially issued', 'negotiation', 'scheduled'].includes(s)) {
    return { bg: '#FEF3C7', text: '#B45309', border: '#FCD34D' };
  }
  if (['rejected', 'failed', 'cancelled', 'hold', 'inactive', 'overdue', 'shortage'].includes(s)) {
    return { bg: '#FEE2E2', text: '#B91C1C', border: '#FCA5A5' };
  }
  return { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' };
};

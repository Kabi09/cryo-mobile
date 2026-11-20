import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Divider,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { fmtINR } from '../../../utils/formatters';
import styles from './QuotationManagement.module.scss';

export const QuotationManagement = () => {
  const navigate = useNavigate();
  const { quotations, customers, products, createQuotation, advanceOrderStage } = useErpStore();

  const [selectedQt, setSelectedQt] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [productId, setProductId] = useState(products[0]?.id || '');
  const [qty, setQty] = useState(2);
  const [discount, setDiscount] = useState(0);

  const selectedProd = products.find((p) => p.id === productId);
  const basePrice = (selectedProd?.price || 75000) * qty;
  const netAmount = Math.max(0, basePrice - discount);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const cust = customers.find((c) => c.id === customerId);
    const prod = products.find((p) => p.id === productId);

    const newQt = createQuotation({
      customer: cust?.name || 'Customer',
      product: prod?.name || 'Product',
      qty,
      amount: netAmount,
      validUntil: '2026-12-31'
    });

    setIsAddOpen(false);
    setSelectedQt(newQt);
  };

  const handleAcceptQuotation = (id) => {
    advanceOrderStage(8);
    if (selectedQt && selectedQt.id === id) {
      setSelectedQt({ ...selectedQt, status: 'Accepted' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Quotations Management"
              subtitle="Formal commercial proposals and revisions"
              showBack
              actions={
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => setIsAddOpen(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Create Quotation
                </Button>
              }
            />
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.list}>
            {quotations.map((qt) => (
              <Card key={qt.id} className={styles.card} onClick={() => setSelectedQt(qt)}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1D4ED8' }}>
                      {qt.id} (v{qt.version}) • {qt.date}
                    </Typography>
                    <StatusBadge status={qt.status} size="small" />
                  </Box>

                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {qt.customer}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Total Quotation Value: <strong style={{ color: '#0F172A' }}>{fmtINR(qt.amount)}</strong>
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Valid until: {qt.validUntil}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#1E3A8A', fontWeight: 600 }}>
                      Inspect / Preview →
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Create Quotation Dialog */}
        <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Generate Commercial Quotation</DialogTitle>
          <form onSubmit={handleCreateSubmit}>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                select
                label="Select Customer"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
              >
                {customers.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name} ({c.city})
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Product"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              >
                {products.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name} - Unit Price: {fmtINR(p.price)}
                  </MenuItem>
                ))}
              </TextField>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  type="number"
                  label="Quantity"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  inputProps={{ min: 1 }}
                  required
                />
                <TextField
                  type="number"
                  label="Special Discount (₹)"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
              </Box>

              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                <Typography variant="caption" color="text.secondary">Quotation Net Total</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1D4ED8' }}>
                  {fmtINR(netAmount)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Includes 18% GST and standard factory warranty.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">
                Issue Quotation
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Quotation Inspection & Actions Modal */}
        {selectedQt && (
          <Dialog open={Boolean(selectedQt)} onClose={() => setSelectedQt(null)} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {selectedQt.id} (Version {selectedQt.version})
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Target: {selectedQt.customer}
                </Typography>
              </Box>
              <StatusBadge status={selectedQt.status} />
            </DialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                <Typography variant="caption" color="text.secondary">Total Amount</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A' }}>
                  {fmtINR(selectedQt.amount)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Payment condition: Advance required to confirm production.
                </Typography>
              </Box>

              {selectedQt.status !== 'Accepted' && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  fullWidth
                  onClick={() => handleAcceptQuotation(selectedQt.id)}
                >
                  Accept Quotation (Customer Approved)
                </Button>
              )}

              <Button
                variant="outlined"
                startIcon={<PictureAsPdfIcon />}
                fullWidth
                onClick={() => setIsPreviewOpen(true)}
              >
                View PDF Preview Document
              </Button>

              {selectedQt.status === 'Accepted' && (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  fullWidth
                  onClick={() => {
                    setSelectedQt(null);
                    navigate('/sales/so-list');
                  }}
                >
                  Proceed to Sales Order
                </Button>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setSelectedQt(null)}>Close</Button>
            </DialogActions>
          </Dialog>
        )}

        {/* PDF Preview Modal */}
        <Dialog open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Quotation Document Preview</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ p: 3, bgcolor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, borderBottom: '2px solid #1E3A8A', pb: 1 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1E3A8A' }}>CRYO ENTERPRISE</Typography>
                  <Typography variant="caption" display="block">ISO 9001:2015 Certified Cryo Equipment</Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{selectedQt?.id || 'QT-001'}</Typography>
              </Box>

              <Typography variant="caption" color="text.secondary">PROPOSAL PREPARED FOR:</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{selectedQt?.customer || 'ABC Laboratory'}</Typography>
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 2 }}>
                Reference: Deep Freezer (-80°C) • 2 Units
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                <Typography variant="body2">Subtotal:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{fmtINR(selectedQt?.amount || 150000)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                <Typography variant="body2">Taxes (18% GST Included):</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>₹22,881</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 1, borderTop: '2px solid #0F172A' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total Payable:</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E3A8A' }}>
                  {fmtINR(selectedQt?.amount || 150000)}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsPreviewOpen(false)}>Done</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default QuotationManagement;

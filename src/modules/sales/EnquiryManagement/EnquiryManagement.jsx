import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { fmtINR } from '../../../utils/formatters';
import styles from './EnquiryManagement.module.scss';

export const EnquiryManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enquiries, customers, products, createEnquiry, qualifyEnquiry } = useErpStore();

  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(location.pathname.includes('create-enquiry'));

  // Form State
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [productId, setProductId] = useState(products[0]?.id || '');
  const [qty, setQty] = useState(1);
  const [budget, setBudget] = useState(100000);
  const [source, setSource] = useState('Direct Enquiry');

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesTab = tab === 'All' || e.status.toLowerCase().includes(tab.toLowerCase());
    const matchesSearch =
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.customer.toLowerCase().includes(search.toLowerCase()) ||
      e.product.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const cust = customers.find((c) => c.id === customerId);
    const prod = products.find((p) => p.id === productId);

    const newEnq = createEnquiry({
      customerId,
      customer: cust?.name || 'New Customer',
      productId,
      product: prod?.name || 'New Product',
      qty: Number(qty) || 1,
      budget: Number(budget) || 0,
      source
    });

    setIsAddOpen(false);
    setSelectedEnquiry(newEnq);
  };

  const handleQualify = (id) => {
    qualifyEnquiry(id);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: 'Qualified' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Enquiries Management"
              subtitle={`${enquiries.length} total customer leads`}
              showBack
              actions={
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => setIsAddOpen(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Create Enquiry
                </Button>
              }
            />
          </div>
        </div>

        {/* Search & Tabs */}
        <div className={styles.searchBarRow}>
          <TextField
            size="small"
            placeholder="Search enquiries by ID, customer or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              )
            }}
            fullWidth
          />

          <Tabs
            value={tab}
            onChange={(_, val) => setTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ minHeight: 36, mt: 1 }}
          >
            {['All', 'New Enquiry', 'Qualified', 'Follow-up'].map((t) => (
              <Tab key={t} label={t} value={t} sx={{ minHeight: 36, py: 0.5, textTransform: 'none', fontSize: '0.8125rem' }} />
            ))}
          </Tabs>
        </div>

        {/* Enquiries List */}
        <div className={styles.middlerow}>
          <div className={styles.enquiriesList}>
            {filteredEnquiries.map((enq) => (
              <Card
                key={enq.id}
                className={styles.enquiryCard}
                onClick={() => setSelectedEnquiry(enq)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1D4ED8' }}>
                      {enq.id} • {enq.date}
                    </Typography>
                    <StatusBadge status={enq.status} size="small" />
                  </Box>

                  <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
                    {enq.customer}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {enq.product} ({enq.qty} Units)
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Budget: <strong>{fmtINR(enq.budget)}</strong>
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#1E3A8A', fontWeight: 600 }}>
                      View Details →
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}

            {filteredEnquiries.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                <Typography variant="body2">No enquiries found matching your filters.</Typography>
              </Box>
            )}
          </div>
        </div>

        {/* Create Enquiry Dialog */}
        <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Log New Customer Enquiry</DialogTitle>
          <form onSubmit={handleCreateSubmit}>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                select
                label="Customer"
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
                label="Product of Interest"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              >
                {products.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name} ({fmtINR(p.price)})
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
                  label="Estimated Budget (₹)"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  required
                />
              </Box>

              <TextField
                select
                label="Lead Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <MenuItem value="Direct Enquiry">Direct Customer Enquiry</MenuItem>
                <MenuItem value="Website Portal">Website Portal Lead</MenuItem>
                <MenuItem value="Exhibition">Trade Exhibition</MenuItem>
                <MenuItem value="Referral">Referral / Repeat Client</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">
                Save Enquiry
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Enquiry Details Modal */}
        {selectedEnquiry && (
          <Dialog open={Boolean(selectedEnquiry)} onClose={() => setSelectedEnquiry(null)} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {selectedEnquiry.id} Details
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Logged on {selectedEnquiry.date}
                </Typography>
              </Box>
              <StatusBadge status={selectedEnquiry.status} />
            </DialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary">Customer Name</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{selectedEnquiry.customer}</Typography>
                <Typography variant="caption" color="text.secondary">Product Interest</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedEnquiry.product} ({selectedEnquiry.qty} Units)</Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                  Budget: <strong>{fmtINR(selectedEnquiry.budget)}</strong> • Source: {selectedEnquiry.source}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {selectedEnquiry.status !== 'Qualified' && (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleQualify(selectedEnquiry.id)}
                  >
                    Qualify This Enquiry
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => {
                    setSelectedEnquiry(null);
                    navigate('/sales/create-quotation');
                  }}
                >
                  Generate Quotation
                </Button>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setSelectedEnquiry(null)}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default EnquiryManagement;

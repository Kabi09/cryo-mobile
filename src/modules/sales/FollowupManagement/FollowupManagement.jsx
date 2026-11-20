import { useState } from 'react';
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
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import styles from './FollowupManagement.module.scss';

export const FollowupManagement = () => {
  const [followups, setFollowups] = useState([
    { id: 'FU-01', ref: 'ENQ-001', customer: 'ABC Laboratory', contact: 'Dr. Ramesh Babu', phone: '+91 98402 55110', date: '2026-11-20', time: '11:30 AM', type: 'Technical Discussion', remarks: 'Discussed -80°C cascade refrigeration specs. Customer requested v2 quotation with 2 free preventive maintenance visits.', status: 'Completed' },
    { id: 'FU-02', ref: 'ENQ-002', customer: 'Apex Pharma Labs', contact: 'Rajesh Kulkarni', phone: '+91 98201 44512', date: '2026-11-21', time: '03:00 PM', type: 'Commercial Review', remarks: 'Review payment terms: 50% advance, balance on dispatch.', status: 'Pending' }
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedFu, setSelectedFu] = useState(null);

  // Form State
  const [customer, setCustomer] = useState('ABC Laboratory');
  const [type, setType] = useState('Phone Call');
  const [date, setDate] = useState('2026-11-22');
  const [remarks, setRemarks] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    const newFu = {
      id: `FU-${String(followups.length + 1).padStart(2, '0')}`,
      ref: 'ENQ-001',
      customer,
      contact: 'Customer Representative',
      phone: '+91 98400 00000',
      date,
      time: '10:00 AM',
      type,
      remarks,
      status: 'Pending'
    };
    setFollowups([newFu, ...followups]);
    setIsAddOpen(false);
    setRemarks('');
  };

  const handleMarkDone = (id) => {
    setFollowups(followups.map((f) => (f.id === id ? { ...f, status: 'Completed' } : f)));
    if (selectedFu && selectedFu.id === id) {
      setSelectedFu({ ...selectedFu, status: 'Completed' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Sales Follow-ups"
              subtitle="Scheduled customer discussions and reminders"
              showBack
              actions={
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => setIsAddOpen(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Schedule Follow-up
                </Button>
              }
            />
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.list}>
            {followups.map((fu) => (
              <Card key={fu.id} className={styles.card} onClick={() => setSelectedFu(fu)}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1D4ED8' }}>
                      {fu.id} • {fu.date} at {fu.time}
                    </Typography>
                    <StatusBadge status={fu.status} size="small" />
                  </Box>

                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {fu.customer}
                  </Typography>

                  <Typography variant="caption" color="text.secondary" display="block">
                    Contact: {fu.contact} ({fu.phone})
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A', display: 'block', mt: 0.5 }}>
                    Mode: {fu.type}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, p: 1, bgcolor: '#F8FAFC', borderRadius: 1.5, border: '1px solid #E2E8F0' }}>
                    &quot;{fu.remarks}&quot;
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Schedule Dialog */}
        <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Schedule Sales Follow-up</DialogTitle>
          <form onSubmit={handleCreate}>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                select
                label="Customer Lead"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                required
              >
                <MenuItem value="ABC Laboratory">ABC Laboratory (ENQ-001)</MenuItem>
                <MenuItem value="Apex Pharma Labs">Apex Pharma Labs (ENQ-002)</MenuItem>
              </TextField>

              <TextField
                select
                label="Follow-up Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="Phone Call">Phone Call</MenuItem>
                <MenuItem value="Client Site Visit">Client Site Visit</MenuItem>
                <MenuItem value="Technical Demonstration">Technical Demonstration</MenuItem>
                <MenuItem value="Commercial Review">Commercial Negotiation</MenuItem>
              </TextField>

              <TextField
                type="date"
                label="Target Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />

              <TextField
                label="Agenda & Discussion Points"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                multiline
                rows={3}
                placeholder="Key items to discuss..."
                required
              />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">
                Schedule
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Details & Complete Modal */}
        {selectedFu && (
          <Dialog open={Boolean(selectedFu)} onClose={() => setSelectedFu(null)} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 700 }}>
              Follow-up {selectedFu.id}
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{selectedFu.customer}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{selectedFu.remarks}</Typography>

              {selectedFu.status !== 'Completed' && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  fullWidth
                  onClick={() => handleMarkDone(selectedFu.id)}
                >
                  Mark Follow-up as Completed
                </Button>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedFu(null)}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default FollowupManagement;

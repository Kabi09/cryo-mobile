import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { fmtINR } from '../../../utils/formatters';
import styles from './LogisticsTrackingPOD.module.scss';

export const LogisticsTrackingPOD = () => {
  const { order, confirmDelivery, recordPayment } = useErpStore();
  const [podOpen, setPodOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [signName, setSignName] = useState('Dr. Ramesh Babu (Authorized Lab Incharge)');
  const [payAmount, setPayAmount] = useState(order.balanceAmount || 50000);
  const [payMode, setPayMode] = useState('Company Cheque');
  const [successMsg, setSuccessMsg] = useState('');

  const handleConfirmPOD = () => {
    confirmDelivery(signName);
    setPodOpen(false);
    setSuccessMsg('Proof of Delivery (POD) signed and confirmed successfully!');
  };

  const handleCollectPayment = () => {
    recordPayment({
      ref: 'SO-001',
      customer: 'ABC Laboratory',
      type: 'Final Delivery Payment',
      mode: payMode,
      amount: Number(payAmount)
    });
    setPayOpen(false);
    setSuccessMsg(`Payment of ${fmtINR(payAmount)} recorded! Order is now 100% paid and settled.`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Live Tracking & Handover (POD)"
              subtitle="Real-time Milestone Updates, Customer Sign & Payment"
              showBack
            />
          </div>
        </div>

        {successMsg && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMsg}
          </Alert>
        )}

        <div className={styles.middlerow}>
          {/* Tracking Milestones Card */}
          <Card className={styles.card} sx={{ mb: 2.5 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#7C3AED' }}>
                    TRACKING SHIPMENT • {order.delId}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {order.customer} (Vehicle: TN 01 AB 1234)
                  </Typography>
                </Box>
                <StatusBadge status={order.delStatus} />
              </Box>

              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Driver: Selvam (+91 94441 23456)</Typography>
                <Typography variant="caption" color="text.secondary">
                  Cargo: Deep Freezer (-80°C) • 2 Units • Delivery Challan: {order.dcId}
                </Typography>
              </Box>

              <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 1 }}>
                DELIVERY JOURNEY MILESTONES:
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ p: 1.5, bgcolor: '#F0FDF4', borderRadius: 2, borderLeft: '4px solid #16A34A' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>1. Factory Dispatch Confirmed</Typography>
                  <Typography variant="caption" color="text.secondary">Loaded and left Cryo Manufacturing Facility (10:00 AM)</Typography>
                </Box>

                <Box sx={{ p: 1.5, bgcolor: '#F0FDF4', borderRadius: 2, borderLeft: '4px solid #16A34A' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>2. In Transit via GST Road</Typography>
                  <Typography variant="caption" color="text.secondary">Crossed Tambaram Bypass checkpoint (11:15 AM)</Typography>
                </Box>

                <Box sx={{ p: 1.5, bgcolor: order.delStatus === 'Delivered' ? '#F0FDF4' : '#EFF6FF', borderRadius: 2, borderLeft: `4px solid ${order.delStatus === 'Delivered' ? '#16A34A' : '#2563EB'}` }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>3. Arrival at Client Premises</Typography>
                  <Typography variant="caption" color="text.secondary">Vehicle reached ABC Laboratory Guindy Estate (12:30 PM)</Typography>
                </Box>

                <Box sx={{ p: 1.5, bgcolor: order.podRecorded ? '#F0FDF4' : '#FFFBEB', borderRadius: 2, borderLeft: `4px solid ${order.podRecorded ? '#16A34A' : '#D97706'}` }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>4. Customer Inspection & Handover</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {order.podRecorded ? `POD Signed by ${order.podSignature}` : 'Awaiting customer sign-off'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {!order.podRecorded ? (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<TaskAltIcon />}
                    onClick={() => setPodOpen(true)}
                    sx={{ flex: 1, minWidth: 180, fontWeight: 700 }}
                  >
                    Record Proof of Delivery (POD)
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled
                    sx={{ flex: 1, minWidth: 180 }}
                  >
                    POD Recorded
                  </Button>
                )}

                {order.balanceAmount > 0 ? (
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<PaymentsIcon />}
                    onClick={() => setPayOpen(true)}
                    sx={{ flex: 1, minWidth: 180, fontWeight: 700 }}
                  >
                    Collect Balance ({fmtINR(order.balanceAmount)})
                  </Button>
                ) : (
                  <Button variant="outlined" color="success" disabled sx={{ flex: 1, minWidth: 180 }}>
                    Payment 100% Settled
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </div>

        {/* POD Modal */}
        <Dialog open={podOpen} onClose={() => setPodOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Sign Proof of Delivery (POD)</DialogTitle>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Confirm that customer has inspected and received 2 units of Deep Freezer (-80°C) without physical damages.
            </Typography>
            <TextField
              label="Receiving Official Name & Title"
              value={signName}
              onChange={(e) => setSignName(e.target.value)}
              required
            />
            <TextField label="Equipment Condition" defaultValue="Delivered in prime condition with all calibration test certificates" disabled />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setPodOpen(false)}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleConfirmPOD}>
              Confirm POD Handover
            </Button>
          </DialogActions>
        </Dialog>

        {/* Payment Modal */}
        <Dialog open={payOpen} onClose={() => setPayOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Collect Balance Payment on Site</DialogTitle>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Order SO-001 Terms: Balance of {fmtINR(order.balanceAmount)} payable on delivery.
            </Typography>
            <TextField
              type="number"
              label="Collected Amount (₹)"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              required
            />
            <TextField
              label="Payment Mode / Cheque Ref"
              value={payMode}
              onChange={(e) => setPayMode(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setPayOpen(false)}>Cancel</Button>
            <Button variant="contained" color="warning" onClick={handleCollectPayment}>
              Record Payment
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default LogisticsTrackingPOD;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddTaskIcon from '@mui/icons-material/AddTask';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import styles from './ProductionDailyQC.module.scss';

export const ProductionDailyQC = () => {
  const navigate = useNavigate();
  const { order, handoverToLogistics, advanceOrderStage } = useErpStore();
  const [qcModalOpen, setQcModalOpen] = useState(false);
  const [qcSuccess, setQcSuccess] = useState(false);
  const [handoverDone, setHandoverDone] = useState(false);

  const handleApproveQC = () => {
    advanceOrderStage(20);
    setQcModalOpen(false);
    setQcSuccess(true);
  };

  const handleHandover = () => {
    handoverToLogistics();
    setHandoverDone(true);
    setTimeout(() => {
      navigate('/logistics/dashboard');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Daily Progress & QC Inspection"
              subtitle="Assembly Milestones, Quality Pass & Logistics Handover"
              showBack
            />
          </div>
        </div>

        {qcSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Quality Inspection Approved (Zero Defects). Temperature test confirmed: -86.2°C achieved.
          </Alert>
        )}

        {handoverDone && (
          <Alert severity="success" sx={{ mb: 2 }}>
            PRO-001 handed over to Logistics! Opening Logistics Dashboard...
          </Alert>
        )}

        <div className={styles.middlerow}>
          {/* Daily Assembly Stages Card */}
          <Card className={styles.card} sx={{ mb: 2.5 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Assembly Progress: {order.proId}
                </Typography>
                <StatusBadge status={`${order.prodProgress}% Completed`} />
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={order.prodProgress}
                  sx={{ height: 10, borderRadius: 5, bgcolor: '#CCFBF1', '& .MuiLinearProgress-bar': { bgcolor: '#0D9488' } }}
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, borderLeft: '4px solid #16A34A' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Stage 1: Stainless Steel Frame Fabrication</Typography>
                  <Typography variant="caption" color="text.secondary">8 sheets cut, laser welded, inner chamber leak-tested (100% Completed)</Typography>
                </Box>

                <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, borderLeft: '4px solid #16A34A' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Stage 2: Cascade Refrigeration System Integration</Typography>
                  <Typography variant="caption" color="text.secondary">Dual Embraco compressors installed, copper piping brazed, nitrogen pressure tested (100% Completed)</Typography>
                </Box>

                <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, borderLeft: '4px solid #16A34A' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Stage 3: Microprocessor & Sensor Wiring</Typography>
                  <Typography variant="caption" color="text.secondary">Temperature controller wired, RTD PT100 sensors mounted, alarm buzzer calibrated (100% Completed)</Typography>
                </Box>

                <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, borderLeft: '4px solid #16A34A' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Stage 4: 48-Hour Pull-Down & Temperature Stabilization</Typography>
                  <Typography variant="caption" color="text.secondary">Freezer pulled down to -86.2°C and held stable for 48 hours continuous running (100% Completed)</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Quality Check Card */}
          <Card className={styles.card}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Quality Check (QC) Approval
                </Typography>
                <StatusBadge status={order.qcStatus} />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {order.qcNotes}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => setQcModalOpen(true)}
                  sx={{ flex: 1, minWidth: 180 }}
                >
                  Record QC Verification
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LocalShippingIcon />}
                  onClick={handleHandover}
                  sx={{ flex: 1, minWidth: 180, fontWeight: 700 }}
                >
                  Handover to Logistics
                </Button>
              </Box>
            </CardContent>
          </Card>
        </div>

        {/* Record QC Modal */}
        <Dialog open={qcModalOpen} onClose={() => setQcModalOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>QC Inspection Approval Form</DialogTitle>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Quality Inspector" defaultValue="Rajan S (QC Lead)" disabled />
            <TextField label="Achieved Temperature (°C)" defaultValue="-86.2°C" />
            <TextField label="Inspected Serial Numbers" defaultValue="CRYO-DF80-2026-001, CRYO-DF80-2026-002" disabled />
            <TextField label="Inspection Checklist Notes" defaultValue="Zero defects. All safety cut-off relays and door gaskets verified." multiline rows={2} />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setQcModalOpen(false)}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleApproveQC}>
              Sign Off Quality Pass
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductionDailyQC;

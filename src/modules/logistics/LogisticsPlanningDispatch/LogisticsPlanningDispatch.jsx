import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import DescriptionIcon from '@mui/icons-material/Description';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import styles from './LogisticsPlanningDispatch.module.scss';

export const LogisticsPlanningDispatch = () => {
  const navigate = useNavigate();
  const { vehicles, couriers, deliveryPlans, order, advanceOrderStage } = useErpStore();
  const [tab, setTab] = useState('plans');
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [challanOpen, setChallanOpen] = useState(false);
  const [dispatchAlert, setDispatchAlert] = useState(false);

  // Form State
  const [method, setMethod] = useState('Own Vehicle');
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id || '');
  const [destination, setDestination] = useState('Chennai Guindy Industrial Estate');

  const handleDispatch = () => {
    advanceOrderStage(21);
    setDispatchAlert(true);
    setTimeout(() => {
      setDispatchAlert(false);
      navigate('/logistics/tracking-hub');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Delivery Planning & Dispatch"
              subtitle="Fleet Assignment, Challans & Vehicle Dispatch"
              showBack
            />
          </div>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, val) => setTab(val)}>
            <Tab label="Delivery Plans" value="plans" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Fleet & Vehicles" value="vehicles" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Courier Providers" value="couriers" sx={{ textTransform: 'none', fontWeight: 600 }} />
          </Tabs>
        </Box>

        {dispatchAlert && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Dispatch confirmed! Shipment DEL-001 is now IN TRANSIT to client site.
          </Alert>
        )}

        <div className={styles.middlerow}>
          {tab === 'plans' && (
            <div className={styles.list}>
              {deliveryPlans.map((dp) => (
                <Card key={dp.id} className={styles.card}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#7C3AED' }}>
                          DELIVERY PLAN • {dp.id}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {dp.customer}
                        </Typography>
                      </Box>
                      <StatusBadge status={order.delStatus || dp.status} />
                    </Box>

                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Destination: {dp.destination}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                      Method: {dp.method} • Assigned Vehicle: {dp.vehicleRef}
                    </Typography>

                    <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                      <Typography variant="caption" display="block">
                        • Delivery Challan: <strong>{dp.challanRef}</strong>
                      </Typography>
                      <Typography variant="caption" display="block">
                        • Packaging Status: <strong>PKG-001 Inspected & Moisture Sealed</strong>
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DepartureBoardIcon />}
                        onClick={handleDispatch}
                        sx={{ flex: 1, minWidth: 180, fontWeight: 700 }}
                      >
                        Confirm Dispatch
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DescriptionIcon />}
                        onClick={() => setChallanOpen(true)}
                      >
                        View Challan (DC-001)
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {tab === 'vehicles' && (
            <div className={styles.list}>
              {vehicles.map((v) => (
                <Card key={v.id} className={styles.card}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {v.regNo} ({v.type})
                      </Typography>
                      <StatusBadge status={v.status} size="small" />
                    </Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Capacity: {v.capacity} • Driver: {v.driver} ({v.phone})
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {tab === 'couriers' && (
            <div className={styles.list}>
              {couriers.map((c) => (
                <Card key={c.id} className={styles.card}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {c.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Type: {c.type} • Contact: {c.phone}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Challan Modal */}
        <Dialog open={challanOpen} onClose={() => setChallanOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Delivery Challan DC-001</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ p: 2, bgcolor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A8A' }}>
                CRYO ENTERPRISE DELIVERY CHALLAN
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 2 }}>
                DC No: DC-001 • Date: 2026-11-20 • Vehicle: TN 01 AB 1234
              </Typography>
              <Typography variant="body2"><strong>Consignee:</strong> ABC Laboratory, Guindy, Chennai</Typography>
              <Typography variant="body2"><strong>Product:</strong> Deep Freezer (-80°C) • Qty: 2 Units</Typography>
              <Typography variant="body2"><strong>Serial Nos:</strong> CRYO-DF80-2026-001, CRYO-DF80-2026-002</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setChallanOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default LogisticsPlanningDispatch;

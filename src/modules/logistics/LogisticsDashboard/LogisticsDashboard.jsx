import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import SummaryCard from '../../../components/common/SummaryCard/SummaryCard';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { useAuthStore } from '../../../stores/authStore';
import { fmtINR } from '../../../utils/formatters';
import styles from './LogisticsDashboard.module.scss';

export const LogisticsDashboard = () => {
  const navigate = useNavigate();
  const { currentPersona } = useAuthStore();
  const { deliveryPlans, order, confirmDelivery, recordPayment } = useErpStore();

  const handleQuickPOD = () => {
    confirmDelivery('Dr. Ramesh Babu (Customer Stamp & Sign)');
    if (order.balanceAmount > 0) {
      recordPayment({
        ref: 'SO-001',
        customer: 'ABC Laboratory',
        type: 'Delivery Balance Payment',
        mode: 'Cheque / Wire Transfer',
        amount: order.balanceAmount
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Logistics & Delivery"
              subtitle="Fleet Planning, Dispatch, Tracking & POD"
              showBack
            />
          </div>
        </div>

        {/* Logistics Flow Strip */}
        <div className={styles.flowStrip}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1.5 }}>
            END-TO-END DELIVERY & FULFILLMENT FLOW
          </Typography>
          <div className={styles.stepperContainer}>
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>1</span>
              <span>Ready Order</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>2</span>
              <span>Delivery Plan</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>3</span>
              <span>Packing & DC</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>4</span>
              <span>Dispatch</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>5</span>
              <span>POD & Balance ₹</span>
            </div>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className={styles.middlerow}>
          <div className={styles.metricsGrid}>
            <SummaryCard
              title="Ready for Delivery"
              value="1 Order"
              subtitle="PRO-001 (Deep Freezer)"
              icon={LocalShippingIcon}
              accentColor="#7C3AED"
              onClick={() => navigate('/logistics/orders-hub')}
            />
            <SummaryCard
              title="Delivery Plans"
              value={deliveryPlans.length}
              subtitle="DEL-001 scheduled"
              icon={DepartureBoardIcon}
              accentColor="#6D28D9"
              onClick={() => navigate('/logistics/dispatch-hub')}
            />
            <SummaryCard
              title="Active In Transit"
              value={order.delStatus === 'Delivered' ? 0 : 1}
              subtitle="TN 01 AB 1234"
              icon={GpsFixedIcon}
              accentColor="#2563EB"
              onClick={() => navigate('/logistics/tracking-hub')}
            />
            <SummaryCard
              title="Completed PODs"
              value={order.delStatus === 'Delivered' ? 1 : 0}
              subtitle={order.delStatus === 'Delivered' ? 'POD Signed & Balance Paid' : 'Pending Handover'}
              icon={TaskAltIcon}
              accentColor="#16A34A"
              onClick={() => navigate('/logistics/tracking-hub')}
            />
          </div>

          {/* Active Delivery DEL-001 Card */}
          <Card className={styles.delCard} sx={{ mt: 2.5 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#7C3AED' }}>
                    ACTIVE SHIPMENT • {order.delId}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {order.customer} (PRO: {order.proId})
                  </Typography>
                </Box>
                <StatusBadge status={order.delStatus} />
              </Box>

              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {order.product} ({order.qty} Units)
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5 }}>
                Destination: Chennai Guindy Industrial Estate • Mode: Own Mini Truck (TN 01 AB 1234)
              </Typography>

              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.5 }}>
                  DELIVERY DOCUMENTATION & PAYMENT STATUS:
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  • Delivery Challan: <strong>{order.dcId}</strong> (Attached to vehicle)
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  • Advance Received: <strong>{fmtINR(order.receivedAmount)}</strong>
                </Typography>
                <Typography variant="caption" display="block" sx={{ color: '#B45309', fontWeight: 600 }}>
                  • Balance to Collect at Site: <strong>{fmtINR(order.balanceAmount)}</strong>
                </Typography>
                {order.podRecorded && (
                  <Typography variant="caption" display="block" sx={{ color: '#16A34A', fontWeight: 700, mt: 0.5 }}>
                    ✓ Proof of Delivery Signed: {order.podSignature}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {order.delStatus !== 'Delivered' ? (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<TaskAltIcon />}
                    onClick={handleQuickPOD}
                    sx={{ flex: 1, minWidth: 200, fontWeight: 700 }}
                  >
                    Confirm Delivery & POD
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled
                    sx={{ flex: 1, minWidth: 200 }}
                  >
                    Shipment 100% Completed
                  </Button>
                )}
                <Button variant="outlined" onClick={() => navigate('/logistics/tracking-hub')}>
                  Open Live Tracking
                </Button>
              </Box>
            </CardContent>
          </Card>
        </div>

        {/* Quick Nav */}
        <div className={styles.bottomrow}>
          <div className={styles.quickAccessRow}>
            <Button variant="outlined" size="small" onClick={() => navigate('/logistics/orders-hub')}>
              Orders Hub
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigate('/logistics/dispatch-hub')}>
              Dispatch Hub
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigate('/logistics/tracking-hub')}>
              Tracking Hub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;

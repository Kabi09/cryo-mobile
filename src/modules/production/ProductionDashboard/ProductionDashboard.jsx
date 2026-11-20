import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, LinearProgress } from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LayersIcon from '@mui/icons-material/Layers';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import SummaryCard from '../../../components/common/SummaryCard/SummaryCard';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { useAuthStore } from '../../../stores/authStore';
import styles from './ProductionDashboard.module.scss';

export const ProductionDashboard = () => {
  const navigate = useNavigate();
  const { currentPersona } = useAuthStore();
  const { productionOrders, order, handoverToLogistics } = useErpStore();

  const handleHandover = () => {
    handoverToLogistics();
    navigate('/logistics/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Production Management"
              subtitle="Shopfloor Orders, BOM & Quality Control"
              showBack
            />
          </div>
        </div>

        {/* Production Flow Strip */}
        <div className={styles.flowStrip}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1.5 }}>
            SHOPFLOOR PRODUCTION WORKFLOW
          </Typography>
          <div className={styles.stepperContainer}>
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>1</span>
              <span>Incoming SO</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>2</span>
              <span>BOM & MR</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>3</span>
              <span>Mat. Receipt</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>4</span>
              <span>Daily Assembly</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>5</span>
              <span>QC & Handover</span>
            </div>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className={styles.middlerow}>
          <div className={styles.metricsGrid}>
            <SummaryCard
              title="Production Orders"
              value={productionOrders.length}
              subtitle="PRO-001 active"
              icon={PrecisionManufacturingIcon}
              accentColor="#0D9488"
              onClick={() => navigate('/production/orders-hub')}
            />
            <SummaryCard
              title="BOM Status"
              value="1 Confirmed"
              subtitle="BOM-001 (Deep Freezer)"
              icon={LayersIcon}
              accentColor="#059669"
              onClick={() => navigate('/production/materials-hub')}
            />
            <SummaryCard
              title="Assembly Progress"
              value={`${order.prodProgress}%`}
              subtitle="Cascade refrigeration"
              icon={AssignmentTurnedInIcon}
              accentColor="#10B981"
              onClick={() => navigate('/production/production-hub')}
            />
            <SummaryCard
              title="Ready for Logistics"
              value="1 Unit"
              subtitle="Zero defects passed"
              icon={LocalShippingIcon}
              accentColor="#0284C7"
              onClick={() => navigate('/production/production-hub')}
            />
          </div>

          {/* Active Order PRO-001 Status Card */}
          <Card className={styles.proCard} sx={{ mt: 2.5 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#0D9488' }}>
                    ACTIVE PRODUCTION ORDER
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {order.proId} (Ref: {order.soId})
                  </Typography>
                </Box>
                <StatusBadge status={order.proStatus} />
              </Box>

              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {order.product} — Quantity: {order.qty} Units
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5 }}>
                Client: {order.customer} • Linked BOM: {order.bomId}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Shopfloor Completion:</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#0D9488' }}>{order.prodProgress}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={order.prodProgress} sx={{ height: 8, borderRadius: 4, bgcolor: '#CCFBF1', '& .MuiLinearProgress-bar': { bgcolor: '#0D9488' } }} />
              </Box>

              <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                <Typography variant="caption" display="block" color="text.secondary">
                  Material Receipt Status: <strong>{order.mrStatus}</strong> (MI-001 & MI-002 Received)
                </Typography>
                <Typography variant="caption" display="block" sx={{ color: '#16A34A', fontWeight: 600 }}>
                  Quality Check: Passed (Zero Defects, -86.2°C temperature test OK)
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<LocalShippingIcon />}
                  onClick={handleHandover}
                  sx={{ flex: 1, minWidth: 200, fontWeight: 700 }}
                >
                  Handover to Logistics (Ready)
                </Button>
                <Button variant="outlined" onClick={() => navigate('/production/orders-hub')}>
                  View BOM & Material Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        </div>

        {/* Quick Nav */}
        <div className={styles.bottomrow}>
          <div className={styles.quickAccessRow}>
            <Button variant="outlined" size="small" onClick={() => navigate('/production/orders-hub')}>
              Orders Hub
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigate('/production/materials-hub')}>
              BOM & Receipts
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigate('/production/production-hub')}>
              Daily Progress & QC
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionDashboard;

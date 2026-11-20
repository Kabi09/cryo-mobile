import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import SummaryCard from '../../../components/common/SummaryCard/SummaryCard';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { useAuthStore } from '../../../stores/authStore';
import styles from './SCMDashboard.module.scss';

export const SCMDashboard = () => {
  const navigate = useNavigate();
  const { currentPersona } = useAuthStore();
  const { materials, materialRequests, purchaseOrders, grns, order, confirmGRN, issueMaterials } = useErpStore();

  const handleQuickGRN = () => {
    confirmGRN('GRN-001');
  };

  const handleQuickIssue = () => {
    issueMaterials('MR-001', false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Supply Chain & Stores"
              subtitle="Material Requests, Inventory & Procurement"
              showBack
            />
          </div>
        </div>

        {/* SCM Flow Strip */}
        <div className={styles.flowStrip}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1.5 }}>
            SUPPLY CHAIN & INVENTORY FULFILLMENT
          </Typography>
          <div className={styles.stepperContainer}>
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>1</span>
              <span>MR-001</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>2</span>
              <span>Stock Check</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>3</span>
              <span>Partial Issue</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>4</span>
              <span>PO & GRN</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>5</span>
              <span>Full Issue</span>
            </div>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className={styles.middlerow}>
          <div className={styles.metricsGrid}>
            <SummaryCard
              title="Material Requests"
              value={materialRequests.length}
              subtitle="MR-001 active"
              icon={InventoryIcon}
              accentColor="#D97706"
              onClick={() => navigate('/supply-chain/requests-hub')}
            />
            <SummaryCard
              title="Inventory Items"
              value={materials.length}
              subtitle="Compressors, Steel, Temp"
              icon={WarehouseIcon}
              accentColor="#B45309"
              onClick={() => navigate('/supply-chain/inventory-hub')}
            />
            <SummaryCard
              title="Purchase Orders"
              value={purchaseOrders.length}
              subtitle="PO-001 Delivered"
              icon={ShoppingCartIcon}
              accentColor="#2563EB"
              onClick={() => navigate('/supply-chain/purchase-hub')}
            />
            <SummaryCard
              title="Confirmed GRNs"
              value={grns.length}
              subtitle="GRN-001 Accepted"
              icon={AssignmentTurnedInIcon}
              accentColor="#16A34A"
              onClick={() => navigate('/supply-chain/purchase-hub')}
            />
          </div>

          {/* Active Material Request Card */}
          <Card className={styles.mrCard} sx={{ mt: 2.5 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#D97706' }}>
                    ACTIVE PRODUCTION MATERIAL REQUEST
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {order.mrId} (PRO: {order.proId})
                  </Typography>
                </Box>
                <StatusBadge status={order.mrStatus} />
              </Box>

              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Requested for: {order.product} ({order.qty} Units)
              </Typography>

              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 1 }}>
                  STOCK AVAILABILITY BREAKDOWN:
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">RM-101 Compressor:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#16A34A' }}>2 / 2 Available (100% Issued)</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">RM-102 Steel Sheet:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#16A34A' }}>8 / 8 Available (100% Issued)</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">RM-103 Temp Controller:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#16A34A' }}>2 / 2 Available (100% Issued)</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => navigate('/supply-chain/requests-hub')}
                  sx={{ flex: 1, minWidth: 180, fontWeight: 700 }}
                >
                  Manage Requests & Issues
                </Button>
                <Button variant="outlined" onClick={() => navigate('/supply-chain/inventory-hub')}>
                  Inspect Inventory Stocks
                </Button>
              </Box>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <div className={styles.bottomrow}>
          <div className={styles.quickAccessRow}>
            <Button variant="outlined" size="small" onClick={() => navigate('/supply-chain/requests-hub')}>
              Requests Hub
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigate('/supply-chain/inventory-hub')}>
              Inventory & Stocks
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigate('/supply-chain/purchase-hub')}>
              Suppliers & POs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SCMDashboard;

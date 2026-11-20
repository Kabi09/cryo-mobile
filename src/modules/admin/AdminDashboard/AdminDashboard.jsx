import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LaunchIcon from '@mui/icons-material/Launch';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import SummaryCard from '../../../components/common/SummaryCard/SummaryCard';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { useAuthStore } from '../../../stores/authStore';
import { fmtINR } from '../../../utils/formatters';
import styles from './AdminDashboard.module.scss';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentPersona, setActiveDept } = useAuthStore();
  const { order, approvals, salesOrders } = useErpStore();

  const handleLaunchDept = (deptKey) => {
    setActiveDept(deptKey);
    navigate(`/${deptKey}/dashboard`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Centralized Management HQ"
              subtitle="Unified Operations, Financials & End-to-End Tracking"
              actions={
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AssignmentIcon />}
                  onClick={() => navigate('/admin/order-journey')}
                  sx={{ borderRadius: 2 }}
                >
                  22-Stage Journey
                </Button>
              }
            />
          </div>
        </div>

        {/* 6 Business Overview Cards */}
        <div className={styles.middlerow}>
          <div className={styles.metricsGrid}>
            <SummaryCard
              title="Revenue Collected"
              value={fmtINR(order.receivedAmount)}
              subtitle={`Total Pipeline: ${fmtINR(order.orderValue)}`}
              icon={PaymentsIcon}
              accentColor="#16A34A"
              onClick={() => navigate('/admin/payments-dashboard')}
            />
            <SummaryCard
              title="Active Orders"
              value={salesOrders.length}
              subtitle="SO-001 In Progress"
              icon={AssignmentIcon}
              accentColor="#1E3A8A"
              onClick={() => navigate('/admin/all-orders')}
            />
            <SummaryCard
              title="Shopfloor Progress"
              value={`${order.prodProgress}%`}
              subtitle="Zero Defects QC Passed"
              icon={PrecisionManufacturingIcon}
              accentColor="#0D9488"
              onClick={() => handleLaunchDept('production')}
            />
            <SummaryCard
              title="Stores & Inventory"
              value="100% Issued"
              subtitle="MI-001 & MI-002 Complete"
              icon={InventoryIcon}
              accentColor="#D97706"
              onClick={() => handleLaunchDept('supply-chain')}
            />
            <SummaryCard
              title="Delivery Status"
              value={order.delStatus}
              subtitle="Own Vehicle TN 01 AB 1234"
              icon={LocalShippingIcon}
              accentColor="#7C3AED"
              onClick={() => handleLaunchDept('logistics')}
            />
            <SummaryCard
              title="Pending Approvals"
              value={`${approvals.length} Items`}
              subtitle="Discount & Material Master"
              icon={CheckCircleOutlineIcon}
              accentColor="#DC2626"
              onClick={() => navigate('/admin/approvals')}
            />
          </div>

          {/* Centralized 22-Stage Order Journey Spotlight */}
          <Card className={styles.journeyCard} sx={{ mt: 2.5 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#1E3A8A' }}>
                    UNIFIED ORDER LIFECYCLE (22 STAGES)
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {order.soId} — {order.customer}
                  </Typography>
                </Box>
                <StatusBadge status={`Stage ${order.completedStageNum} of 22`} />
              </Box>

              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Product: {order.product} ({order.qty} Units) • Total Value: {fmtINR(order.orderValue)}
              </Typography>

              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Advance Paid: <strong>{fmtINR(order.receivedAmount)}</strong> • Balance: <strong>{fmtINR(order.balanceAmount)}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Shopfloor Progress: <strong>{order.prodProgress}%</strong> • QC: <strong>{order.qcStatus}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Shipment: <strong>{order.delId}</strong> ({order.delStatus}) • POD: <strong>{order.podRecorded ? 'Recorded' : 'In Transit'}</strong>
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/admin/order-journey')}
                sx={{ py: 1.25, fontWeight: 700 }}
              >
                Inspect Complete 22-Stage Order Journey
              </Button>
            </CardContent>
          </Card>

          {/* 5 Full-Access Department Workspaces Section */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: 'text.secondary', textTransform: 'uppercase' }}>
              Direct Access to Department Workspaces
            </Typography>

            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <Card className={styles.deptCard} onClick={() => handleLaunchDept('sales')}>
                  <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1D4ED8' }}>Sales Workspace</Typography>
                      <Typography variant="caption" color="text.secondary">Enquiries, Quotations & Sales Orders</Typography>
                    </Box>
                    <LaunchIcon fontSize="small" sx={{ color: '#1D4ED8' }} />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card className={styles.deptCard} onClick={() => handleLaunchDept('production')}>
                  <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0D9488' }}>Production Workspace</Typography>
                      <Typography variant="caption" color="text.secondary">BOM, Material Receipts & QC</Typography>
                    </Box>
                    <LaunchIcon fontSize="small" sx={{ color: '#0D9488' }} />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card className={styles.deptCard} onClick={() => handleLaunchDept('supply-chain')}>
                  <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#D97706' }}>Supply Chain Workspace</Typography>
                      <Typography variant="caption" color="text.secondary">Inventory, Suppliers & GRN</Typography>
                    </Box>
                    <LaunchIcon fontSize="small" sx={{ color: '#D97706' }} />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card className={styles.deptCard} onClick={() => handleLaunchDept('logistics')}>
                  <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#7C3AED' }}>Logistics Workspace</Typography>
                      <Typography variant="caption" color="text.secondary">Fleet Dispatch & Delivery Tracking</Typography>
                    </Box>
                    <LaunchIcon fontSize="small" sx={{ color: '#7C3AED' }} />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={styles.deptCard} onClick={() => handleLaunchDept('employees')}>
                  <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0284C7' }}>Employee & Permissions Workspace</Typography>
                      <Typography variant="caption" color="text.secondary">User Accounts & Access Policies</Typography>
                    </Box>
                    <LaunchIcon fontSize="small" sx={{ color: '#0284C7' }} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>

        {/* Quick Nav */}
        <div className={styles.bottomrow}>
          <div className={styles.quickAccessRow}>
            <Button variant="outlined" size="small" onClick={() => navigate('/admin/all-orders')}>
              All Orders
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigate('/admin/payments-dashboard')}>
              Financials
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigate('/admin/reports-dashboard')}>
              Reports
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigate('/admin/approvals')}>
              Approvals ({approvals.length})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

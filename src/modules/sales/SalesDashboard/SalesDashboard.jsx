import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Card, CardContent, Chip } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import SummaryCard from '../../../components/common/SummaryCard/SummaryCard';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { useAuthStore } from '../../../stores/authStore';
import { fmtINR } from '../../../utils/formatters';
import styles from './SalesDashboard.module.scss';

export const SalesDashboard = () => {
  const navigate = useNavigate();
  const { currentPersona } = useAuthStore();
  const { enquiries, quotations, salesOrders, order } = useErpStore();

  const newEnquiriesCount = enquiries.filter((e) => e.status !== 'Lost').length;
  const pendingQuotationsCount = quotations.filter((q) => q.status !== 'Rejected').length;
  const confirmedOrdersCount = salesOrders.length;
  const activeOrderValue = salesOrders.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Top greeting and quick action */}
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title={`Hello, ${currentPersona.name.split(' ')[0]}`}
              subtitle="Sales Management • Active Pipeline"
              actions={
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/sales/create-enquiry')}
                  sx={{ borderRadius: 2 }}
                >
                  New Enquiry
                </Button>
              }
            />
          </div>
        </div>

        {/* Sales Pipeline Flow Strip */}
        <div className={styles.flowStrip}>
          <div className={styles.flowTitle}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
              SALES ORDER PIPELINE FLOW
            </Typography>
          </div>
          <div className={styles.stepperContainer}>
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>1</span>
              <span>Enquiry</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>2</span>
              <span>Quotation</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>3</span>
              <span>Customer PO</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>4</span>
              <span>Advance ₹</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.stepItem} ${styles.active}`}>
              <span className={styles.stepNum}>5</span>
              <span>To Production</span>
            </div>
          </div>
        </div>

        {/* 4 Overview Metric Cards */}
        <div className={styles.middlerow}>
          <div className={styles.metricsGrid}>
            <SummaryCard
              title="Active Enquiries"
              value={newEnquiriesCount}
              subtitle="2 Qualified leads"
              icon={ContactMailIcon}
              accentColor="#1D4ED8"
              onClick={() => navigate('/sales/enquiry-list')}
            />
            <SummaryCard
              title="Quotations"
              value={pendingQuotationsCount}
              subtitle="QT-001 Accepted"
              icon={RequestQuoteIcon}
              accentColor="#2563EB"
              onClick={() => navigate('/sales/quotation-list')}
            />
            <SummaryCard
              title="Sales Orders"
              value={confirmedOrdersCount}
              subtitle="SO-001 in progress"
              icon={CheckCircleIcon}
              accentColor="#16A34A"
              onClick={() => navigate('/sales/so-list')}
            />
            <SummaryCard
              title="Pipeline Value"
              value={fmtINR(activeOrderValue)}
              subtitle="₹1,00,000 Collected"
              icon={ScheduleIcon}
              accentColor="#0D9488"
              onClick={() => navigate('/sales/payments')}
            />
          </div>

          {/* Active Golden Order SO-001 Live Status Card */}
          <Card className={styles.liveOrderCard} sx={{ mt: 2.5 }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#1D4ED8', textTransform: 'uppercase' }}>
                    Connected Live Order
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    {order.soId} • {order.customer}
                  </Typography>
                </Box>
                <StatusBadge status={order.proStatus || 'In Progress'} />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                Product: <strong>{order.product}</strong> ({order.qty} Units) • Total: <strong>{fmtINR(order.orderValue)}</strong>
              </Typography>

              <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Advance Paid: <strong>{fmtINR(order.receivedAmount)}</strong> • Balance: <strong>{fmtINR(order.balanceAmount)}</strong>
                </Typography>
                <Typography variant="caption" sx={{ color: '#16A34A', fontWeight: 600 }}>
                  Terms: {order.paymentArrangement}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                fullWidth
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/sales/so-details/SO-001')}
                sx={{ borderRadius: 2 }}
              >
                Inspect Sales Order Journey
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access List */}
        <div className={styles.bottomrow}>
          <div className={styles.quickAccessSection}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: 'text.secondary', textTransform: 'uppercase' }}>
              Quick Workflows
            </Typography>
            <div className={styles.actionButtonsRow}>
              <Button variant="outlined" size="small" onClick={() => navigate('/sales/enquiry-list')}>
                Enquiries ({enquiries.length})
              </Button>
              <Button variant="outlined" size="small" onClick={() => navigate('/sales/followups')}>
                Follow-ups
              </Button>
              <Button variant="outlined" size="small" onClick={() => navigate('/sales/customers')}>
                Customers
              </Button>
              <Button variant="outlined" size="small" onClick={() => navigate('/sales/products')}>
                Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;

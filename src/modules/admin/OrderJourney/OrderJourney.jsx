import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LaunchIcon from '@mui/icons-material/Launch';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { useAuthStore } from '../../../stores/authStore';
import { fmtINR } from '../../../utils/formatters';
import styles from './OrderJourney.module.scss';

const STAGES = [
  { num: 1, dept: 'Sales', title: 'Customer Enquiry Received', ref: 'ENQ-001', route: '/sales/enquiry-list' },
  { num: 2, dept: 'Sales', title: 'Technical Consultation & Follow-up', ref: 'FU-01', route: '/sales/followups' },
  { num: 3, dept: 'Sales', title: 'Enquiry Qualified as Commercial Opportunity', ref: 'ENQ-001', route: '/sales/enquiry-list' },
  { num: 4, dept: 'Sales', title: 'Formal Quotation Generated', ref: 'QT-001 (v1)', route: '/sales/quotation-list' },
  { num: 5, dept: 'Sales', title: 'Quotation Dispatched to Client', ref: 'QT-001', route: '/sales/quotation-list' },
  { num: 6, dept: 'Sales', title: 'Quotation Follow-up & Review', ref: 'FU-01', route: '/sales/followups' },
  { num: 7, dept: 'Sales', title: 'Price & Maintenance Negotiation', ref: 'QT-001 (v2)', route: '/sales/quotation-list' },
  { num: 8, dept: 'Sales', title: 'Quotation Accepted by Customer', ref: 'QT-001', route: '/sales/quotation-list' },
  { num: 9, dept: 'Sales', title: 'Proforma Invoice (PI) Issued', ref: 'PI-001', route: '/sales/so-list' },
  { num: 10, dept: 'Sales', title: 'Customer Purchase Order Received', ref: 'CPO-001', route: '/sales/so-list' },
  { num: 11, dept: 'Sales', title: 'Advance Payment Verified (₹1,00,000)', ref: 'PAY-001', route: '/sales/payments' },
  { num: 12, dept: 'Sales', title: 'Confirmed Sales Order Generated', ref: 'SO-001', route: '/sales/so-list' },
  { num: 13, dept: 'Production', title: 'Production Order Created', ref: 'PRO-001', route: '/production/orders-hub' },
  { num: 14, dept: 'Production', title: 'Bill of Materials (BOM) Confirmed', ref: 'BOM-001', route: '/production/materials-hub' },
  { num: 15, dept: 'Supply Chain', title: 'Stock Check & Partial Issue (MI-001)', ref: 'MI-001', route: '/supply-chain/requests-hub' },
  { num: 16, dept: 'Supply Chain', title: 'Purchase Order Placed for Shortages', ref: 'PO-001', route: '/supply-chain/purchase-hub' },
  { num: 17, dept: 'Supply Chain', title: 'Goods Receipt Note (GRN) Confirmed', ref: 'GRN-001', route: '/supply-chain/purchase-hub' },
  { num: 18, dept: 'Supply Chain', title: 'Remaining Materials Issued (MI-002)', ref: 'MI-002', route: '/supply-chain/requests-hub' },
  { num: 19, dept: 'Production', title: 'Shopfloor Assembly Progress Updates', ref: 'PRO-001', route: '/production/production-hub' },
  { num: 20, dept: 'Production', title: 'Quality Check (QC) Sign-off', ref: 'QC Passed', route: '/production/production-hub' },
  { num: 21, dept: 'Logistics', title: 'Delivery Planning, Packing & Dispatch', ref: 'DEL-001', route: '/logistics/dispatch-hub' },
  { num: 22, dept: 'Logistics', title: 'Customer POD & Balance Collection', ref: 'DEL-001', route: '/logistics/tracking-hub' }
];

export const OrderJourney = () => {
  const navigate = useNavigate();
  const { setActiveDept } = useAuthStore();
  const { order } = useErpStore();

  const handleJump = (stage) => {
    const deptKey = stage.dept.toLowerCase().replace(' ', '-');
    setActiveDept(deptKey === 'supply-chain' ? 'supply-chain' : deptKey);
    navigate(stage.route);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="22-Stage Order Journey"
              subtitle={`Complete Life Cycle for Order ${order.soId} (ABC Laboratory)`}
              showBack
            />
          </div>
        </div>

        {/* Order Header Summary */}
        <Card className={styles.headerCard} sx={{ mb: 2.5 }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {order.customer} — {order.product}
              </Typography>
              <StatusBadge status={`Stage ${order.completedStageNum} of 22`} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Total Order Value: <strong>{fmtINR(order.orderValue)}</strong> • Paid: <strong>{fmtINR(order.receivedAmount)}</strong> • Balance: <strong>{fmtINR(order.balanceAmount)}</strong>
            </Typography>
          </CardContent>
        </Card>

        {/* Timeline List of all 22 Stages */}
        <div className={styles.middlerow}>
          <div className={styles.timelineList}>
            {STAGES.map((s) => {
              const isCompleted = s.num <= order.completedStageNum;
              const isCurrent = s.num === order.completedStageNum;

              return (
                <div key={s.num} className={`${styles.timelineItem} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''}`}>
                  <div className={styles.indicatorCol}>
                    <div className={styles.circle}>
                      {isCompleted ? <CheckCircleIcon sx={{ fontSize: 18 }} /> : <RadioButtonUncheckedIcon sx={{ fontSize: 16 }} />}
                    </div>
                    {s.num < 22 && <div className={styles.line} />}
                  </div>

                  <div className={styles.contentCol}>
                    <Card className={styles.stageCard}>
                      <CardContent sx={{ p: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#1E3A8A' }}>
                            STAGE {s.num} • {s.dept}
                          </Typography>
                          <Chip
                            label={isCompleted ? 'Completed' : 'Pending'}
                            size="small"
                            color={isCompleted ? 'success' : 'default'}
                            sx={{ fontSize: '0.625rem', height: 18, fontWeight: 600 }}
                          />
                        </Box>

                        <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                          {s.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Ref: <strong>{s.ref}</strong>
                          </Typography>
                          <Button
                            size="small"
                            endIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
                            onClick={() => handleJump(s)}
                            sx={{ fontSize: '0.6875rem', py: 0.25, px: 1, minWidth: 0 }}
                          >
                            Jump to Screen
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderJourney;

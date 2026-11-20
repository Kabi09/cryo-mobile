import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Alert,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PaymentsIcon from '@mui/icons-material/Payments';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { fmtINR } from '../../../utils/formatters';
import styles from './AdminFinancialsApprovals.module.scss';

export const AdminFinancialsApprovals = () => {
  const { payments, approvals, order } = useErpStore();
  const [tab, setTab] = useState('approvals');
  const [approvalList, setApprovalList] = useState(approvals);
  const [alertMsg, setAlertMsg] = useState('');

  const handleDecision = (id, status) => {
    setApprovalList(approvalList.map((a) => (a.id === id ? { ...a, status } : a)));
    setAlertMsg(`Approval ${id} has been ${status.toLowerCase()}!`);
    setTimeout(() => setAlertMsg(''), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Financials & Approvals"
              subtitle="Cash Flow, Outstanding Balances & Management Sign-offs"
              showBack
            />
          </div>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, val) => setTab(val)}>
            <Tab label={`Approvals Queue (${approvalList.filter(a => a.status === 'Pending').length})`} value="approvals" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Customer Financials" value="financials" sx={{ textTransform: 'none', fontWeight: 600 }} />
          </Tabs>
        </Box>

        {alertMsg && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {alertMsg}
          </Alert>
        )}

        <div className={styles.middlerow}>
          {tab === 'approvals' && (
            <div className={styles.list}>
              {approvalList.map((apr) => (
                <Card key={apr.id} className={styles.card}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#DC2626' }}>
                          MANAGEMENT APPROVAL • {apr.dept}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {apr.type}
                        </Typography>
                      </Box>
                      <StatusBadge status={apr.status} />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Reference: <strong>{apr.ref}</strong> • Requested by: <strong>{apr.by}</strong>
                    </Typography>

                    {apr.status === 'Pending' ? (
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleDecision(apr.id, 'Approved')}
                          sx={{ flex: 1, fontWeight: 700 }}
                        >
                          Approve Request
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={() => handleDecision(apr.id, 'Rejected')}
                        >
                          Reject
                        </Button>
                      </Box>
                    ) : (
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        Decision logged by Centralized Administrator.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {tab === 'financials' && (
            <div className={styles.list}>
              <Card className={styles.card}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Payment Ledger: Order SO-001 (ABC Laboratory)
                  </Typography>

                  <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">Contract Total:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{fmtINR(order.orderValue)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">Advance Verified:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#16A34A' }}>{fmtINR(order.receivedAmount)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Balance Receivable:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#B45309' }}>{fmtINR(order.balanceAmount)}</Typography>
                    </Box>
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Recorded Payments History</Typography>
                  {payments.map((p) => (
                    <Box key={p.id} sx={{ p: 1.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 1.5, mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{p.id} • {p.type}</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#16A34A' }}>{fmtINR(p.amount)}</Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {p.date} • {p.customer} ({p.mode})
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFinancialsApprovals;

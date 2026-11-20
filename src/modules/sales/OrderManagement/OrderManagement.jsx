import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { fmtINR } from '../../../utils/formatters';
import styles from './OrderManagement.module.scss';

export const OrderManagement = () => {
  const navigate = useNavigate();
  const { salesOrders, order, advanceOrderStage } = useErpStore();
  const [tab, setTab] = useState('so');
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleSendToProduction = () => {
    advanceOrderStage(13);
    setSendSuccess(true);
    setTimeout(() => {
      navigate('/production/dashboard');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Orders & Execution"
              subtitle="Proforma Invoices, Customer PO & Confirmed Sales Orders"
              showBack
            />
          </div>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, val) => setTab(val)}>
            <Tab label="Sales Orders (SO)" value="so" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Proforma Invoices (PI)" value="pi" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Customer POs" value="cpo" sx={{ textTransform: 'none', fontWeight: 600 }} />
          </Tabs>
        </Box>

        {sendSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            SO-001 successfully transferred to Production Department! Loading Production Order PRO-001...
          </Alert>
        )}

        <div className={styles.middlerow}>
          {tab === 'so' && (
            <div className={styles.list}>
              {salesOrders.map((so) => (
                <Card key={so.id} className={styles.card}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#1D4ED8' }}>
                          CONFIRMED SALES ORDER • {so.date}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {so.id} — {so.customer}
                        </Typography>
                      </Box>
                      <StatusBadge status={order.proStatus || so.status} />
                    </Box>

                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      {so.product} ({so.qty} Units)
                    </Typography>

                    <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Total Order Value:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{fmtINR(so.amount)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Advance Received (Verified):</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#16A34A' }}>
                          {fmtINR(order.receivedAmount)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Outstanding Balance:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#B45309' }}>
                          {fmtINR(order.balanceAmount)}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 1 }}>
                        Linked Workflow IDs: Enquiry {order.enqId} ➔ Quotation {order.qtId} ➔ Proforma {order.piId} ➔ CPO {order.cpoId}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PrecisionManufacturingIcon />}
                        onClick={handleSendToProduction}
                        sx={{ flex: 1, minWidth: 200, fontWeight: 700 }}
                      >
                        Send to Production (PRO-001)
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => navigate('/admin/order-journey')}
                      >
                        Track 22-Stage Journey
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {tab === 'pi' && (
            <Card className={styles.card}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#1D4ED8' }}>
                  PROFORMA INVOICE PI-001
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  PI-001 • ABC Laboratory
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Issued Date: 2026-11-16 • Amount: {fmtINR(150000)} • Payment Terms: 66% Advance (₹1,00,000)
                </Typography>
                <StatusBadge status="Verified" />
              </CardContent>
            </Card>
          )}

          {tab === 'cpo' && (
            <Card className={styles.card}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#1D4ED8' }}>
                  CUSTOMER PURCHASE ORDER CPO-001
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  PO-ABC-2026-99 • ABC Laboratory
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Client PO Reference: PO-ABC-2026-99 • Value: {fmtINR(150000)} • Received: 2026-11-16
                </Typography>
                <StatusBadge status="Confirmed" />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;

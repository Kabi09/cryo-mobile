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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import OutputIcon from '@mui/icons-material/Output';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import { fmtINR } from '../../../utils/formatters';
import styles from './SCMPurchaseGRN.module.scss';

export const SCMPurchaseGRN = () => {
  const { purchaseOrders, grns, materialIssues, order, confirmGRN, issueMaterials } = useErpStore();
  const [tab, setTab] = useState('po');
  const [actionNotice, setActionNotice] = useState('');

  const handleConfirmGRN = (grnId) => {
    confirmGRN(grnId);
    setActionNotice(`GRN ${grnId} accepted into stock! Inventory stocks increased.`);
    setTimeout(() => setActionNotice(''), 4000);
  };

  const handleIssue = (mrId, isPartial) => {
    issueMaterials(mrId, isPartial);
    setActionNotice(isPartial ? `Partial issue MI-001 completed. Inventory stock decremented.` : `Full remaining issue completed. Shopfloor received all materials.`);
    setTimeout(() => setActionNotice(''), 4000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Procurement, GRN & Material Issues"
              subtitle="Supplier Purchase Orders, Goods Receipt & Stock Issues"
              showBack
            />
          </div>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, val) => setTab(val)}>
            <Tab label="Purchase Orders" value="po" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Goods Receipt Notes (GRN)" value="grn" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Material Issues (MI)" value="mi" sx={{ textTransform: 'none', fontWeight: 600 }} />
          </Tabs>
        </Box>

        {actionNotice && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {actionNotice}
          </Alert>
        )}

        <div className={styles.middlerow}>
          {tab === 'po' && (
            <div className={styles.list}>
              {purchaseOrders.map((po) => (
                <Card key={po.id} className={styles.card}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#D97706' }}>
                          SUPPLIER PURCHASE ORDER • {po.date}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {po.id} — {po.supplier}
                        </Typography>
                      </Box>
                      <StatusBadge status={po.status} />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      Total PO Value: <strong>{fmtINR(po.amount)}</strong> • Triggered by: {po.mrRef}
                    </Typography>

                    <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.5 }}>
                        ORDERED ITEMS:
                      </Typography>
                      {po.items.map((it) => (
                        <Box key={it.code} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.25 }}>
                          <Typography variant="caption">{it.code} (Qty: {it.qty})</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>{fmtINR(it.qty * it.unitPrice)}</Typography>
                        </Box>
                      ))}
                    </Box>

                    <Typography variant="caption" color="text.secondary" display="block">
                      Note: Purchase Order creation does not increase inventory stock until GRN inspection.
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {tab === 'grn' && (
            <div className={styles.list}>
              {grns.map((g) => (
                <Card key={g.id} className={styles.card}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#16A34A' }}>
                          GOODS RECEIPT NOTE • {g.date}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {g.id} (PO: {g.poRef})
                        </Typography>
                      </Box>
                      <StatusBadge status={g.status} />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      Supplier: {g.supplier}
                    </Typography>

                    <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.5 }}>
                        RECEIVED & INSPECTED ITEMS:
                      </Typography>
                      {g.items.map((it) => (
                        <Box key={it.code} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.25 }}>
                          <Typography variant="caption">{it.code}</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: '#16A34A' }}>
                            Received: {it.received} | Accepted: {it.accepted}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<AssignmentTurnedInIcon />}
                      fullWidth
                      onClick={() => handleConfirmGRN(g.id)}
                    >
                      Confirm GRN & Update Inventory
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {tab === 'mi' && (
            <div className={styles.list}>
              {materialIssues.map((mi) => (
                <Card key={mi.id} className={styles.card}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#D97706' }}>
                        {mi.id} ({mi.type}) • {mi.date}
                      </Typography>
                      <StatusBadge status="Issued to Shopfloor" size="small" />
                    </Box>

                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Target: {mi.mrRef} (Deep Freezer Assembly)
                    </Typography>

                    <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2 }}>
                      {mi.items.map((it) => (
                        <Typography key={it.code} variant="caption" display="block">
                          • {it.code}: {it.qty} Units Issued
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}

              <Box sx={{ mt: 2, display: 'flex', gap: 1.5 }}>
                <Button
                  variant="outlined"
                  onClick={() => handleIssue('MR-001', true)}
                  sx={{ flex: 1 }}
                >
                  Simulate Partial Issue (MI-001)
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleIssue('MR-001', false)}
                  sx={{ flex: 1, fontWeight: 700 }}
                >
                  Simulate Full Issue (MI-002)
                </Button>
              </Box>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SCMPurchaseGRN;

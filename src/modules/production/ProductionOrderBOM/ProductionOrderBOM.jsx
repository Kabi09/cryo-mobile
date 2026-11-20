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
  Divider,
  Alert
} from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import styles from './ProductionOrderBOM.module.scss';

export const ProductionOrderBOM = () => {
  const navigate = useNavigate();
  const { productionOrders, materialRequests, order, advanceOrderStage } = useErpStore();
  const [tab, setTab] = useState('orders');
  const [selectedBOM, setSelectedBOM] = useState(false);
  const [receiptSuccess, setReceiptSuccess] = useState(false);

  const handleConfirmReceipt = () => {
    advanceOrderStage(18);
    setReceiptSuccess(true);
    setTimeout(() => setReceiptSuccess(false), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Orders & Bill of Materials"
              subtitle="Production Orders, BOMs & Supply Chain Requests"
              showBack
            />
          </div>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, val) => setTab(val)}>
            <Tab label="Production Orders" value="orders" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="BOM Master" value="bom" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Material Requests (MR)" value="mr" sx={{ textTransform: 'none', fontWeight: 600 }} />
          </Tabs>
        </Box>

        {receiptSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Material receipt confirmed in shopfloor! All components ready for assembly.
          </Alert>
        )}

        <div className={styles.middlerow}>
          {tab === 'orders' && (
            <div className={styles.list}>
              {productionOrders.map((pro) => (
                <Card key={pro.id} className={styles.card}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#0D9488' }}>
                          PRODUCTION ORDER • {pro.date}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {pro.id} (Ref: {pro.soRef})
                        </Typography>
                      </Box>
                      <StatusBadge status={order.proStatus || pro.status} />
                    </Box>

                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Product: {pro.product} ({pro.qty} Units)
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                      Assigned BOM: {pro.bomRef} • Progress: {order.prodProgress}%
                    </Typography>

                    <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.5 }}>
                        SHOPFLOOR READINESS CHECKLIST:
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        ✓ BOM-001 confirmed by engineering
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        ✓ MR-001 issued to Supply Chain
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        ✓ Partial issue MI-001 received (Compressor + initial steel)
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        ✓ Final issue MI-002 received (Remaining steel + temp controllers)
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/production/production-hub')}
                        sx={{ flex: 1 }}
                      >
                        Open Daily Assembly Progress
                      </Button>
                      <Button variant="outlined" onClick={() => setSelectedBOM(true)}>
                        View BOM Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {tab === 'bom' && (
            <Card className={styles.card}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    BOM-001: Deep Freezer (-80°C)
                  </Typography>
                  <StatusBadge status="Confirmed" />
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                  Standard bill of materials for 2 units production.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Compressor (RM-101)</Typography>
                      <Typography variant="caption" color="text.secondary">1.5 HP Ultra-low cascade</Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>2 Units (Pieces)</Typography>
                  </Box>

                  <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Steel Sheet (RM-102)</Typography>
                      <Typography variant="caption" color="text.secondary">SS 304 1.2mm mirror finish</Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>8 Sheets</Typography>
                  </Box>

                  <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Temperature Controller (RM-103)</Typography>
                      <Typography variant="caption" color="text.secondary">Microprocessor PID (-86°C)</Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>2 Units (Pieces)</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {tab === 'mr' && (
            <div className={styles.list}>
              {materialRequests.map((mr) => (
                <Card key={mr.id} className={styles.card}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {mr.id} (Ref: {mr.proRef})
                      </Typography>
                      <StatusBadge status={order.mrStatus || mr.status} />
                    </Box>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                      Date: {mr.date} • Sent to Supply Chain Department
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      {mr.items.map((item) => (
                        <Box key={item.code} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5, borderBottom: '1px solid #F1F5F9' }}>
                          <Typography variant="body2">{item.name} ({item.code})</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>Req: {item.req} | Issued: {item.issued}</Typography>
                        </Box>
                      ))}
                    </Box>

                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                      fullWidth
                      onClick={handleConfirmReceipt}
                    >
                      Confirm Material Receipt in Shopfloor
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* View BOM Modal */}
        <Dialog open={selectedBOM} onClose={() => setSelectedBOM(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>BOM-001 Technical Inspection</DialogTitle>
          <DialogContent dividers>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>BOM Specification Details</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Product: Deep Freezer (-80°C) • Total Quantity: 2 Units
            </Typography>
            <Typography variant="caption" display="block">1. Compressor (RM-101): 2 Pieces</Typography>
            <Typography variant="caption" display="block">2. SS 304 Steel Sheet (RM-102): 8 Sheets</Typography>
            <Typography variant="caption" display="block">3. Microprocessor Controller (RM-103): 2 Pieces</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedBOM(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductionOrderBOM;

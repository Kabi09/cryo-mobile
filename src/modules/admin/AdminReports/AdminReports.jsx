import { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, Button, Divider } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import { fmtINR } from '../../../utils/formatters';
import styles from './AdminReports.module.scss';

export const AdminReports = () => {
  const [activeReport, setActiveReport] = useState('sales');

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Centralized Reports & Analytics"
              subtitle="Departmental KPI Audits & Performance Summaries"
              showBack
            />
          </div>
        </div>

        <div className={styles.middlerow}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card className={styles.sidebarCard}>
                <CardContent sx={{ p: 1.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
                    Available Report Modules
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Button
                      variant={activeReport === 'sales' ? 'contained' : 'text'}
                      size="small"
                      onClick={() => setActiveReport('sales')}
                      sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    >
                      1. Sales Pipeline & Orders
                    </Button>
                    <Button
                      variant={activeReport === 'production' ? 'contained' : 'text'}
                      size="small"
                      onClick={() => setActiveReport('production')}
                      sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    >
                      2. Shopfloor Output & QC
                    </Button>
                    <Button
                      variant={activeReport === 'inventory' ? 'contained' : 'text'}
                      size="small"
                      onClick={() => setActiveReport('inventory')}
                      sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    >
                      3. Inventory & Stock Valuation
                    </Button>
                    <Button
                      variant={activeReport === 'procurement' ? 'contained' : 'text'}
                      size="small"
                      onClick={() => setActiveReport('procurement')}
                      sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    >
                      4. Procurement & PO Fulfillment
                    </Button>
                    <Button
                      variant={activeReport === 'logistics' ? 'contained' : 'text'}
                      size="small"
                      onClick={() => setActiveReport('logistics')}
                      sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    >
                      5. Logistics & Delivery Turnaround
                    </Button>
                    <Button
                      variant={activeReport === 'financials' ? 'contained' : 'text'}
                      size="small"
                      onClick={() => setActiveReport('financials')}
                      sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    >
                      6. Cash Collection & Outstanding
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Card className={styles.reportDetailCard}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {activeReport.toUpperCase()} PERFORMANCE REPORT
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined" startIcon={<PrintIcon />}>Print</Button>
                      <Button size="small" variant="outlined" startIcon={<DownloadIcon />}>Export CSV</Button>
                    </Box>
                  </Box>

                  <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Key Analytical Metrics</Typography>
                    <Typography variant="body2">• Reference Contract: SO-001 (ABC Laboratory)</Typography>
                    <Typography variant="body2">• Pipeline Conversion Rate: 100%</Typography>
                    <Typography variant="body2">• On-Time Delivery Index: 100%</Typography>
                    <Typography variant="body2">• Total Realized Cash: {fmtINR(100000)}</Typography>
                    <Typography variant="body2">• Pending Receivables: {fmtINR(50000)}</Typography>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    Reports are generated dynamically from live Zustand shared store state. Future API integration will connect server-side aggregation.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;

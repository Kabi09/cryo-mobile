import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
  Box,
  Divider,
  Alert
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { DEPARTMENTS } from '../../../constants/departments';
import styles from './PermissionMatrixRoles.module.scss';

export const PermissionMatrixRoles = () => {
  const [matrix, setMatrix] = useState({
    sales: { view: true, create: true, edit: true, workflow: true },
    production: { view: true, create: false, edit: false, workflow: false },
    'supply-chain': { view: true, create: true, edit: true, workflow: true },
    logistics: { view: true, create: false, edit: false, workflow: false },
    employees: { view: false, create: false, edit: false, workflow: false }
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (deptKey, action) => {
    setMatrix((prev) => ({
      ...prev,
      [deptKey]: {
        ...prev[deptKey],
        [action]: !prev[deptKey][action]
      }
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Access & Permission Matrix"
              subtitle="Granular Screen and Action Rights per Department"
              showBack
            />
          </div>
        </div>

        {saved && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Permission policy matrix updated and propagated across all workspaces!
          </Alert>
        )}

        <div className={styles.middlerow}>
          <Card className={styles.card}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Staff Role: Senior Executive Matrix
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Changes apply immediately to Arun Kumar and other staff assigned to this template.
                  </Typography>
                </Box>
                <StatusBadge status="Enforced" />
              </Box>

              <Box sx={{ overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>View</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Create</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Edit</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Workflow</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.values(DEPARTMENTS).filter((d) => d.key !== 'admin').map((dept) => {
                      const rights = matrix[dept.key] || { view: false, create: false, edit: false, workflow: false };

                      return (
                        <TableRow key={dept.key}>
                          <TableCell sx={{ fontWeight: 600 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: dept.color }} />
                              {dept.name}
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              checked={rights.view}
                              onChange={() => handleToggle(dept.key, 'view')}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              checked={rights.create}
                              onChange={() => handleToggle(dept.key, 'create')}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              checked={rights.edit}
                              onChange={() => handleToggle(dept.key, 'edit')}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              checked={rights.workflow}
                              onChange={() => handleToggle(dept.key, 'workflow')}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button variant="contained" fullWidth onClick={handleSave} sx={{ py: 1.25, fontWeight: 700 }}>
                  Save Permission Matrix Policy
                </Button>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PermissionMatrixRoles;

import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import BadgeIcon from '@mui/icons-material/Badge';
import AddIcon from '@mui/icons-material/Add';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import SummaryCard from '../../../components/common/SummaryCard/SummaryCard';
import { useAuthStore } from '../../../stores/authStore';
import styles from './EmployeeDashboard.module.scss';

export const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { currentPersona } = useAuthStore();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Employee & Permissions"
              subtitle="Staff Directory, Roles & Access Control Matrix"
              showBack
              actions={
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/employees/employees-list')}
                  sx={{ borderRadius: 2 }}
                >
                  Add Employee
                </Button>
              }
            />
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className={styles.middlerow}>
          <div className={styles.metricsGrid}>
            <SummaryCard
              title="Total Staff"
              value="5 Staff"
              subtitle="Priya, Arun, Murugan..."
              icon={PeopleIcon}
              accentColor="#0284C7"
              onClick={() => navigate('/employees/employees-list')}
            />
            <SummaryCard
              title="Departments"
              value="5 Depts"
              subtitle="Sales, Prod, SCM, Log..."
              icon={CorporateFareIcon}
              accentColor="#0369A1"
              onClick={() => navigate('/employees/departments-list')}
            />
            <SummaryCard
              title="Permission Roles"
              value="4 Roles"
              subtitle="Admin, Exec, Mgr, Viewer"
              icon={SecurityIcon}
              accentColor="#0EA5E9"
              onClick={() => navigate('/employees/permissions-hub')}
            />
            <SummaryCard
              title="Login Accounts"
              value="5 Active"
              subtitle="Active credentials"
              icon={BadgeIcon}
              accentColor="#16A34A"
              onClick={() => navigate('/employees/permissions-hub')}
            />
          </div>

          {/* Department Access Overview Card */}
          <Card className={styles.card} sx={{ mt: 2.5 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Unified Access Control Matrix
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Configure department-level and screen-level access rights. Employees only see authorized workspaces.
              </Typography>

              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 1 }}>
                  ACTIVE TEST PERSONAS & POLICIES:
                </Typography>
                <Typography variant="caption" display="block">
                  • <strong>Priya Nair (Admin):</strong> Full access to all 5 departments & centralized admin HQ.
                </Typography>
                <Typography variant="caption" display="block">
                  • <strong>Arun Kumar:</strong> Sales full access + Production view-only (no shopfloor action rights).
                </Typography>
                <Typography variant="caption" display="block">
                  • <strong>Murugan S:</strong> Single department access (Supply Chain & Stores only).
                </Typography>
                <Typography variant="caption" display="block">
                  • <strong>Ramesh Viewer:</strong> Read-only across Sales & Production (all mutations disabled).
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate('/employees/permissions-hub')}
                sx={{ py: 1.25, fontWeight: 700 }}
              >
                Open Full Permission Matrix
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Nav */}
        <div className={styles.bottomrow}>
          <div className={styles.quickAccessRow}>
            <Button variant="outlined" size="small" onClick={() => navigate('/employees/employees-list')}>
              Staff Directory
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigate('/employees/departments-list')}>
              Departments List
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigate('/employees/permissions-hub')}>
              Matrix Hub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

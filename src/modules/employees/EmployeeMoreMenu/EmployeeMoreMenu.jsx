import { useNavigate } from 'react-router-dom';
import { Card, CardContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import SecurityIcon from '@mui/icons-material/Security';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import { useAuthStore } from '../../../stores/authStore';
import styles from './EmployeeMoreMenu.module.scss';

export const EmployeeMoreMenu = () => {
  const navigate = useNavigate();
  const { currentPersona, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader title="Employee More Menu" subtitle="Access control, audit logs & settings" />
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Card className={styles.card}>
              <CardContent sx={{ p: 0 }}>
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/employees/employees-list')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#0284C7' }}>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Staff Directory" secondary="Employee roster and onboarding" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/employees/departments-list')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#0369A1' }}>
                        <CorporateFareIcon />
                      </ListItemIcon>
                      <ListItemText primary="Departments List" secondary="Operational departments setup" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/employees/permissions-hub')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#0EA5E9' }}>
                        <SecurityIcon />
                      </ListItemIcon>
                      <ListItemText primary="Permissions Matrix" secondary="Screen and action-level policies" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/employees/profile')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#64748B' }}>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary="Staff Profile" secondary={currentPersona.name} />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#DC2626' }}>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign Out" secondary="End HR admin session" primaryTypographyProps={{ color: '#DC2626', fontWeight: 600 }} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeMoreMenu;

import { useNavigate } from 'react-router-dom';
import { Card, CardContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import { useAuthStore } from '../../../stores/authStore';
import styles from './ProductionMoreMenu.module.scss';

export const ProductionMoreMenu = () => {
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
            <PageHeader title="Production More Menu" subtitle="Technical masters and shopfloor options" />
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Card className={styles.card}>
              <CardContent sx={{ p: 0 }}>
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/production/orders-hub')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#0D9488' }}>
                        <PrecisionManufacturingIcon />
                      </ListItemIcon>
                      <ListItemText primary="Production Orders & Receipts" secondary="PROs and material receipt tracking" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/production/materials-hub')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#0D9488' }}>
                        <LayersIcon />
                      </ListItemIcon>
                      <ListItemText primary="Bill of Materials (BOM)" secondary="Manage component specifications" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/production/production-hub')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#10B981' }}>
                        <AssignmentTurnedInIcon />
                      </ListItemIcon>
                      <ListItemText primary="Quality Control & Handover" secondary="Inspection sign-off and logistics handover" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/production/notifications')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#D97706' }}>
                        <NotificationsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Notifications" secondary="Material arrival alerts" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/production/profile')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#64748B' }}>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary="User Profile" secondary={currentPersona.name} />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#DC2626' }}>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign Out" secondary="End shopfloor session" primaryTypographyProps={{ color: '#DC2626', fontWeight: 600 }} />
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

export default ProductionMoreMenu;

import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PaymentsIcon from '@mui/icons-material/Payments';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import { useAuthStore } from '../../../stores/authStore';
import styles from './SalesMoreMenu.module.scss';

export const SalesMoreMenu = () => {
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
            <PageHeader title="Sales More Menu" subtitle="Secondary workspaces and account actions" />
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Card className={styles.card}>
              <CardContent sx={{ p: 0 }}>
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/sales/customers')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#1D4ED8' }}>
                        <BusinessIcon />
                      </ListItemIcon>
                      <ListItemText primary="Customer Directory" secondary="Add, view, and manage clients" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/sales/products')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#1D4ED8' }}>
                        <Inventory2Icon />
                      </ListItemIcon>
                      <ListItemText primary="Product Specifications" secondary="Freezers, incubators, pricing" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/sales/payments')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#16A34A' }}>
                        <PaymentsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Payments & Receipts" secondary="Track advance and milestone payments" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/sales/notifications')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#D97706' }}>
                        <NotificationsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Notifications & Alerts" secondary="Live order journey updates" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/sales/profile')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#64748B' }}>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sales Profile" secondary={currentPersona.name} />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#DC2626' }}>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign Out" secondary="End current session" primaryTypographyProps={{ color: '#DC2626', fontWeight: 600 }} />
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

export default SalesMoreMenu;

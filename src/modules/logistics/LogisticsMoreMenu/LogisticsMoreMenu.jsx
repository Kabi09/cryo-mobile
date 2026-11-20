import { useNavigate } from 'react-router-dom';
import { Card, CardContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import PaymentsIcon from '@mui/icons-material/Payments';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import { useAuthStore } from '../../../stores/authStore';
import styles from './LogisticsMoreMenu.module.scss';

export const LogisticsMoreMenu = () => {
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
            <PageHeader title="Logistics More Menu" subtitle="Fleet masters, tracking & transport expenses" />
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Card className={styles.card}>
              <CardContent sx={{ p: 0 }}>
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/logistics/dispatch-hub')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#7C3AED' }}>
                        <DepartureBoardIcon />
                      </ListItemIcon>
                      <ListItemText primary="Delivery Planning & Fleet" secondary="Vehicles, plans and delivery challans" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/logistics/tracking-hub')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#2563EB' }}>
                        <GpsFixedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Live Delivery Tracking" secondary="Active shipments and customer PODs" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/logistics/tracking-hub')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#16A34A' }}>
                        <PaymentsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Customer Payment Collection" secondary="Collect and verify on-delivery balance" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/logistics/notifications')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#D97706' }}>
                        <NotificationsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Notifications" secondary="Dispatch and arrival updates" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/logistics/profile')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#64748B' }}>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logistics Profile" secondary={currentPersona.name} />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#DC2626' }}>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign Out" secondary="End fleet session" primaryTypographyProps={{ color: '#DC2626', fontWeight: 600 }} />
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

export default LogisticsMoreMenu;

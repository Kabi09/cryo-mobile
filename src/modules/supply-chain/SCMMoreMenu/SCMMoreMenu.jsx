import { useNavigate } from 'react-router-dom';
import { Card, CardContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import { useAuthStore } from '../../../stores/authStore';
import styles from './SCMMoreMenu.module.scss';

export const SCMMoreMenu = () => {
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
            <PageHeader title="Supply Chain More Menu" subtitle="Inventory settings and suppliers master" />
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Card className={styles.card}>
              <CardContent sx={{ p: 0 }}>
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/supply-chain/requests-hub')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#D97706' }}>
                        <InventoryIcon />
                      </ListItemIcon>
                      <ListItemText primary="Material Requests Hub" secondary="Pending and issued production MRs" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/supply-chain/inventory-hub')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#D97706' }}>
                        <WarehouseIcon />
                      </ListItemIcon>
                      <ListItemText primary="Inventory & Raw Materials" secondary="Stock balances and alerts" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/supply-chain/purchase-hub')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#2563EB' }}>
                        <ShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Purchase Orders & GRN" secondary="Vendor orders and receipt notes" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/supply-chain/notifications')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#D97706' }}>
                        <NotificationsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Notifications" secondary="Low stock and PO alerts" />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/supply-chain/profile')}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#64748B' }}>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary="Stores Profile" secondary={currentPersona.name} />
                      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon sx={{ minWidth: 40, color: '#DC2626' }}>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign Out" secondary="End warehouse session" primaryTypographyProps={{ color: '#DC2626', fontWeight: 600 }} />
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

export default SCMMoreMenu;

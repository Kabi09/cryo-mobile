import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleIcon from '@mui/icons-material/People';
import ShieldIcon from '@mui/icons-material/Shield';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useAuthStore } from '../../../stores/authStore';
import { DEPARTMENTS } from '../../../constants/departments';
import styles from './DepartmentSwitcher.module.scss';

const ICON_MAP = {
  admin: ShieldIcon,
  sales: StorefrontIcon,
  production: PrecisionManufacturingIcon,
  'supply-chain': InventoryIcon,
  logistics: LocalShippingIcon,
  employees: PeopleIcon
};

export const DepartmentSwitcher = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { currentPersona, activeDept, setActiveDept, canAccessDept } = useAuthStore();

  const handleSelectDept = (deptKey) => {
    setActiveDept(deptKey);
    onClose();
    const dept = DEPARTMENTS[deptKey];
    if (dept) {
      navigate(dept.homeRoute);
    }
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.toprow}>
            <div className={styles.topleft}>
              <Typography variant="h6" className={styles.title}>
                Cryo Enterprise ERP
              </Typography>
              <Typography variant="caption" className={styles.subtitle}>
                Logged in as {currentPersona.name} ({currentPersona.role})
              </Typography>
            </div>
          </div>

          <Divider sx={{ my: 1.5 }} />

          <div className={styles.middlerow}>
            <div className={styles.middlecenter}>
              <Typography variant="caption" sx={{ px: 2, fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
                Authorized Departments
              </Typography>

              <List sx={{ pt: 1 }}>
                {Object.values(DEPARTMENTS).map((dept) => {
                  const isAccessible = canAccessDept(dept.key);
                  const isCurrent = activeDept === dept.key;
                  const IconComp = ICON_MAP[dept.key] || DashboardIcon;

                  return (
                    <ListItem key={dept.key} disablePadding>
                      <ListItemButton
                        disabled={!isAccessible}
                        onClick={() => handleSelectDept(dept.key)}
                        sx={{
                          borderRadius: 2,
                          mx: 1,
                          mb: 0.5,
                          backgroundColor: isCurrent ? dept.lightBg : 'transparent',
                          border: isCurrent ? `1px solid ${dept.borderColor}` : '1px solid transparent'
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36, color: isAccessible ? dept.color : 'text.disabled' }}>
                          <IconComp fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={dept.name}
                          secondary={dept.badgeText}
                          primaryTypographyProps={{
                            variant: 'body2',
                            fontWeight: isCurrent ? 700 : 500,
                            color: isAccessible ? 'text.primary' : 'text.disabled'
                          }}
                          secondaryTypographyProps={{
                            variant: 'caption'
                          }}
                        />
                        {isCurrent && <CheckCircleIcon sx={{ fontSize: 18, color: dept.color }} />}
                        {!isAccessible && <Chip label="Restricted" size="small" sx={{ fontSize: '0.625rem', height: 18 }} />}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>

          <Divider sx={{ my: 1.5 }} />

          <div className={styles.bottomrow}>
            <div className={styles.bottomleft}>
              <Typography variant="caption" color="text.secondary">
                Cryo ERP v2.0 • Phase 3 Mobile-First
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default DepartmentSwitcher;

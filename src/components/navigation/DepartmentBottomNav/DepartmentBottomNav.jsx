import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';

// Material Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import ContactMailIcon from '@mui/icons-material/ContactMail';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import LayersIcon from '@mui/icons-material/Layers';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

import InventoryIcon from '@mui/icons-material/Inventory';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

import { DEPARTMENTS } from '../../../constants/departments';
import styles from './DepartmentBottomNav.module.scss';

const ICON_COMPONENTS = {
  Dashboard: DashboardIcon,
  Business: BusinessIcon,
  Assignment: AssignmentIcon,
  Assessment: AssessmentIcon,
  MoreHoriz: MoreHorizIcon,
  ContactMail: ContactMailIcon,
  Schedule: ScheduleIcon,
  ReceiptLong: ReceiptLongIcon,
  Layers: LayersIcon,
  Engineering: EngineeringIcon,
  PrecisionManufacturing: PrecisionManufacturingIcon,
  Inventory: InventoryIcon,
  Warehouse: WarehouseIcon,
  ShoppingCart: ShoppingCartIcon,
  DepartureBoard: DepartureBoardIcon,
  GpsFixed: GpsFixedIcon,
  LocalShipping: LocalShippingIcon,
  People: PeopleIcon,
  Security: SecurityIcon,
  CorporateFare: CorporateFareIcon
};

export const DepartmentBottomNav = ({ deptKey }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dept = DEPARTMENTS[deptKey] || DEPARTMENTS.admin;
  const navItems = dept.navItems || [];

  // Determine current active tab
  const activeIndex = navItems.findIndex((item) => location.pathname === item.path || (item.id === 'home' && location.pathname.endsWith('/dashboard')));
  const value = activeIndex !== -1 ? activeIndex : 0;

  const handleChange = (_, newValue) => {
    const targetItem = navItems[newValue];
    if (targetItem) {
      navigate(targetItem.path);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Paper elevation={3} className={styles.bottomNavPaper}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={handleChange}
            sx={{
              height: 60,
              backgroundColor: '#FFFFFF',
              '& .Mui-selected': {
                color: dept.color,
                fontWeight: 700
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.6875rem',
                marginTop: '2px'
              }
            }}
          >
            {navItems.map((item) => {
              const IconComp = ICON_COMPONENTS[item.icon] || DashboardIcon;
              return (
                <BottomNavigationAction
                  key={item.id}
                  label={item.label}
                  icon={<IconComp sx={{ fontSize: 22 }} />}
                />
              );
            })}
          </BottomNavigation>
        </Paper>
      </div>
    </div>
  );
};

export default DepartmentBottomNav;

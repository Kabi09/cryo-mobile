import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Menu,
  Badge,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShieldIcon from '@mui/icons-material/Shield';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { useAuthStore } from '../../../stores/authStore';
import { PERSONAS } from '../../../constants/personas';
import { DEPARTMENTS } from '../../../constants/departments';
import DepartmentSwitcher from '../DepartmentSwitcher/DepartmentSwitcher';
import styles from './AppHeader.module.scss';

export const AppHeader = ({ title, showBack = false, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPersona, personaKey, setPersona, activeDept, setActiveDept, logout } = useAuthStore();
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [deptDrawerOpen, setDeptDrawerOpen] = useState(false);

  const deptMeta = DEPARTMENTS[activeDept] || DEPARTMENTS.admin;
  const isViewingAsAdminInDept = currentPersona.isAdmin && activeDept !== 'admin';

  const handlePersonaChange = (e) => {
    const newKey = e.target.value;
    setPersona(newKey);
    const p = PERSONAS[newKey];
    if (p.isAdmin) {
      navigate('/admin/dashboard');
    } else {
      const targetDept = p.depts[0] || 'sales';
      navigate(`/${targetDept}/dashboard`);
    }
  };

  const handleReturnToAdmin = () => {
    setActiveDept('admin');
    navigate('/admin/dashboard');
  };

  return (
    <header className={styles.container}>
      {/* Admin Return Banner when admin is inspecting another department */}
      {isViewingAsAdminInDept && (
        <div className={styles.adminBanner}>
          <div className={styles.adminBannerText}>
            <ShieldIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
            <span>Admin Mode: Viewing {deptMeta.name}</span>
          </div>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleReturnToAdmin}
            sx={{ py: 0.25, px: 1, fontSize: '0.75rem' }}
          >
            Return to Admin Dashboard
          </Button>
        </div>
      )}

      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            {showBack ? (
              <IconButton size="small" onClick={onBack || (() => navigate(-1))} sx={{ mr: 1 }}>
                <ArrowBackIcon />
              </IconButton>
            ) : (
              <IconButton size="small" onClick={() => setDeptDrawerOpen(true)} sx={{ mr: 0.5 }}>
                <MenuIcon />
              </IconButton>
            )}

            <div className={styles.logoBadge} onClick={() => navigate(deptMeta.homeRoute)}>
              <span className={styles.logoSymbol}>C</span>
              <div className={styles.brandMeta}>
                <Typography variant="subtitle2" className={styles.brandTitle}>
                  Cryo ERP
                </Typography>
                <Typography variant="caption" className={styles.deptBadge} sx={{ color: deptMeta.color }}>
                  {title || deptMeta.shortName}
                </Typography>
              </div>
            </div>
          </div>

          <div className={styles.topright}>
            {/* Persona Switcher for Phase 3 interactive test scenarios */}
            <Select
              size="small"
              value={personaKey}
              onChange={handlePersonaChange}
              className={styles.personaSelect}
              sx={{ height: 32, fontSize: '0.75rem', mr: 1, backgroundColor: '#F1F5F9' }}
            >
              <MenuItem value="admin">Priya Nair (Admin)</MenuItem>
              <MenuItem value="multi">Arun (Sales + Prod View)</MenuItem>
              <MenuItem value="single">Murugan (Supply Chain)</MenuItem>
              <MenuItem value="viewonly">Ramesh (View-Only)</MenuItem>
              <MenuItem value="nowf">Kavya (No Workflow)</MenuItem>
            </Select>

            <IconButton size="small" onClick={() => setDeptDrawerOpen(true)} title="Switch Department">
              <SwapHorizIcon fontSize="small" />
            </IconButton>

            <IconButton size="small" onClick={() => navigate(`/${activeDept}/notifications`)}>
              <Badge badgeContent={2} color="error" variant="dot">
                <NotificationsIcon fontSize="small" />
              </Badge>
            </IconButton>

            <IconButton size="small" onClick={(e) => setProfileAnchor(e.currentTarget)}>
              <AccountCircleIcon fontSize="small" />
            </IconButton>

            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={() => setProfileAnchor(null)}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1, minWidth: 180 }}>
                <Typography variant="subtitle2">{currentPersona.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentPersona.role}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  {currentPersona.email}
                </Typography>
              </Box>
              <MenuItem onClick={() => { setProfileAnchor(null); navigate(`/${activeDept}/profile`); }}>
                Profile Settings
              </MenuItem>
              <MenuItem onClick={() => { setProfileAnchor(null); logout(); navigate('/login'); }}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <DepartmentSwitcher open={deptDrawerOpen} onClose={() => setDeptDrawerOpen(false)} />
    </header>
  );
};

export default AppHeader;

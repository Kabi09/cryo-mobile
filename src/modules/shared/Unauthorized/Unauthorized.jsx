import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import { useAuthStore } from '../../../stores/authStore';
import styles from './Unauthorized.module.scss';

export const Unauthorized = () => {
  const navigate = useNavigate();
  const { currentPersona } = useAuthStore();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topcenter}>
            <div className={styles.iconCircle}>
              <BlockIcon sx={{ fontSize: 44, color: '#DC2626' }} />
            </div>
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Card className={styles.card}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                  Access Restricted
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Your current account (<strong>{currentPersona.name}</strong> – {currentPersona.role}) does not have permission to access this department or screen.
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
                  Please contact your administrator to request permissions, or switch test personas using the top bar.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="contained" fullWidth onClick={() => navigate(currentPersona.isAdmin ? '/admin/dashboard' : `/${currentPersona.depts[0] || 'sales'}/dashboard`)}>
                    Go to Authorized Workspace
                  </Button>
                  <Button variant="outlined" fullWidth onClick={() => navigate('/login')}>
                    Sign In with Different Account
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

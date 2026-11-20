import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useAuthStore } from '../../../stores/authStore';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  const navigate = useNavigate();
  const { currentPersona } = useAuthStore();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topcenter}>
            <div className={styles.iconCircle}>
              <SearchOffIcon sx={{ fontSize: 44, color: '#1E3A8A' }} />
            </div>
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Card className={styles.card}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                  Screen Not Found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  The requested page or route does not exist in the Cryo Enterprise ERP suite.
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(currentPersona.isAdmin ? '/admin/dashboard' : `/${currentPersona.depts[0] || 'sales'}/dashboard`)}
                >
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

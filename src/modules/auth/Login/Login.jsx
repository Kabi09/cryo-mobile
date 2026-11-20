import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuthStore } from '../../../stores/authStore';
import { PERSONAS } from '../../../constants/personas';
import styles from './Login.module.scss';

export const Login = () => {
  const navigate = useNavigate();
  const { login, setPersona } = useAuthStore();
  const [email, setEmail] = useState('admin@cryoerp.com');
  const [password, setPassword] = useState('CryoAdmin#2026');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your work email');
      return;
    }
    login(email, password);
    const persona = Object.values(PERSONAS).find((p) => p.email.toLowerCase() === email.toLowerCase()) || PERSONAS.admin;
    if (persona.isAdmin) {
      navigate('/admin/dashboard');
    } else if (persona.depts.length > 1) {
      navigate('/select-department');
    } else {
      navigate(`/${persona.depts[0] || 'sales'}/dashboard`);
    }
  };

  const handleQuickPersona = (key) => {
    const p = PERSONAS[key];
    setEmail(p.email);
    setPersona(key);
    if (p.isAdmin) {
      navigate('/admin/dashboard');
    } else if (p.depts.length > 1) {
      navigate('/select-department');
    } else {
      navigate(`/${p.depts[0] || 'sales'}/dashboard`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topcenter}>
            <div className={styles.brandIcon}>
              <LockOutlinedIcon fontSize="large" sx={{ color: '#FFFFFF' }} />
            </div>
            <Typography variant="h5" component="h1" className={styles.brandTitle}>
              Cryo Enterprise ERP
            </Typography>
            <Typography variant="caption" className={styles.brandSubtitle}>
              Mobile-First Unified Operations Suite
            </Typography>
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Card className={styles.loginCard}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Sign In to Your Workspace
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Phase 3 Development Mode: Select any test persona or login with email.
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      label="Corporate Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. admin@cryoerp.com"
                      autoFocus
                    />
                  </Box>

                  <Box sx={{ mb: 2.5 }}>
                    <TextField
                      type="password"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ py: 1.25, fontWeight: 700, mb: 1.5 }}
                  >
                    Sign In
                  </Button>

                  <Box sx={{ textAlign: 'center', mb: 1.5 }}>
                    <Link to="/forgot-password" className={styles.forgotLink}>
                      Forgot Password?
                    </Link>
                  </Box>
                </form>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    DEMO PERSONAS (QUICK SIGN IN)
                  </Typography>
                </Divider>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleQuickPersona('admin')}
                    sx={{ justifyContent: 'flex-start', textAlign: 'left', textTransform: 'none' }}
                  >
                    <strong>Admin:</strong> Priya Nair (Full Access)
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleQuickPersona('multi')}
                    sx={{ justifyContent: 'flex-start', textAlign: 'left', textTransform: 'none' }}
                  >
                    <strong>Sales:</strong> Arun Kumar (Sales + Prod View)
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleQuickPersona('single')}
                    sx={{ justifyContent: 'flex-start', textAlign: 'left', textTransform: 'none' }}
                  >
                    <strong>Supply Chain:</strong> Murugan S (Warehouse)
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleQuickPersona('viewonly')}
                    sx={{ justifyContent: 'flex-start', textAlign: 'left', textTransform: 'none' }}
                  >
                    <strong>Auditor:</strong> Ramesh Viewer (Read-Only)
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className={styles.bottomrow}>
          <div className={styles.bottomcenter}>
            <Typography variant="caption" color="text.secondary">
              Cryo Enterprise ERP • Approved Design System
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Box, Alert } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import styles from './ForgotPassword.module.scss';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topcenter}>
            <div className={styles.iconCircle}>
              <LockResetIcon fontSize="large" sx={{ color: '#1E3A8A' }} />
            </div>
            <Typography variant="h5" component="h1" className={styles.title}>
              Reset Password
            </Typography>
            <Typography variant="caption" className={styles.subtitle}>
              Enter your work email address to receive password reset instructions.
            </Typography>
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Card className={styles.card}>
              <CardContent>
                {submitted ? (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Password reset instructions have been simulated for <strong>{email}</strong>.
                    </Alert>
                    <Button variant="contained" fullWidth onClick={() => navigate('/login')}>
                      Return to Sign In
                    </Button>
                  </Box>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 2.5 }}>
                      <TextField
                        label="Work Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.name@cryoerp.com"
                        required
                        autoFocus
                      />
                    </Box>

                    <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 1.25, mb: 2 }}>
                      Send Reset Instructions
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                      <Link to="/login" className={styles.backLink}>
                        Back to Sign In
                      </Link>
                    </Box>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className={styles.bottomrow}>
          <div className={styles.bottomcenter}>
            <Typography variant="caption" color="text.secondary">
              Cryo Enterprise ERP • Security & Access Control
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

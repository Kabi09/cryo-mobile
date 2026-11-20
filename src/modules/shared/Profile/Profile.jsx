import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Divider, Alert, Avatar } from '@mui/material';
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import { useAuthStore } from '../../../stores/authStore';
import styles from './Profile.module.scss';

export const Profile = () => {
  const { currentPersona } = useAuthStore();
  const [name, setName] = useState(currentPersona.name);
  const [email, setEmail] = useState(currentPersona.email);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader title="User Profile" subtitle="Account details and security settings" showBack />
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Card className={styles.card}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar sx={{ width: 56, height: 56, bgcolor: '#1E3A8A', fontWeight: 700 }}>
                    {name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {currentPersona.role} • {currentPersona.id}
                    </Typography>
                  </Box>
                </Box>

                {saved && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Profile details updated successfully.
                  </Alert>
                )}

                <form onSubmit={handleSave}>
                  <Box sx={{ mb: 2 }}>
                    <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <TextField label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <TextField label="Assigned Role" value={currentPersona.role} disabled />
                  </Box>

                  <Button type="submit" variant="contained" fullWidth sx={{ py: 1.25, fontWeight: 600 }}>
                    Save Profile Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

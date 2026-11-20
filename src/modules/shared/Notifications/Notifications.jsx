import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, Chip, Box } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import { useErpStore } from '../../../stores/erpStore';
import styles from './Notifications.module.scss';

export const Notifications = () => {
  const { activityLogs } = useErpStore();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Notifications"
              subtitle="Live alerts and cross-department order notifications"
              showBack
            />
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Card className={styles.card}>
              <CardContent sx={{ p: 0 }}>
                <List disablePadding>
                  {activityLogs.map((log, index) => (
                    <div key={log.id || index}>
                      <ListItem sx={{ py: 1.5, px: 2 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <div className={styles.iconCircle}>
                            <NotificationsActiveIcon fontSize="small" sx={{ color: '#1E3A8A' }} />
                          </div>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {log.dept} Department
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {log.time}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" color="text.primary">
                              {log.text}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < activityLogs.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

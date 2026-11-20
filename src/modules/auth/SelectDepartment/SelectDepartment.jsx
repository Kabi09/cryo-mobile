import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { useAuthStore } from '../../../stores/authStore';
import { DEPARTMENTS } from '../../../constants/departments';
import styles from './SelectDepartment.module.scss';

export const SelectDepartment = () => {
  const navigate = useNavigate();
  const { currentPersona, setActiveDept } = useAuthStore();

  const handleSelect = (deptKey) => {
    setActiveDept(deptKey);
    const target = DEPARTMENTS[deptKey];
    if (target) {
      navigate(target.homeRoute);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topcenter}>
            <div className={styles.iconCircle}>
              <BusinessIcon fontSize="large" sx={{ color: '#1E3A8A' }} />
            </div>
            <Typography variant="h5" component="h1" className={styles.title}>
              Select Department
            </Typography>
            <Typography variant="caption" className={styles.subtitle}>
              Welcome back, {currentPersona.name}. Choose which workspace to launch.
            </Typography>
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <div className={styles.deptList}>
              {currentPersona.depts.map((deptKey) => {
                const dept = DEPARTMENTS[deptKey];
                if (!dept) return null;

                return (
                  <Card
                    key={deptKey}
                    className={styles.deptCard}
                    onClick={() => handleSelect(deptKey)}
                    style={{ borderLeft: `5px solid ${dept.color}` }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A' }}>
                        {dept.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {dept.badgeText}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.bottomrow}>
          <div className={styles.bottomcenter}>
            <Button variant="text" size="small" onClick={() => navigate('/login')}>
              Sign Out / Switch Persona
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDepartment;

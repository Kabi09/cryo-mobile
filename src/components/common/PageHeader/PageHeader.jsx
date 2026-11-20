import { useNavigate } from 'react-router-dom';
import { Typography, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './PageHeader.module.scss';

export const PageHeader = ({ title, subtitle, showBack = false, onBack, actions }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            {showBack && (
              <IconButton
                size="small"
                onClick={onBack || (() => navigate(-1))}
                className={styles.backBtn}
                aria-label="go back"
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            )}
            <div className={styles.titleGroup}>
              <Typography variant="h5" component="h1" className={styles.title}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" className={styles.subtitle}>
                  {subtitle}
                </Typography>
              )}
            </div>
          </div>
          {actions && <div className={styles.topright}>{actions}</div>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

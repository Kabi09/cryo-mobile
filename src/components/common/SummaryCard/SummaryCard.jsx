import { Typography } from '@mui/material';
import styles from './SummaryCard.module.scss';

export const SummaryCard = ({
  title,
  value,
  subtitle,
  icon: IconComp,
  accentColor = '#1D4ED8',
  onClick
}) => {
  return (
    <div
      className={`${styles.container} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
    >
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <Typography variant="caption" className={styles.title}>
              {title}
            </Typography>
          </div>
          {IconComp && (
            <div className={styles.topright}>
              <div className={styles.iconCircle} style={{ color: accentColor, backgroundColor: `${accentColor}18` }}>
                <IconComp fontSize="small" />
              </div>
            </div>
          )}
        </div>

        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Typography variant="h5" component="div" className={styles.value} style={{ color: accentColor }}>
              {value}
            </Typography>
          </div>
        </div>

        {subtitle && (
          <div className={styles.bottomrow}>
            <div className={styles.bottomleft}>
              <Typography variant="caption" className={styles.subtitle}>
                {subtitle}
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;

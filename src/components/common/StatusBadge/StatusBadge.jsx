import { getStatusColor } from '../../../utils/formatters';
import styles from './StatusBadge.module.scss';

export const StatusBadge = ({ status, size = 'medium' }) => {
  const color = getStatusColor(status);

  return (
    <span
      className={`${styles.badge} ${styles[size]}`}
      style={{
        backgroundColor: color.bg,
        color: color.text,
        borderColor: color.border
      }}
    >
      <span className={styles.dot} style={{ backgroundColor: color.text }} />
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;

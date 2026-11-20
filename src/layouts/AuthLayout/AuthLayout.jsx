import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';

export const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

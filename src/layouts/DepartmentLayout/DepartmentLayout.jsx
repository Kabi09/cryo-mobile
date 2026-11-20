import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import AppHeader from '../../components/common/AppHeader/AppHeader';
import DepartmentBottomNav from '../../components/navigation/DepartmentBottomNav/DepartmentBottomNav';
import styles from './DepartmentLayout.module.scss';

export const DepartmentLayout = ({ deptKey }) => {
  const { canAccessDept, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!canAccessDept(deptKey)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.wrapper}>
        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Outlet />
          </div>
        </div>
      </main>
      <DepartmentBottomNav deptKey={deptKey} />
    </div>
  );
};

export default DepartmentLayout;

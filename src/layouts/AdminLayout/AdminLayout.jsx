import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import AppHeader from '../../components/common/AppHeader/AppHeader';
import DepartmentBottomNav from '../../components/navigation/DepartmentBottomNav/DepartmentBottomNav';
import styles from './AdminLayout.module.scss';

export const AdminLayout = () => {
  const { currentPersona, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!currentPersona.isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className={styles.container}>
      <AppHeader title="Admin HQ" />
      <main className={styles.wrapper}>
        <div className={styles.middlerow}>
          <div className={styles.middlecenter}>
            <Outlet />
          </div>
        </div>
      </main>
      <DepartmentBottomNav deptKey="admin" />
    </div>
  );
};

export default AdminLayout;

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAdmin } from '@/context/AdminContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAdmin } = useAdmin();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

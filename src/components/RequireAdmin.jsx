import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider.jsx';

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-8 text-center text-white/70">Checking auth…</div>;
  }
  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return children;
}
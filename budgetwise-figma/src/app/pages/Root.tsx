import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';

export function Root() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <Outlet />
    </div>
  );
}

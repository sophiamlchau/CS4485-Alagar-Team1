import { Outlet } from 'react-router';
import { AuthProvider } from '../context/AuthContext';

export function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

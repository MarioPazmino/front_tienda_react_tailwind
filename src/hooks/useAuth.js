import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeJWT } from '../utils/jwt';

export function useAuth() {
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');
  const payload = useMemo(() => decodeJWT(token), [token]);
  const userInfo = useMemo(() => ({
    username: payload?.username || '',
    role: payload?.role || payload?.rol || '',
  }), [payload]);

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  }, [navigate]);

  return { userInfo, logout };
}

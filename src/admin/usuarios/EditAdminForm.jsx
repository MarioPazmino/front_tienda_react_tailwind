import React, { useEffect, useState } from 'react';
import { FiX, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { updateAdmin, fetchAdmins } from '../../services/admin.service';

export default function EditAdminForm({ admin, onClose, onUpdated, showRoleSelector = false, onNotify }) {
  const [username, setUsername] = useState(admin?.username || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(admin?.role || 'admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);

  useEffect(() => {
    setUsername(admin?.username || '');
    setRole(admin?.role || 'admin');
  }, [admin]);

  const checkUsername = async (value) => {
    const name = (value || username || '').trim();
    if (!name || name.toLowerCase() === (admin?.username || '').toLowerCase()) {
      setUsernameTaken(false);
      return;
    }
    setCheckingUsername(true);
    try {
      const data = await fetchAdmins();
      const list = Array.isArray(data) ? data : data.items || [];
      const exists = list.some(a => String(a.username).toLowerCase() === name.toLowerCase());
      setUsernameTaken(!!exists);
    } catch (err) {
      setUsernameTaken(false);
    } finally {
      setCheckingUsername(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const body = {};
  if (username && username !== admin.username) body.username = username;
      if (password) body.password = password;
      if (showRoleSelector && role) body.role = role;
      if (Object.keys(body).length === 0) {
        setError('No hay cambios para guardar');
        setLoading(false);
        return;
      }
      const res = await updateAdmin(admin._id || admin.id, body);
  onNotify && onNotify({ type: 'success', message: 'Administrador actualizado' });
      onUpdated && onUpdated(res);
    } catch (err) {
  const msg = err?.message || 'Error al actualizar';
  setError(msg);
  onNotify && onNotify({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg mx-auto bg-white dark:bg-sidebar-dark rounded-xl shadow-2xl ring-1 ring-black/8 dark:ring-white/6 border border-transparent dark:border-accent/10 overflow-hidden p-5 sm:p-6 transition-transform transform">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary shadow-md ring-1 ring-accent/20">
              <FiUser className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-text-light dark:text-text-dark leading-tight">Editar administrador</h3>
              <p className="text-xs text-gray-400 dark:text-gray-400">Modifica campos del administrador</p>
            </div>
          </div>
          <button type="button" aria-label="Cerrar" onClick={onClose} className="text-gray-400 hover:text-gray-200 dark:text-gray-300 dark:hover:text-white rounded-md p-1"><FiX className="w-5 h-5" /></button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label className="block">
            <div className="text-sm text-gray-400 dark:text-gray-300 mb-2">Usuario</div>
            <div className="relative">
              <input value={username} onChange={(e) => { setUsername(e.target.value); }} onBlur={(e) => checkUsername(e.target.value)} className={`w-full rounded-lg ${usernameTaken ? 'border-2 border-rose-500' : 'border border-transparent dark:border-accent/20'} bg-sidebar-light/90 dark:bg-gray-800/70 px-4 py-2 text-text-light dark:text-gray-100 placeholder-gray-400 focus:outline-none ${usernameTaken ? 'focus:ring-rose-400' : 'focus:ring-accent/50'} shadow-sm`} />
              {checkingUsername && (
                <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.2"/></svg>
                </div>
              )}
            </div>
            {usernameTaken && <p className="mt-2 text-sm text-rose-400">El usuario ya existe</p>}
          </label>

          <label className="block">
            <div className="text-sm text-gray-400 dark:text-gray-300 mb-2">Contraseña (dejar en blanco para no cambiar)</div>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-transparent dark:border-accent/20 bg-sidebar-light/90 dark:bg-gray-800/70 px-4 py-2 pr-10 text-text-light dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-sm" />
              <button type="button" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowPassword(s => !s)} className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-200 dark:text-gray-300">{showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}</button>
            </div>
          </label>

          {showRoleSelector && (
            <label className="block">
              <div className="text-sm text-gray-400 dark:text-gray-300 mb-2">Rol</div>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-full border border-transparent dark:border-accent/20 bg-sidebar-light/90 dark:bg-gray-800/70 text-text-light dark:text-gray-100 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none">
                <option value="admin">admin</option>
                <option value="superadmin">superadmin</option>
              </select>
            </label>
          )}
        </div>

        {error && <div className="mt-3"><p className="text-sm text-rose-400">{error}</p></div>}

        <div className="mt-5 flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-full bg-transparent border-2 border-accent text-accent hover:bg-accent/10 hover:text-primary transition-colors">Cancelar</button>
          <button type="submit" disabled={loading} className="px-4 py-2 rounded-full text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent/60 disabled:opacity-60">{loading ? 'Guardando...' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  );
}

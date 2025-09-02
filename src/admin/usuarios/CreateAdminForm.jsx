import React, { useState } from 'react';
import { FiX, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { createAdmin } from '../../services/admin.service';

export default function CreateAdminForm({ onClose, onCreated, showRoleSelector = true, onNotify }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await createAdmin({ username: username.trim(), password, role });
  // notify parent of success, reset fields and then notify parent created
  onNotify && onNotify({ type: 'success', message: 'Administrador creado correctamente' });
      setUsername('');
      setPassword('');
      setRole('admin');
      setTimeout(() => {
        onCreated && onCreated(res?.admin || null);
        onClose && onClose();
      }, 700);
    } catch (err) {
      const msg = err?.message || 'Error al crear el administrador';
      setError(msg);
  onNotify && onNotify({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <form
        onSubmit={submit}
        className="relative w-full max-w-lg mx-auto bg-white dark:bg-sidebar-dark rounded-xl shadow-2xl ring-1 ring-black/8 dark:ring-white/6 border border-transparent dark:border-accent/10 overflow-hidden p-5 sm:p-6 transition-transform transform"
        onClick={(e) => e.stopPropagation()}
      >

  <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary shadow-md ring-1 ring-accent/20">
              <FiUser className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-text-light dark:text-text-dark leading-tight">Crear administrador</h3>
              <p className="text-xs text-gray-400 dark:text-gray-400">Agrega un nuevo usuario con rol de administrador</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 dark:text-gray-300 dark:hover:text-white rounded-md p-1"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

  {/* notifications are handled by parent via onNotify */}

        <div className="grid grid-cols-1 gap-3">
          <label className="block">
            <div className="text-sm text-gray-400 dark:text-gray-300 mb-2">Usuario</div>
            <input
              className="w-full rounded-lg border border-transparent dark:border-accent/20 bg-sidebar-light/90 dark:bg-gray-800/70 px-4 py-2 text-text-light dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="ej: juan.perez"
              aria-label="Usuario"
            />
          </label>

          <label className="block">
            <div className="text-sm text-gray-400 dark:text-gray-300 mb-2">Contraseña</div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-lg border border-transparent dark:border-accent/20 bg-sidebar-light/90 dark:bg-gray-800/70 px-4 py-2 pr-10 text-text-light dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Contraseña"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-200 dark:text-gray-300"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
          </label>

          {showRoleSelector ? (
            <label className="block">
              <div className="text-sm text-gray-400 dark:text-gray-300 mb-2">Rol</div>
              <div className="relative">
                <select
                  className="w-full rounded-full border border-transparent dark:border-accent/20 bg-sidebar-light/90 dark:bg-gray-800/70 text-text-light dark:text-gray-100 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  aria-label="Rol"
                >
                  <option value="admin">admin</option>
                  <option value="superadmin">superadmin</option>
                </select>
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">▾</span>
              </div>
            </label>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-transparent border-2 border-accent text-accent hover:bg-accent/10 hover:text-primary transition-colors"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-full text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent/60 disabled:opacity-60`}
          >
            {loading ? 'Creando...' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

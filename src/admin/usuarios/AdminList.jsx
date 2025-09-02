import React, { useEffect, useRef, useState } from 'react';
import { fetchAdmins } from '../../services/admin.service';
import CreateAdminForm from './CreateAdminForm';
import { useAuth } from '../../hooks/useAuth';
import {
  FiRefreshCw,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { userInfo } = useAuth();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdmins();
      setAdmins(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      setError(err.message || 'Error al cargar administradores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Helper: next expiration date string
  const getNextExpiry = (list) => {
    if (!Array.isArray(list) || list.length === 0) return null;
    const upcoming = list
      .map(a => a.fechaExpiracion ? new Date(a.fechaExpiracion) : null)
      .filter(Boolean)
      .sort((x, y) => x - y);
    if (!upcoming || upcoming.length === 0) return null;
    const d = upcoming[0];
    return d.toLocaleDateString();
  };

  return (
    <div className="p-4">
  <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <FiUser className="text-2xl text-accent" /> Administradores
        </h2>
        <div className="flex items-center gap-2">
          {(userInfo && (userInfo.role === 'admin' || userInfo.role === 'superadmin')) && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white font-medium shadow hover:scale-105 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Crear administrador"
            >
              <FiUser className="w-5 h-5" />
              <span className="hidden sm:inline">Crear administrador</span>
            </button>
          )}

          <button
            onClick={load}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/95 text-primary font-medium shadow hover:scale-105 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40"
            aria-label="Refrescar administradores"
          >
            <FiRefreshCw className={`w-5 h-5 animate-spin-slow ${loading ? 'opacity-100' : 'opacity-80'}`} />
            <span className="hidden sm:inline">Refrescar</span>
          </button>
        </div>
      </div>

  {showCreateModal && (
    <CreateAdminForm
      showRoleSelector={userInfo && userInfo.role === 'superadmin'}
      onClose={() => setShowCreateModal(false)}
      onCreated={() => {
        setShowCreateModal(false);
        load();
      }}
    />
  )}

  {/* Slider / Highlights */}
  <div className="mt-4 mb-6">
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Resumen</h3>
            <div className="flex gap-2 md:hidden">
              <button
                onClick={() => { sliderRef.current?.scrollBy({ left: -260, behavior: 'smooth' }); }}
                className="p-1.5 rounded-md bg-white/8 dark:bg-white/8 hover:bg-white/12 text-gray-800 dark:text-gray-200"
                aria-label="Anterior"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => { sliderRef.current?.scrollBy({ left: 260, behavior: 'smooth' }); }}
                className="p-1.5 rounded-md bg-white/8 dark:bg-white/8 hover:bg-white/12 text-gray-800 dark:text-gray-200"
                aria-label="Siguiente"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto py-2 px-1 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-4 md:gap-6 md:overflow-visible"
            role="region"
            aria-label="Resumen de administradores"
          >
            <div className="min-w-[220px] w-[220px] snap-center rounded-xl p-4 shadow-md bg-white text-gray-900 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 dark:text-white md:min-w-0 md:w-auto">
              <div className="text-xs uppercase text-gray-500 dark:text-gray-300">Total</div>
              <div className="text-2xl font-bold mt-2">{admins.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Administradores registrados</div>
            </div>
            <div className="min-w-[220px] w-[220px] snap-center rounded-xl p-4 shadow-md bg-white text-gray-900 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 dark:text-white md:min-w-0 md:w-auto">
              <div className="text-xs uppercase text-gray-500 dark:text-gray-300">Activos</div>
              <div className="text-2xl font-bold mt-2">{admins.filter(a => a.activo).length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Cuentas activas</div>
            </div>
            <div className="min-w-[220px] w-[220px] snap-center rounded-xl p-4 shadow-md bg-white text-gray-900 dark:bg-gradient-to-br dark:from-rose-800 dark:to-rose-900 dark:text-white md:min-w-0 md:w-auto">
              <div className="text-xs uppercase text-gray-500 dark:text-gray-300">Inactivos</div>
              <div className="text-2xl font-bold mt-2">{admins.filter(a => !a.activo).length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Cuentas inactivas</div>
            </div>
            <div className="min-w-[220px] w-[220px] snap-center rounded-xl p-4 shadow-md bg-white text-gray-900 dark:bg-gradient-to-br dark:from-amber-800 dark:to-amber-900 dark:text-white md:min-w-0 md:w-auto">
              <div className="text-xs uppercase text-gray-500 dark:text-gray-300">Próxima expiración</div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mt-2">{getNextExpiry(admins) || '-'}</div>
            </div>
          </div>
        </div>
      </div>

  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-800">
        {loading && (
          <div className="flex items-center gap-3 text-gray-500">
            <div className="w-6 h-6 rounded-full border-4 border-accent/30 border-t-accent animate-spin"></div>
            <span>Cargando administradores...</span>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && admins.length === 0 && (
          <div className="py-8 text-center text-gray-500 dark:text-gray-300">
            <FiUser className="mx-auto text-4xl mb-2 text-gray-300" />
            <p>No hay administradores cargados aún.</p>
          </div>
        )}

        {!loading && !error && admins.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead>
                  <tr className="text-left text-sm">
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">Usuario</th>
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">Rol</th>
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">Activo</th>
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">Creado</th>
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">Expira</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-gray-200 dark:divide-gray-800">
                {admins.map((a) => (
                    <tr
                      key={a._id || a.id || a.username}
                      className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-4 py-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-gray-700">
                          <FiUser />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-gray-100">{a.username}</div>
                          <div className="text-xs text-gray-400">{a._id}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{a.role}</td>
                      <td className="px-4 py-3">
                        {a.activo ? (
                          <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 px-2 py-1 rounded-full text-sm">
                            <FiCheckCircle className="text-green-600 dark:text-green-300" /> Activo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 px-2 py-1 rounded-full text-sm">
                            <FiXCircle className="text-rose-600 dark:text-rose-300" /> Inactivo
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{a.createdAt ? new Date(a.createdAt).toLocaleString() : '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{a.fechaExpiracion ? new Date(a.fechaExpiracion).toLocaleString() : '-'}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminList;

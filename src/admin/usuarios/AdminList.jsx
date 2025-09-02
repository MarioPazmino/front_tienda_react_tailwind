import React, { useEffect, useState } from 'react';
import { fetchAdmins } from '../../services/admin.service';
import { FiRefreshCw, FiUser, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <FiUser className="text-2xl text-accent" /> Administradores
        </h2>
        <div className="flex items-center gap-2">
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

      <div className="bg-white dark:bg-bg-dark rounded-lg shadow p-4">
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
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="text-left text-sm text-gray-600 dark:text-gray-300">
                  <th className="px-4 py-3">Usuario</th>
                  <th className="px-4 py-3">Rol</th>
                  <th className="px-4 py-3">Activo</th>
                  <th className="px-4 py-3">Creado</th>
                  <th className="px-4 py-3">Expira</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-bg-dark divide-y divide-gray-100 dark:divide-gray-800">
                {admins.map((a) => (
                  <tr
                    key={a._id || a.id || a.username}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900 transform hover:scale-[1.001] transition-all duration-150"
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
                        <FiUser />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-100">{a.username}</div>
                        <div className="text-xs text-gray-400">{a._id}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{a.role}</td>
                    <td className="px-4 py-3">
                      {a.activo ? (
                        <span className="inline-flex items-center gap-2 text-green-600">
                          <FiCheckCircle /> Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-red-500">
                          <FiXCircle /> Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{a.createdAt ? new Date(a.createdAt).toLocaleString() : '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{a.fechaExpiracion ? new Date(a.fechaExpiracion).toLocaleString() : '-'}</td>
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

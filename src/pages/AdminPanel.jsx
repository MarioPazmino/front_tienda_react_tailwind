import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import { useAuth } from '../hooks/useAuth';
import { FiGrid, FiBox, FiUsers, FiMessageSquare, FiLogOut, FiMenu } from 'react-icons/fi';

const AdminPanel = () => {
  const [showNotif, setShowNotif] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expNotif, setExpNotif] = useState(false);
  const { userInfo, logout } = useAuth();
  // Ya no se maneja token ni payload aquí, todo va por useAuth

  useEffect(() => {
    if (showNotif) {
      const timer = setTimeout(() => setShowNotif(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showNotif]);

  // Notificación de expiración de sesión y cierre automático
  useEffect(() => {
    if (!userInfo || !userInfo.exp) return;
    const now = Date.now();
    const expMs = userInfo.exp * 1000;
    const msTo15min = expMs - now - 15 * 60 * 1000;
    const msToExp = expMs - now;
    let timer15 = null;
    let timerExp = null;
    if (msTo15min > 0) {
      timer15 = setTimeout(() => setExpNotif(true), msTo15min);
    } else if (expMs > now) {
      setExpNotif(true);
    }
    if (msToExp > 0) {
      timerExp = setTimeout(() => {
        logout();
      }, msToExp);
    } else {
      // Si ya expiró
      logout();
    }
    return () => {
      if (timer15) clearTimeout(timer15);
      if (timerExp) clearTimeout(timerExp);
    };
  }, [userInfo, logout]);

  return (
    <div className="flex h-screen transition-colors duration-300 bg-bg-light dark:bg-bg-dark">
      {/* Sidebar móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-accent p-2 rounded-full shadow-lg focus:outline-none text-primary"
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menú"
      >
        <FiMenu className="text-2xl" />
      </button>
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-sidebar-light dark:bg-sidebar-dark text-text-light dark:text-text-dark border-r-2 border-accent shadow-lg p-6 flex flex-col justify-between z-40 transition-transform duration-300 ease-in-out transition-colors
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow">
              <span className="text-2xl text-primary font-black">A</span>
            </div>
            <span className="text-xl font-bold text-text-light dark:text-text-dark">Admin</span>
          </div>
          <nav className="flex flex-col gap-2">
            <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-text-light dark:text-text-dark hover:bg-accent/10 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accent transition-colors text-left">
              <FiGrid /> Dashboard
            </button>
            <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-text-light dark:text-text-dark hover:bg-accent/10 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accent transition-colors text-left">
              <FiBox /> Productos
            </button>
            <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-[#222] dark:text-white hover:bg-accent/10 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accent transition-colors text-left">
              <FiUsers /> Usuarios
            </button>
            <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-[#222] dark:text-white hover:bg-accent/10 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accent transition-colors text-left">
              <FiMessageSquare /> Comentarios
            </button>
          </nav>
        </div>
        <div className="mt-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg mb-2">
              {userInfo.username ? (
                <span className="text-2xl text-primary font-black">
                  {userInfo.username.charAt(0).toUpperCase()}
                </span>
              ) : null}
            </div>
            <span className="font-bold text-text-light dark:text-text-dark text-base truncate max-w-[120px] text-center">
              {userInfo.username ? userInfo.username : <span className="italic text-gray-400">No disponible</span>}
            </span>
            <span className="mt-1 px-3 py-1 rounded-full bg-accent/30 text-accent text-xs font-extrabold uppercase tracking-widest shadow-sm max-w-[120px] text-center">
              {userInfo.role ? userInfo.role : <span className="italic text-gray-400">No disponible</span>}
            </span>
          </div>
          <div className="border-t border-accent my-3 w-full" />
          <button
            type="button"
            className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-[#222] dark:text-white hover:bg-red-400/20 hover:text-red-400 transition-colors mt-2 text-left w-full"
            onClick={() => {
              logout();
            }}
          >
            <FiLogOut /> Salir
          </button>
        </div>
        {/* Botón cerrar sidebar móvil */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-lime-500 text-2xl"
          onClick={() => setSidebarOpen(false)}
          aria-label="Cerrar menú"
        >
          ×
        </button>
      </aside>
      {/* Overlay para cerrar sidebar en móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main content */}
  <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
        <Notification
          type="success"
          message={showNotif ? '¡Ingreso exitoso al panel de administración!' : ''}
          onClose={() => setShowNotif(false)}
        />
        <Notification
          type="warning"
          message={expNotif ? 'Tu sesión de administrador expirará en 15 minutos.' : ''}
          onClose={() => setExpNotif(false)}
        />
  <h1 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">Panel de Administración</h1>
        {/* CRUD de productos, usuarios, etc. */}
      </main>
    </div>
  );
};

export default AdminPanel;

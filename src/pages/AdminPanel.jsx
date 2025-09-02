import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import { decodeJWT } from '../utils/jwt';
import { FiGrid, FiBox, FiUsers, FiMessageSquare, FiLogOut, FiMenu } from 'react-icons/fi';


const AdminPanel = () => {
  const [showNotif, setShowNotif] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expNotif, setExpNotif] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showNotif) {
      const timer = setTimeout(() => setShowNotif(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showNotif]);

  // Notificación de expiración de sesión y cierre automático
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const payload = decodeJWT(token);
    if (payload && payload.exp) {
      const expMs = payload.exp * 1000;
      const now = Date.now();
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
          localStorage.removeItem('admin_token');
          window.location.href = '/admin/login';
        }, msToExp);
      } else {
        // Si ya expiró
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
      }
      return () => {
        if (timer15) clearTimeout(timer15);
        if (timerExp) clearTimeout(timerExp);
      };
    }
  }, []);

  return (
  <div className="flex h-screen transition-colors duration-300">
      {/* Sidebar móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-lime-400 p-2 rounded-full shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menú"
      >
        <FiMenu className="text-[#010221] text-2xl" />
      </button>
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-sidebar-light dark:bg-sidebar-dark text-[#222] dark:text-white border-r-2 border-accent shadow-lg p-6 flex flex-col justify-between z-40 transition-transform duration-300 ease-in-out transition-colors
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow">
              <span className="text-2xl text-primary font-black">A</span>
            </div>
            <span className="text-xl font-bold text-[#222] dark:text-white">Admin</span>
          </div>
          <nav className="flex flex-col gap-2">
            <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-[#222] dark:text-white hover:bg-accent/10 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accent transition-colors text-left">
              <FiGrid /> Dashboard
            </button>
            <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-[#222] dark:text-white hover:bg-accent/10 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accent transition-colors text-left">
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
        <div>
          <div className="border-t border-accent my-3" />
          <button
            type="button"
            className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-[#222] dark:text-white hover:bg-red-400/20 hover:text-red-400 transition-colors mt-2 text-left w-full"
            onClick={() => {
              localStorage.removeItem('admin_token');
              navigate('/admin');
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
  <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-light transition-colors duration-300">
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
  <h1 className="text-2xl font-bold mb-4 text-[#222] dark:text-white">Panel de Administración</h1>
        {/* CRUD de productos, usuarios, etc. */}
      </main>
    </div>
  );
};

export default AdminPanel;

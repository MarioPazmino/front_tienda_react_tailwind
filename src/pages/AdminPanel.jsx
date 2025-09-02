import React, { useEffect, useState } from 'react';
import Notification from '../components/Notification';
import { FiGrid, FiBox, FiUsers, FiMessageSquare, FiLogOut, FiMenu } from 'react-icons/fi';


const AdminPanel = () => {
  const [showNotif, setShowNotif] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (showNotif) {
      const timer = setTimeout(() => setShowNotif(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showNotif]);

  return (
  <div className="flex h-screen bg-gradient-to-br from-[#010221] to-[#1a1a40]">
      {/* Sidebar móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-lime-400 p-2 rounded-full shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menú"
      >
        <FiMenu className="text-[#010221] text-2xl" />
      </button>
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-[#10112a] border-r-2 border-lime-400 shadow-lg p-6 flex flex-col justify-between z-40 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center shadow">
              <span className="text-2xl text-[#010221] font-black">A</span>
            </div>
            <span className="text-xl font-bold text-white">Admin</span>
          </div>
          <nav className="flex flex-col gap-2">
            <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-white hover:bg-lime-400/20 hover:text-lime-300 transition-colors text-left">
              <FiGrid /> Dashboard
            </button>
            <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-white hover:bg-lime-400/20 hover:text-lime-300 transition-colors text-left">
              <FiBox /> Productos
            </button>
            <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-white hover:bg-lime-400/20 hover:text-lime-300 transition-colors text-left">
              <FiUsers /> Usuarios
            </button>
            <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-white hover:bg-lime-400/20 hover:text-lime-300 transition-colors text-left">
              <FiMessageSquare /> Comentarios
            </button>
          </nav>
        </div>
        <div>
          <div className="border-t border-lime-400 my-3" />
          <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-white hover:bg-red-400/20 hover:text-red-300 transition-colors mt-2 text-left w-full">
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
  <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <Notification
          type="success"
          message={showNotif ? '¡Ingreso exitoso al panel de administración!' : ''}
          onClose={() => setShowNotif(false)}
        />
        <h1 className="text-2xl font-bold mb-4 text-white">Panel de Administración</h1>
        {/* CRUD de productos, usuarios, etc. */}
      </main>
    </div>
  );
};

export default AdminPanel;

import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import { useAuth } from '../hooks/useAuth';
import { FiGrid, FiBox, FiUsers, FiMessageSquare, FiLogOut, FiMenu } from 'react-icons/fi';
import { AdminList } from '../admin/usuarios';

const AdminPanel = () => {
  const [showNotif, setShowNotif] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true); // true = abierto, false = colapsado
  const [expNotif, setExpNotif] = useState(false);
  const [view, setView] = useState('dashboard'); // dashboard | admins | productos | comentarios
  // Estado y datos del menú móvil
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const mobileNav = [
    { icon: FiGrid, label: 'Panel' },
    { icon: FiBox, label: 'Productos' },
    { icon: FiUsers, label: 'Usuarios' },
    { icon: FiMessageSquare, label: 'Comentarios' },
    { icon: FiLogOut, label: 'Salir', isLogout: true },
  ];
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
  {/* Botón para abrir/cerrar sidebar, ahora DENTRO del sidebar y bien separado del avatar */}
      {/* Sidebar solo visible en desktop/tablet */}
      <aside
        className={`hidden custom775:flex fixed md:static inset-y-0 left-0 ${sidebarOpen ? 'w-64' : 'w-20'} bg-sidebar-light dark:bg-sidebar-dark text-text-light dark:text-text-dark border-r-2 border-accent shadow-lg flex-col justify-between z-40 transition-all duration-300 ease-in-out transition-colors p-2 md:p-6`}
      >
        {/* Botón hamburguesa: alineado a la izquierda cuando abierto, centrado cuando cerrado */}
        <div className={`flex ${sidebarOpen ? 'justify-start pl-2' : 'justify-center'} items-center ${sidebarOpen ? 'mt-2 mb-2' : 'mt-4 mb-2'}`}>
          <button
            className={`bg-accent p-2 rounded-full shadow-lg focus:outline-none text-primary transition-all duration-300 flex items-center justify-center`}
            style={{ width: '36px', height: '36px' }}
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <FiMenu className="text-xl" />
          </button>
        </div>
        <div>
          {/* Header avatar/label, debajo del botón menú, bien separado */}
          <div className={`flex flex-col items-center ${sidebarOpen ? 'mb-6 mt-3' : 'mb-3 mt-3'}`}>
            <div className={`w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg ${!sidebarOpen ? 'w-8 h-8' : ''}`}>
              <span className={`text-xl text-primary font-black ${!sidebarOpen ? 'text-lg' : ''}`}>A</span>
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold text-text-light dark:text-text-dark tracking-wide mt-2">Admin</span>
            )}
          </div>
          <nav className={`flex flex-col gap-2 ${sidebarOpen ? 'mb-8 md:mb-10' : 'mb-16 mt-8'}`}>
            <button type="button" onClick={() => setView('dashboard')} className={`flex items-center ${sidebarOpen ? 'gap-3 px-3 py-2' : 'justify-center py-4'} rounded-lg font-semibold text-text-light dark:text-text-dark hover:bg-accent/20 dark:hover:bg-accent/30 hover:text-accent dark:hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/60 transition-all text-left group`}>
              <FiGrid className={`transition-transform ${sidebarOpen ? 'text-xl group-hover:scale-110 group-focus:scale-110' : 'text-2xl'}`} />
              {sidebarOpen && 'Dashboard'}
            </button>
            <button type="button" onClick={() => setView('productos')} className={`flex items-center ${sidebarOpen ? 'gap-3 px-3 py-2' : 'justify-center py-4'} rounded-lg font-semibold text-text-light dark:text-text-dark hover:bg-accent/20 dark:hover:bg-accent/30 hover:text-accent dark:hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/60 transition-all text-left group`}>
              <FiBox className={`transition-transform ${sidebarOpen ? 'text-xl group-hover:scale-110 group-focus:scale-110' : 'text-2xl'}`} />
              {sidebarOpen && 'Productos'}
            </button>
            <button type="button" onClick={() => setView('admins')} className={`flex items-center ${sidebarOpen ? 'gap-3 px-3 py-2' : 'justify-center py-4'} rounded-lg font-semibold text-text-light dark:text-text-dark hover:bg-accent/20 dark:hover:bg-accent/30 hover:text-accent dark:hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/60 transition-all text-left group`}>
              <FiUsers className={`transition-transform ${sidebarOpen ? 'text-xl group-hover:scale-110 group-focus:scale-110' : 'text-2xl'}`} />
              {sidebarOpen && 'Usuarios'}
            </button>
            <button type="button" onClick={() => setView('comentarios')} className={`flex items-center ${sidebarOpen ? 'gap-3 px-3 py-2' : 'justify-center py-4'} rounded-lg font-semibold text-text-light dark:text-text-dark hover:bg-accent/20 dark:hover:bg-accent/30 hover:text-accent dark:hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/60 transition-all text-left group`}>
              <FiMessageSquare className={`transition-transform ${sidebarOpen ? 'text-xl group-hover:scale-110 group-focus:scale-110' : 'text-2xl'}`} />
              {sidebarOpen && 'Comentarios'}
            </button>
          </nav>
        </div>
        <div className="mt-auto w-full flex flex-col items-center">
          {/* Bloque usuario/rol: solo avatar en colapsado, completo en abierto, más compacto */}
          <div className="w-full flex flex-col items-center mb-2">
            {sidebarOpen ? (
              <div className="w-full bg-sidebar-light dark:bg-sidebar-dark border-2 border-accent rounded-xl shadow-lg flex flex-col items-center py-3 px-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg mb-1">
                  {userInfo.username ? (
                    <span className="text-xl text-primary font-black">
                      {userInfo.username.charAt(0).toUpperCase()}
                    </span>
                  ) : null}
                </div>
                <span className="font-bold text-text-light dark:text-text-dark text-sm truncate max-w-[100px] text-center">
                  {userInfo.username ? userInfo.username : <span className="italic text-gray-400">No disponible</span>}
                </span>
                <span className="mt-1 px-2 py-0.5 rounded-full bg-accent/30 text-accent text-[11px] font-extrabold uppercase tracking-widest shadow-sm max-w-[100px] text-center">
                  {userInfo.role ? userInfo.role : <span className="italic text-gray-400">No disponible</span>}
                </span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg mb-1">
                {userInfo.username ? (
                  <span className="text-lg text-primary font-black">
                    {userInfo.username.charAt(0).toUpperCase()}
                  </span>
                ) : null}
              </div>
            )}
          </div>
          <div className="border-t border-accent my-2 w-full" />
          <button
            type="button"
            className={`flex items-center ${sidebarOpen ? 'gap-3 px-3 py-2' : 'justify-center py-3'} rounded-lg font-semibold text-[#222] dark:text-white hover:bg-red-400/20 hover:text-red-400 transition-colors mt-1 text-left w-full`}
            onClick={() => {
              logout();
            }}
          >
            <FiLogOut />
            {sidebarOpen && 'Salir'}
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
  {/* Menú inferior tipo mobile nav bar solo en móvil */}
      {/* Menú inferior tipo mobile nav bar solo en móvil */}
  <nav className="custom775:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar-light dark:bg-sidebar-dark border-t-2 border-accent flex justify-around items-center h-16 shadow-2xl backdrop-blur-md">
        {mobileNav.map(({ icon: Icon, label, isLogout }, idx) => (
          <button
            key={label}
            className={`flex flex-col items-center justify-center focus:outline-none transition-transform duration-200 active:scale-90 group ${isLogout ? 'text-red-500 dark:text-red-400' : 'text-text-light dark:text-text-dark'}`}
            style={{ minWidth: 56 }}
            aria-label={label}
            onClick={() => {
              if (isLogout) { logout(); return; }
              if (label === 'Panel') setView('dashboard');
              else if (label === 'Productos') setView('productos');
              else if (label === 'Usuarios') setView('admins');
              else if (label === 'Comentarios') setView('comentarios');
              setActiveMobileIdx(idx);
            }}
          >
            <span className="relative flex items-center justify-center">
              <Icon
                className={`text-2xl transition-colors duration-200
                  ${isLogout
                    ? 'group-hover:text-red-600 group-active:text-red-700'
                    : idx === activeMobileIdx
                      ? 'text-accent dark:text-accent'
                      : 'group-hover:text-accent group-active:text-accent'}
                `}
              />
              {/* Efecto de burbuja animada al presionar */}
              <span className={`absolute inset-0 rounded-full ${isLogout ? 'bg-red-500' : 'bg-accent'} opacity-0 scale-75 group-active:opacity-20 group-active:scale-100 transition-all duration-200 pointer-events-none`} />
            </span>
            <span className={`text-xs mt-1 select-none hidden xs:block
              ${isLogout ? 'text-red-400 dark:text-red-300' : idx === activeMobileIdx ? 'text-accent dark:text-accent' : 'text-gray-400 dark:text-gray-500'}`}>{label}</span>
          </button>
        ))}
      </nav>
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
        {view === 'dashboard' && (
          <h1 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">Panel de Administración</h1>
        )}
        {view === 'admins' && <AdminList />}
        {/* Aquí puedes agregar más vistas según el valor de view */}
      </main>
    </div>
  );
};

export default AdminPanel;

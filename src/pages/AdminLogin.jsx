

import React, { useState } from 'react';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../utils/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor ingresa tu usuario y contraseña.');
      return;
    }
    setError('');
    setLoading(true);
    try {
  const data = await loginAdmin(username, password);
      if (data.token) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/panel');
      } else {
        setError('Respuesta inesperada del servidor.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#010221] to-[#1a1a40] px-2">
      {/* Notificación flotante reutilizable */}
      <Notification
        type="error"
        message={error}
        onClose={() => setError('')}
      />
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl px-6 sm:px-10 py-8 sm:py-12 flex flex-col gap-7 border-2 border-lime-400"
        >
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="w-16 h-16 rounded-full bg-lime-400 flex items-center justify-center shadow-lg mb-1">
              <span className="text-3xl text-[#010221] font-black">A</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-[#010221]">Panel Administrador</h1>
            <p className="text-center text-gray-500 text-sm sm:text-base">Acceso exclusivo para administradores</p>
          </div>
          {/* El error ahora se muestra como notificación flotante */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-semibold text-[#010221]">Usuario</label>
            <input
              id="username"
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400 text-base"
              placeholder="superadmin"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-[#010221]">Contraseña</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-lime-400 pr-10 text-base"
                placeholder="********"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lime-500 text-lg"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
                aria-label="Mostrar/Ocultar contraseña"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-lime-400 text-[#010221] font-bold py-2 rounded-full shadow hover:bg-lime-300 transition-all text-lg mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

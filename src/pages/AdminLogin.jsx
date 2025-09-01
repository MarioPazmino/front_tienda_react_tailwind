

import React, { useState } from 'react';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#000024] to-[#1a1a40]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl px-8 py-10 w-full max-w-md flex flex-col gap-6 border border-lime-400"
      >
        <h1 className="text-3xl font-extrabold text-center text-[#000024] mb-2">Panel Administrador</h1>
        <p className="text-center text-gray-500 mb-2">Acceso exclusivo para administradores</p>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold text-[#000024]">Usuario</label>
          <input
            id="username"
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            placeholder="superadmin"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold text-[#000024]">Contraseña</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-lime-400 pr-10"
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
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-lime-400 text-[#000024] font-bold py-2 rounded-full shadow hover:bg-lime-300 transition-all text-lg mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

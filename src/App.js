import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import './App.css';
import './index.css'; // Asegura que Tailwind esté cargado

// Componente de ruta protegida para admin
function PrivateRoute({ children }) {
  const token = localStorage.getItem('admin_token');
  return token ? children : <Navigate to="/admin/login" replace />;
}

// Botón para alternar dark/light mode
function DarkModeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);
  return (
    <button
      className="fixed bottom-6 right-6 z-50 bg-accent text-primary font-bold p-3 rounded-full shadow-lg border-2 border-primary hover:bg-accent-dark transition-colors"
      onClick={() => setDark(d => !d)}
      aria-label="Alternar modo claro/oscuro"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}
function App() {
  // Simulación de productos para ejemplo
  const products = [
    { id: 1, name: 'Producto 1', description: 'Descripción 1', price: 10 },
    { id: 2, name: 'Producto 2', description: 'Descripción 2', price: 20 },
  ];

  return (
    <Router>
      <DarkModeToggle />
      <Routes>
        {/* Rutas públicas con Navbar y Footer */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/productos" element={<Products products={products} />} />
                  <Route path="/producto/:id" element={<ProductDetail product={products[0]} />} />
                  <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
        {/* Rutas admin sin Navbar ni Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/panel" element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

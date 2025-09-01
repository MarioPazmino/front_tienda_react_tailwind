import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import './App.css';
import './index.css'; // Asegura que Tailwind esté cargado

function App() {
  // Simulación de productos para ejemplo
  const products = [
    { id: 1, name: 'Producto 1', description: 'Descripción 1', price: 10 },
    { id: 2, name: 'Producto 2', description: 'Descripción 2', price: 20 },
  ];

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products products={products} />} />
            <Route path="/producto/:id" element={<ProductDetail product={products[0]} />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/panel" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;




import React, { useState } from 'react';
import './Navbar.css';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-[#000024] text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow relative">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-xl z-20">
        <span className="text-lime-400">&#9679;</span>
        <span className="text-lime-400">Pronei</span>
      </div>
      {/* Links */}
      <div
        className={`flex-1 sm:flex sm:justify-center sm:items-center ${menuOpen ? 'block absolute top-full left-0 w-full bg-[#000024] py-4 z-10' : 'hidden'} sm:static sm:w-auto sm:bg-transparent sm:py-0`}
      >
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-base font-medium items-center">
          <li className="text-white cursor-pointer">Home</li>
          <li className="text-white cursor-pointer">About Us</li>
          <li className="text-white cursor-pointer">Pages</li>
          <li className="text-white cursor-pointer">Project</li>
          <li className="text-white cursor-pointer">Services</li>
          <li className="text-white cursor-pointer">Blog</li>
        </ul>
      </div>
      {/* Botón y Hamburguesa a la derecha */}
      <div className="flex items-center gap-2 z-20">
        <button className="bg-lime-400 text-[#00001E] font-bold px-6 py-3 rounded-full shadow relative overflow-hidden animated-eye group transition-all">
          <span className="relative z-10">Ver Tienda ↗</span>
          <span className="eye-effect absolute inset-0 z-0"></span>
        </button>
        {/* Hamburger */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className={`block h-0.5 w-6 bg-white mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-white mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
      {/* Fondo oscuro al abrir menú */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 sm:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;

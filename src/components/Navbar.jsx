


import React, { useState } from 'react';
import './Navbar.css';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
  <nav className="bg-primary dark:bg-bg-dark text-text-light dark:text-text-dark px-4 sm:px-8 py-3 flex items-center justify-between shadow relative transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-xl z-20">
        <span className="text-accent">&#9679;</span>
        <span className="text-accent">Pronei</span>
      </div>
      {/* Links */}
      <div
  className={`flex-1 md750:flex md750:justify-center md750:items-center ${menuOpen ? 'block absolute top-full left-0 w-full bg-primary dark:bg-bg-dark py-4 z-10' : 'hidden'} md750:static md750:w-auto md750:bg-transparent md750:py-0 transition-colors duration-300`}
      >
        <ul className="flex flex-col md750:flex-row gap-4 md750:gap-8 text-base font-medium items-center">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About Us</li>
          <li className="cursor-pointer">Pages</li>
          <li className="cursor-pointer">Project</li>
          <li className="cursor-pointer">Services</li>
          <li className="cursor-pointer">Blog</li>
        </ul>
      </div>
      {/* Botón y Hamburguesa a la derecha */}
      <div className="flex items-center gap-1 md750:gap-2 z-20">
        <button className="bg-accent text-primary font-bold px-4 py-2 md750:px-6 md750:py-3 rounded-full shadow relative overflow-hidden animated-eye group transition-all text-base md750:text-lg">
          <span className="relative z-10">Ver Tienda ↗</span>
          <span className="eye-effect absolute inset-0 z-0"></span>
        </button>
        {/* Hamburger */}
        <button
          className="md750:hidden flex flex-col justify-center items-center w-9 h-9 ml-1"
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


import React from 'react';
import './Navbar.css';

const Navbar = () => (
  <nav className="bg-[#000024] text-white px-8 py-3 flex items-center justify-between shadow">
    {/* Logo */}
    <div className="flex items-center gap-2 font-bold text-xl">
      <span className="text-lime-400">&#9679;</span>
      <span className="text-lime-400">Pronei</span>
    </div>
    {/* Links */}
    <div className="flex-1 flex justify-center">
      <ul className="flex gap-8 text-base font-medium">
  <li className="text-white cursor-pointer">Home</li>
  <li className="text-white cursor-pointer">About Us</li>
  <li className="text-white cursor-pointer">Pages</li>
  <li className="text-white cursor-pointer">Project</li>
  <li className="text-white cursor-pointer">Services</li>
  <li className="text-white cursor-pointer">Blog</li>
      </ul>
    </div>
    {/* Botón */}
    <div>
  <button className="bg-lime-400 text-[#00001E] font-bold px-6 py-3 rounded-full shadow relative overflow-hidden animated-eye group transition-all">
    <span className="relative z-10">Ver Tienda ↗</span>
    <span className="eye-effect absolute inset-0 z-0"></span>
  </button>
    </div>
  </nav>
);

export default Navbar;

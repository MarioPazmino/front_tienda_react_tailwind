import React from 'react';

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
        <li className="hover:text-lime-400 cursor-pointer">Home</li>
        <li className="hover:text-lime-400 cursor-pointer">About Us</li>
        <li className="hover:text-lime-400 cursor-pointer">Pages</li>
        <li className="hover:text-lime-400 cursor-pointer">Project</li>
        <li className="hover:text-lime-400 cursor-pointer">Services</li>
        <li className="hover:text-lime-400 cursor-pointer">Blog</li>
      </ul>
    </div>
    {/* Botón */}
    <div>
  <button className="bg-lime-400 text-[#00001E] font-bold px-6 py-3 rounded-full shadow hover:bg-lime-300 transition-all">
        Ver Tienda ↗
      </button>
    </div>
  </nav>
);

export default Navbar;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css'; // Asegura que Tailwind esté cargado

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-4">¡Tailwind CSS funciona!</h1>
      <p className="text-lg text-white mb-8">Edita <code>src/App.js</code> y guarda para ver los cambios.</p>
      <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition">Botón de ejemplo</button>
    </div>
  );
}

export default App;

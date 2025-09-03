import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

// Reusable dark mode toggle. Persist theme in localStorage and keep class on <html>
export default function DarkModeToggle({ position = 'bottom-right', size = 12 }) {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme_dark');
      if (saved !== null) return saved === '1';
    } catch (e) {}
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme_dark', dark ? '1' : '0');
    } catch (e) {}
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  // position helper -> transforms prop into classes
  // Use responsive bottom offset so the toggle doesn't sit on top of mobile bottom nav.
  const posClass = {
    // on small screens move up (bottom-20), on md+ use bottom-6
    'bottom-right': 'fixed right-6 bottom-20 md:bottom-6',
    'bottom-left': 'fixed left-6 bottom-20 md:bottom-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6',
  }[position] || 'fixed right-6 bottom-20 md:bottom-6';

  return (
    <button
      type="button"
      aria-label="Alternar modo claro/oscuro"
      title={dark ? 'Cambiar a claro' : 'Cambiar a oscuro'}
      onClick={() => setDark(d => !d)}
      className={`${posClass} z-50 p-3 rounded-full shadow-lg border-2 border-primary bg-accent text-primary hover:scale-105 transform transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent/50`}
    >
      {dark ? <FiMoon size={size} /> : <FiSun size={size} />}
    </button>
  );
}

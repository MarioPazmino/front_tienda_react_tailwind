import React, { useEffect, useState } from 'react';

/**
 * Notification component
 * @param {string} type - 'error' | 'success' | 'info' | 'warning'
 * @param {string} message - The message to display
 * @param {function} onClose - Optional close handler
 */

const typeStyles = {
  error: 'bg-red-100 border-red-400 text-red-700',
  success: 'bg-green-100 border-green-400 text-green-700',
  info: 'bg-blue-100 border-blue-400 text-blue-700',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
};

const transitionBase = 'transition-all duration-500 ease-in-out';
const showClass = 'opacity-100 translate-y-0';
const hideClass = 'opacity-0 -translate-y-4 pointer-events-none';

export default function Notification({ type = 'info', message, onClose }) {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose && onClose(), 500); // Espera animación
      }, 3500);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message, onClose]);

  if (!message && !visible) return null;

  return (
    <div
      className={`fixed z-50 top-4 right-4 w-[90vw] max-w-sm border-l-4 rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 ${transitionBase} ${visible ? showClass : hideClass} ${typeStyles[type]}`}
      role="alert"
    >
      <span className="font-bold capitalize">{type === 'error' ? 'Error' : type}</span>
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={() => { setVisible(false); setTimeout(() => onClose(), 500); }}
          className="ml-2 text-xl font-bold text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Cerrar notificación"
        >
          ×
        </button>
      )}
    </div>
  );
}

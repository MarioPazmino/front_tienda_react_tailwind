import React from 'react';

export default function ConfirmModal({ open, title = 'Confirmar', description = '', confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', loading = false, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[99990] flex items-center justify-center px-4 py-8 pointer-events-none">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[99989] pointer-events-auto" onClick={onCancel} />
      <div className="relative w-full max-w-md bg-white dark:bg-sidebar-dark rounded-lg shadow-lg ring-1 ring-black/8 dark:ring-white/6 p-6 z-[99990] pointer-events-auto">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">!</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} disabled={loading} className="px-4 py-2 rounded-full bg-transparent border-2 border-accent text-accent hover:bg-accent/10 transition-colors">{cancelLabel}</button>
          <button onClick={onConfirm} disabled={loading} className="px-4 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-500 transition-colors">{loading ? 'Procesando...' : confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

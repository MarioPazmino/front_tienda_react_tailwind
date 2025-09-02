import React from 'react';

const AdminForm = ({ onSubmit, initialData }) => {
  // Formulario para crear/editar admin
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Usuario</label>
        <input type="text" name="username" defaultValue={initialData?.username || ''} className="input input-bordered w-full" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Correo</label>
        <input type="email" name="email" defaultValue={initialData?.email || ''} className="input input-bordered w-full" required />
      </div>
      {/* Otros campos según modelo */}
      <button type="submit" className="btn btn-accent w-full">Guardar</button>
    </form>
  );
};

export default AdminForm;

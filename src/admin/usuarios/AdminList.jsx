import React from 'react';

const AdminList = () => {
  // Aquí luego se conectará a la API para traer los administradores
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Administradores</h2>
      <div className="bg-white dark:bg-bg-dark rounded-lg shadow p-4">
        {/* Aquí irá la tabla/lista de administradores */}
        <p className="text-gray-500 dark:text-gray-300">No hay administradores cargados aún.</p>
      </div>
    </div>
  );
};

export default AdminList;

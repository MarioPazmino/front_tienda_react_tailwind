import React from 'react';

const ProductForm = ({ onSubmit, product }) => (
  <form className="max-w-md mx-auto bg-white p-6 rounded shadow" onSubmit={onSubmit}>
    <input className="block w-full mb-4 border p-2" name="name" defaultValue={product?.name || ''} placeholder="Nombre" />
    <textarea className="block w-full mb-4 border p-2" name="description" defaultValue={product?.description || ''} placeholder="Descripción" />
    <input className="block w-full mb-4 border p-2" name="price" type="number" defaultValue={product?.price || ''} placeholder="Precio" />
    <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Guardar</button>
  </form>
);

export default ProductForm;

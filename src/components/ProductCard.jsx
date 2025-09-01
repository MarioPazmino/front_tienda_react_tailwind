import React from 'react';

const ProductCard = ({ product }) => (
  <div className="border rounded shadow p-4 bg-white">
    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
    <p className="mb-2">{product.description}</p>
    <span className="font-semibold text-blue-600">${product.price}</span>
  </div>
);

export default ProductCard;

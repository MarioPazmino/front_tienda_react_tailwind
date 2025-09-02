import React from 'react';

const ProductCard = ({ product }) => (
  <div className="border rounded shadow p-4 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
    <p className="mb-2">{product.description}</p>
  <span className="font-semibold text-accent">${product.price}</span>
  </div>
);

export default ProductCard;

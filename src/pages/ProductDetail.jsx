import React from 'react';

const ProductDetail = ({ product }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
    <p className="mb-4">{product.description}</p>
    <span className="font-semibold text-blue-600 text-lg">${product.price}</span>
  </div>
);

export default ProductDetail;

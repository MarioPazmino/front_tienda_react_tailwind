import React from 'react';
import ProductCard from '../components/ProductCard';

const Products = ({ products }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default Products;

import { useState } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  // lógica para obtener productos aquí
  return { products, setProducts };
}

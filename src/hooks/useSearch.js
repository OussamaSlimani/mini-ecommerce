import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '../services/api';
import { useState, useMemo } from 'react';

export const useSearch = (query = '') => {
  const [searchQuery, setSearchQuery] = useState(query);

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60 * 10, // 10 min
  });

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return allProducts;

    const q = searchQuery.toLowerCase();
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(q) 
    );
  }, [allProducts, searchQuery]);

  return {
    products: filteredProducts,
    searchQuery,
    setSearchQuery,
    isLoading,
    total: filteredProducts.length,
  };
};
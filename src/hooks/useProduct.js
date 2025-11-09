import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  fetchAllProducts,
  fetchProduct,
  fetchProductList,
  fetchTopNew,
  fetchTopSellers,
} from "../services/api";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60 * 10,
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
};

export const useProductList = (listId) => {
  return useQuery({
    queryKey: ["product-list", listId],
    queryFn: () => fetchProductList(listId),
    enabled: !!listId,
  });
};

export const useTopNew = () => {
  return useQuery({
    queryKey: ["top-new"],
    queryFn: fetchTopNew,
  });
};

export const useTopSellers = () => {
  return useQuery({
    queryKey: ["top-sellers"],
    queryFn: fetchTopSellers,
  });
};

export const useSearch = (initialQuery = "") => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const { data: allProducts = [], isLoading } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return allProducts;
    const q = searchQuery.toLowerCase();
    return allProducts.filter((p) => p.name.toLowerCase().includes(q));
  }, [allProducts, searchQuery]);

  return {
    products: filteredProducts,
    searchQuery,
    setSearchQuery,
    isLoading,
    total: filteredProducts.length,
  };
};

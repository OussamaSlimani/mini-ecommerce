import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchCategoryById } from "../services/api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCategory = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategoryById(id),
    enabled: !!id, // only run if id is truthy
    staleTime: 1000 * 60 * 5,
  });
};

import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchCategoryById } from "../services/api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,   // cached 5 mins
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,      // prevents refetch on navigation
  });
};

export const useCategory = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategoryById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5
  });
};

import { useQuery } from '@tanstack/react-query';
import { fetchCategoryById } from '../services/api';

export const useCategory = (id) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => fetchCategoryById(id),
    enabled: !!id,
  });
};
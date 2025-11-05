import { useQuery } from '@tanstack/react-query';
import { fetchProductList } from '../services/api';

export const useProductList = (listId) => {
  return useQuery({
    queryKey: ['product-list', listId],
    queryFn: () => fetchProductList(listId),
    enabled: !!listId,
  });
};
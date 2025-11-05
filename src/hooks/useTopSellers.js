import { useQuery } from '@tanstack/react-query';
import { fetchTopSellers } from '../services/api';

export const useTopSellers = () => {
  return useQuery({
    queryKey: ['top-sellers'],
    queryFn: fetchTopSellers,
  });
};
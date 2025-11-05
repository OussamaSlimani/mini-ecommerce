import { useQuery } from '@tanstack/react-query';
import { fetchTopNew } from '../services/api';

export const useTopNew = () => {
  return useQuery({
    queryKey: ['top-new'],
    queryFn: fetchTopNew,
  });
};
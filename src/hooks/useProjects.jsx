import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/services/projectService';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60, 
    cacheTime: 1000 * 60 * 60,
    onError: (error) => {
      console.error('Error fetching projects:', error);
    },
  });
};
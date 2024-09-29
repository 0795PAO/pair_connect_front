import { useQuery } from '@tanstack/react-query';
import api from '@/config/apiInterceptor';
import { PROJECT_URLS } from '@/config/apiUrls';

const fetchProjects = async () => {
    const response = await api.get(PROJECT_URLS.GET_PROJECTS);
    
    // Check if `response.data` contains the actual array of projects
    const projects = Array.isArray(response.data) ? response.data : response.data.results || [];
  
    return projects.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description,
      stack: project.stack,
      languages: project.languages,
      level: project.level,
    }));
  };

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 15, // 15 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
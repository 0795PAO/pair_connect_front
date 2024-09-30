import { useQuery } from '@tanstack/react-query';
import api from '@/config/apiInterceptor';
import { SKILLS_URLS } from '@/config/apiUrls';

const fetchLevels = async () => {
  const response = await api.get(SKILLS_URLS.LEVELS);
  return response.data.map(level => ({
    value: level.id.toString(),
    label: level.name,
  }));
};

export const useLevels = () => {
  return useQuery({
    queryKey: ['levels'],
    queryFn: fetchLevels,
    staleTime: 1000 * 60 * 15, // 15 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
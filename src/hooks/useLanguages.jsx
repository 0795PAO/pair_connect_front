import { useQuery } from '@tanstack/react-query';
import api from '@/config/apiInterceptor';
import { SKILLS_URLS } from '@/config/apiUrls';

const fetchLanguages = async () => {
  const response = await api.get(SKILLS_URLS.LANGUAGES);
  return response.data.map(language => ({
    value: language.id.toString(),
    label: language.name,
  }));
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages,
    staleTime: 1000 * 60 * 15, // 15 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,  // Add this to prevent refetching on mount
    refetchOnReconnect: false,
  });
};
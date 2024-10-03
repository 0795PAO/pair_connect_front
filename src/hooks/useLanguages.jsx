import { useQuery } from '@tanstack/react-query';
import api from '@/config/apiInterceptor';
import { SKILLS_URLS } from '@/config/apiUrls';

export const fetchLanguages = async () => {
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
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,  
    refetchOnReconnect: false,
  });
};
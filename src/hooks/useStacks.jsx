import { useQuery } from '@tanstack/react-query';
import api from '@/config/apiInterceptor';
import { SKILLS_URLS } from '@/config/apiUrls';

const fetchStacks = async () => {
  const response = await api.get(SKILLS_URLS.STACKS);
  return response.data.map(stack => ({
    value: stack.id.toString(),
    label: stack.name,
  }));
};

export const useStacks = () => {
  return useQuery({
    queryKey: ['stacks'],
    queryFn: fetchStacks,
    staleTime: 1000 * 60 * 15, // 15 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
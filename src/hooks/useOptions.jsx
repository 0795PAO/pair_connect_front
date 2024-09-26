import { useQuery } from '@tanstack/react-query';
import { fetchOptions } from '@/services/optionService';

export const useOptions = () => {
    return useQuery({
        queryKey: ['options'],
        queryFn: fetchOptions
    });
};
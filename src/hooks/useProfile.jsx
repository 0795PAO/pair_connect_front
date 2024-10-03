import { useQuery} from '@tanstack/react-query';
import { getUser } from '@/services/profileService';

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
        staleTime: 1000 * 60 * 15, 
    });
};


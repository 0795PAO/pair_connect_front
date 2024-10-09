import { useQuery } from '@tanstack/react-query';
import { getDeveloperProfile, getDeveloperProfileWithSession } from '@/services/profileService';

export const useDeveloperProfile = (developerId, sessionId = null) => {
    return useQuery({
        queryKey: sessionId ? ['developerProfile', developerId, sessionId] : ['developerProfile', developerId],
        queryFn: () => {
            if (sessionId) {
                return getDeveloperProfileWithSession(developerId, sessionId);
            } else {
                return getDeveloperProfile(developerId);
            }
        },
        enabled: !!developerId,
    });
};
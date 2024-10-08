import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsers } from "@/services/sessionService";

export const useGetRecommendedUsers = (sessionId) => {
    return useQuery({
        queryKey: ["recommendedUsers", sessionId],
        queryFn: () => getRecommendedUsers(sessionId),
        staleTime: 1000 * 60 * 15,
    });
};
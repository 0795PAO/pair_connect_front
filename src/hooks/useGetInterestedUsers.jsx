import { useQuery } from "@tanstack/react-query";
import { getInterestedParticipantsPerSession } from "@/services/participantsService";

export const useGetInterestedUsers = (session) => {
    return useQuery({
        queryKey: ["interestedUsersPerSession", session],
        queryFn: () => getInterestedParticipantsPerSession(session),
        staleTime: 1000 * 60 * 15,
    })
};

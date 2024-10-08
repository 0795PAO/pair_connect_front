import { checkIfInterested } from "@/services/participantsService";
import { useQuery } from "@tanstack/react-query";

export const useCheckIfInterested = (sessionId) => {
    return useQuery({
        queryKey: ["checkIfInterested", sessionId],
        queryFn: () => checkIfInterested(sessionId),
    });
};

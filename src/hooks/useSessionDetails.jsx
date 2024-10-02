import { useQuery } from "@tanstack/react-query";
import { getSessionDetails } from "@/services/sessionService";

export const useSessionDetails = (sessionId) => {
  return useQuery({
    queryKey: ["sessionDetails", sessionId],
    queryFn: () => getSessionDetails(sessionId),
    enabled: !!sessionId,
  });
};

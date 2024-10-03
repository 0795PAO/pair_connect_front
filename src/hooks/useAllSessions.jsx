import { useQuery } from "@tanstack/react-query";

export const useAllSessions = () => {
    return useQuery({
      queryKey: ["allsessions", sessionId],
      queryFn: () => getSessionDetails(sessionId),
      enabled: !!sessionId,
    });
  };
  
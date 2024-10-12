import { useQuery } from "@tanstack/react-query";
import { getHostedSessions } from "@/services/sessionService";

export const useHostedSessions = () => {
  return useQuery({
    queryKey: ["hostedSessions"],
    queryFn: getHostedSessions,
  });
};

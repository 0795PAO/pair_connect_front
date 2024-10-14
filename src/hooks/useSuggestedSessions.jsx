import { useQuery } from "@tanstack/react-query";
import { getSuggestedSessions } from "@/services/sessionService";

export const useSuggestedSessions = () => {
  return useQuery({
    queryKey: ["suggestedSessions"],
    queryFn: () => getSuggestedSessions(),
    staleTime: 1000 * 60 * 15,
  });
};

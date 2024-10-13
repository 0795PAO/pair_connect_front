import { useQuery } from "@tanstack/react-query";
import { getInterestedSessions } from "@/services/sessionService";

export const useInterestedSessions = () => {
  return useQuery({
    queryKey: ["interestedSessions"],
    queryFn: getInterestedSessions,
  });
};

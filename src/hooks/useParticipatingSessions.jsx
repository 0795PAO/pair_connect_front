import { useQuery } from "@tanstack/react-query";
import { getParticipatingSessions } from "@/services/sessionService";

export const useParticipatingSessions = () => {
  return useQuery({
    queryKey: ["participatingSessions"],
    queryFn: getParticipatingSessions,
  });
};

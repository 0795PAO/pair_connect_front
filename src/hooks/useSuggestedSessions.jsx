import { useQuery } from "@tanstack/react-query";
import { getSuggestedSessions } from "@/services/sessionService";

export const useSuggestedSessions = () => {
  return useQuery({
    queryKey: ["suggestedSessions"],
    queryFn: async () => {
      const response = await getSuggestedSessions();
      console.log("Suggested Sessions from hook:", response);
      return response;
    },
  });
};

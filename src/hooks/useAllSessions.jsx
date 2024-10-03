import { getAllSessions } from "@/services/sessionService";
import { useQuery } from "@tanstack/react-query";

export const useAllSessions = () => {
    return useQuery({
      queryKey: ["allsessions", ],
      queryFn: () => getAllSessions(),
    });
  };
  
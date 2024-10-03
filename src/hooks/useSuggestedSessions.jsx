import { useQuery } from "@tanstack/react-query";
import { getSuggestedSessions } from "@/services/sessionService";

export const useSuggestedSessions = () => {
  return useQuery({
    queryKey: ["suggestedSessions"],
    queryFn: async () => {
      const response = await getSuggestedSessions();

      return response?.data || [];
    },
    // También puedes añadir retry para reintentar la consulta en caso de error
    retry: 1,
  });
};

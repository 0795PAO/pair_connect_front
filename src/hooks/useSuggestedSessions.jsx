import { useQuery } from "@tanstack/react-query";
import { getSuggestedSessions } from "@/services/sessionService";

export const useSuggestedSessions = () => {
  return useQuery({
    queryKey: ["suggestedSessions"],
    queryFn: async () => {
      const response = await getSuggestedSessions();

      // Asegúrate de que la respuesta contiene datos válidos
      return response?.data || []; // Devolver un array vacío si no hay datos
    },
    retry: 1,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getSessionDetails } from "@/services/sessionService";

// Hook para obtener los detalles de una sesión por su ID
export const useSessionDetails = (sessionId) => {
  return useQuery({
    queryKey: ["sessionDetails", sessionId],
    queryFn: () => getSessionDetails(sessionId),
    enabled: !!sessionId, // Solo ejecutar si hay un sessionId
  });
};

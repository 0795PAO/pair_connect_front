import { useQuery } from "@tanstack/react-query";
import { getProjectForSession } from "@/services/sessionService";

// Hook para obtener los detalles del proyecto para una sesión
export const useProjectForSession = (projectId) => {
  return useQuery({
    queryKey: ["projectForSession", projectId],
    queryFn: () => getProjectForSession(projectId),
    enabled: !!projectId, // Solo ejecutar si hay un projectId
  });
};

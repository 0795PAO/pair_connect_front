import { useQuery } from "@tanstack/react-query";
import { getProjectForSession } from "@/services/sessionService";

export const useProjectForSession = (projectId) => {
  return useQuery({
    queryKey: ["projectForSession", projectId],
    queryFn: () => getProjectForSession(projectId),
    enabled: !!projectId,
  });
};

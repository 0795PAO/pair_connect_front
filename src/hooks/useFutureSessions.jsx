import { useQuery } from "@tanstack/react-query";
import { SESSION_URLS } from "@/config/apiUrls";
import api from "@/config/apiInterceptor";

export const useFutureSessions = (projectId, currentSessionDate) => {
  return useQuery({
    queryKey: ["futureSessions", projectId],
    queryFn: async () => {
      const response = await api.get(
        SESSION_URLS.GET_PROYECT_SESSIONS(projectId)
      );
      const sessions = response.data;

      const futureSessions = sessions.filter(
        (session) =>
          new Date(session.schedule_date_time) > new Date(currentSessionDate)
      );

      return futureSessions;
    },
    enabled: !!projectId,
  });
};

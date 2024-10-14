import { useQuery } from "@tanstack/react-query";
import api from "@/config/apiInterceptor";
import { PROJECT_URLS } from "@/config/apiUrls";

const fetchProjectDetails = async (projectId) => {
  const response = await api.get(
    `${PROJECT_URLS.GET_PROJECT_BY_ID(projectId)}`
  );
  return response.data;
};

export const useProjectDetails = (projectId) => {
  return useQuery({
    queryKey: ["projectDetails", projectId],
    queryFn: () => fetchProjectDetails(projectId),
    enabled: !!projectId,
  });
};

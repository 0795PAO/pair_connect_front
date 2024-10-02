import api from "@/config/apiInterceptor";
import { SESSION_URLS } from "@/config/apiUrls";

export const getSessionDetails = async (sessionId) => {
  try {
    const response = await api.get(SESSION_URLS.GET_SESSION_BY_ID(sessionId));
    console.log("Session details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching session details:", error);
    throw error;
  }
};

export const getProjectForSession = async (projectId) => {
  try {
    const response = await api.get(
      `${SESSION_URLS.GET_PROJECT_BY_ID(projectId)}`
    );
    console.log("Project details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};

import api from "@/config/apiInterceptor";
import { SESSION_URLS, PROJECT_URLS } from "@/config/apiUrls";

// Obtener detalles de una sesión por su ID
export const getSessionDetails = async (projectId) => {
  try {
    const response = await api.get(`${PROJECT_URLS.GET_PROJECTS}${projectId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching session details:", error);
    throw error;
  }
};

// Obtener detalles del proyecto por su ID
export const getProjectForSession = async (projectId) => {
  try {
    const response = await api.get(PROJECT_URLS.GET_PROJECT_BY_ID(projectId));
    return response.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};

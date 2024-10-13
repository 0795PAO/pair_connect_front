import api from "@/config/apiInterceptor";
import { SESSION_URLS } from "@/config/apiUrls";

export const getSessionDetails = async (sessionId) => {
  try {
    const response = await api.get(SESSION_URLS.GET_SESSION_BY_ID(sessionId));
    return response.data;
  } catch (error) {
    console.error("Error fetching session details:", error);
    throw error;
  }
};

export const getSuggestedSessions = async () => {
  try {
    const response = await api.get(SESSION_URLS.GET_SUGGESTED_SESSIONS);
    return response.data;
  } catch (error) {
    console.error("Error fetching suggested sessions:", error);
    throw error;
  }
};

export const getAllSessions = async () => {
  try {
    const response = await api.get(SESSION_URLS.GET_ALL_SESSIONS);
    return response.data;
  } catch (error) {
    console.error("Error fetching all sessions:", error);
    throw error;
  }
};

export const createSession = async (sessionData) => {
  try {
    const response = await api.post(SESSION_URLS.CREATE_SESSION, sessionData);
    return response.data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

export const updateSession = async (sessionId, updatedData) => {
  try {
    const response = await api.patch(
      SESSION_URLS.UPDATE_SESSION(sessionId),
      updatedData
    );
    console.log("API Response in service:", response);
    return response.data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

export const deleteSession = async (sessionId) => {
  try {
    const response = await api.delete(
      SESSION_URLS.GET_SESSION_BY_ID(sessionId)
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting session:", error);
    throw error;
  }
};

export const getRecommendedUsers = async (sessionId) => {
  try {
    const response = await api.get(
      SESSION_URLS.GET_RECOMMENDED_USERS_FOR_SESSION(sessionId)
    );
    console.log("Recommended users:", response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getHostedSessions = async () => {
  try {
    const response = await api.get(SESSION_URLS.GET_HOSTED_SESSIONS);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching hosted sessions",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Obtener sesiones en las que participas
export const getParticipatingSessions = async () => {
  try {
    const response = await api.get(SESSION_URLS.GET_PARTICIPATING_SESSIONS);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching participating sessions",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Obtener sesiones en las que estás interesada
export const getInterestedSessions = async () => {
  try {
    const response = await api.get(SESSION_URLS.GET_INTERESTED_SESSIONS);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching interested sessions",
      error.response?.data || error.message
    );
    throw error;
  }
};

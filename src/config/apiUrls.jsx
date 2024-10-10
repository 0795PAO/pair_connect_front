export const API_BASE_URL = "http://localhost:8000/api/";

export const AUTH_URLS = {
  LOGIN: `${API_BASE_URL}auth/jwt/create/`,
  REGISTER: `${API_BASE_URL}auth/users/`,
  REFRESH: `${API_BASE_URL}auth/jwt/refresh/`,
  LOGOUT: `${API_BASE_URL}auth/logout/`,
  ACTIVATE: `${API_BASE_URL}auth/users/activation/`,
};

export const PROFILE_URLS = {
  GET_MY_PROFILE: `${API_BASE_URL}auth/users/me`,
  UPDATE: `${API_BASE_URL}auth/users/me/`,
  GET_DEVELOPER_PROFILE: (userId) => `${API_BASE_URL}users/${userId}/profile/`,
  GET_DEVELOPER_PROFILE_WITH_SESSION_ID: (userId, sessionId) => `${API_BASE_URL}users/${userId}/profile/${sessionId}/`,
};

export const PROJECT_URLS = {
  GET_PROJECTS: `${API_BASE_URL}projects/projects/`,
  CREATE_PROJECT: `${API_BASE_URL}projects/projects/`,
  GET_PROJECT_BY_ID: (id) => `${API_BASE_URL}projects/projects/${id}/`,
};

export const SKILLS_URLS = {
  GET: `${API_BASE_URL}skills/`,
  STACKS: `${API_BASE_URL}skills/stacks/`,
  LEVELS: `${API_BASE_URL}skills/levels/`,
  LANGUAGES: `${API_BASE_URL}skills/languages/`,
};

export const SESSION_URLS = {
  GET_ALL_SESSIONS: `${API_BASE_URL}projects/sessions/`,
  GET_SESSIONS: `${API_BASE_URL}projects/`,
  GET_SESSION_BY_ID: (sessionId) =>
    `${API_BASE_URL}projects/sessions/${sessionId}/`,
  CREATE_SESSION: `${API_BASE_URL}projects/sessions/`,
  GET_PROYECT_SESSIONS: (proyectId) =>
    `${API_BASE_URL}projects/project-sessions/${proyectId}`,
  GET_SUGGESTED_SESSIONS: `${API_BASE_URL}projects/users/suggested-sessions/`,
  GET_RECOMMENDED_USERS_FOR_SESSION: (sessionId) => `${API_BASE_URL}projects/sessions/${sessionId}/suggested-developers/`,
}; 

export const PARTICIPANT_URLS = {
  SHOW_INTEREST_IN_SESSION: `${API_BASE_URL}projects/interested-participants/`,
  GET_INTERESTED_PARTICIPANTS_PER_SESSION: (sessionId) => `${API_BASE_URL}projects/interested-participants/${sessionId}/interested-users/`,
  GET_CHECK_IF_INTERESTED: (sessionId) => `${API_BASE_URL}projects/sessions/${sessionId}/check-interest/`,
  CONFIRM_PARTICIPANT: (sessionId) => `${API_BASE_URL}projects/sessions/${sessionId}/confirm-participant/`,
  CHECK_IF_PARTICIPANT: (sessionId, userId) => `${API_BASE_URL}projects/sessions/${sessionId}/check-participant/${userId}`,
};

export const API_BASE_URL = 'http://localhost:8000/api/';


export const AUTH_URLS = {
    LOGIN: `${API_BASE_URL}auth/jwt/create/`,
    REGISTER: `${API_BASE_URL}auth/users/`,
    REFRESH: `${API_BASE_URL}auth/jwt/refresh/`,
    LOGOUT: `${API_BASE_URL}auth/logout/`,
    ACTIVATE: `${API_BASE_URL}auth/users/activation/`,
};

export const PROFILE_URLS = {
    GET: `${API_BASE_URL}auth/users/me`,
    UPDATE: `${API_BASE_URL}auth/users/me/`, // PATCH REQUEST NOT PUT 
}

export const PROJECT_URLS = {
    GET: `${API_BASE_URL}projects/projects/`,
    CREATE: `${API_BASE_URL}projects/projects/`,
}

export const SKILLS_URLS = {
    GET: `${API_BASE_URL}skills/`,
    STACKS: `${API_BASE_URL}skills/stacks/`,
    LEVELS: `${API_BASE_URL}skills/levels/`,
    LANGUAGES: `${API_BASE_URL}skills/languages/`,

}
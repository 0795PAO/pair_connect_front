export const API_BASE_URL = 'http://localhost:8000/api/';


export const AUTH_URLS = {
    LOGIN: `${API_BASE_URL}auth/jwt/create/`,
    REGISTER: `${API_BASE_URL}auth/users/`,
    REFRESH: `${API_BASE_URL}auth/jwt/refresh/`,
    USER_UPDATE: `${API_BASE_URL}auth/users/me/`, // PATCH REQUEST NOT PUT 
    LOGOUT: `${API_BASE_URL}auth/jwt/logout/`,
};


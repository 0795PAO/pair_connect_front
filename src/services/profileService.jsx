import api from '@/config/apiInterceptor';
import { PROFILE_URLS } from '@/config/apiUrls';


export const getUser = async () => {
    try {
        const response = await api.get(PROFILE_URLS.GET);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile', error.response?.data || error.message);
        console.error('Error registering user', error);
        throw error;
    }
};

export const updateUser = async (data) => {
    try {
        const response = await api.patch(PROFILE_URLS.UPDATE, data);
        return response;
    } catch (error) {
        console.error('Error registering user', error);
        throw error;
    }
} 

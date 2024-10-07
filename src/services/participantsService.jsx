import api from "@/config/apiInterceptor";
import { PARTICIPANT_URLS } from "@/config/apiUrls";

export const showInterestInSession = async (session) => {
    try {
        const response = await api.post(PARTICIPANT_URLS.SHOW_INTEREST_IN_SESSION, session);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
import api from "@/config/apiInterceptor";
import { PARTICIPANT_URLS } from "@/config/apiUrls";

export const showInterestInSession = async (session) => {
    console.log("Session:", session)
    try {
        const response = await api.post(PARTICIPANT_URLS.SHOW_INTEREST_IN_SESSION, session);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


export const checkIfInterested = async (session) => {
    try {
        const response = await api.get(`${PARTICIPANT_URLS.GET_CHECK_IF_INTERESTED(session)}`);
        console.log("Participants:", response)
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
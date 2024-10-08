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


export const getInterestedParticipantsPerSession = async (session) => {
    try {
        const response = await api.get(`${PARTICIPANT_URLS.GET_INTERESTED_PARTICIPANTS_PER_SESSION(session)}`);
        console.log("Participants:", response)
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export const confirmParticipant = async (session, username) => {
    try {
        const response = await api.post(`${PARTICIPANT_URLS.CONFIRM_PARTICIPANT(session)}`, { username });
        console.log("Response confirm participant:", response)
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
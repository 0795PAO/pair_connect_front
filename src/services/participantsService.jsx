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
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export const getInterestedParticipantsPerSession = async (session) => {
    try {
        const response = await api.get(`${PARTICIPANT_URLS.GET_INTERESTED_PARTICIPANTS_PER_SESSION(session)}`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export const confirmParticipant = async ({ sessionId, username }) => {
    try {
        console.log("Confirming participant:", sessionId, username);
        const response = await api.post(`${PARTICIPANT_URLS.CONFIRM_PARTICIPANT(sessionId)}`, {
            username: username,
        });

        return response.data;
    } catch (err) {
        console.error("Error in confirmParticipant:", err);
        throw err;
    }
};


export const checkUserParticipation = async (sessionId, userId) => {
    try {
        const response = await api.get(`${PARTICIPANT_URLS.CHECK_USER_PARTICIPATION(sessionId, userId)}`,);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
<<<<<<< HEAD

};





/* export const getRecommendedUsers = async (sessionId) => {
    try {
        const response = await api.get(`${PARTICIPANT_URLS.GET_RECOMMENDED_USERS(sessionId)}`);
        console.log("Recommended users:", response);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}; */
=======
}
>>>>>>> 9c319bcfa9a66083db2f1712b42cd7b2e1490f00

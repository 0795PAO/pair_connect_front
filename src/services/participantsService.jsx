import api from "@/config/apiInterceptor";
import { PARTICIPANT_URLS } from "@/config/apiUrls";

export const showInterestInSession = async (session) => {
  console.log("Session:", session);
  try {
    const response = await api.post(
      PARTICIPANT_URLS.SHOW_INTEREST_IN_SESSION,
      session
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const checkIfInterested = async (session) => {
  try {
    const response = await api.get(
      `${PARTICIPANT_URLS.GET_CHECK_IF_INTERESTED(session)}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getInterestedParticipantsPerSession = async (session) => {
  try {
    const response = await api.get(
      `${PARTICIPANT_URLS.GET_INTERESTED_PARTICIPANTS_PER_SESSION(session)}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const confirmParticipant = async ({ sessionId, username }) => {
  try {
    console.log("Confirming participant:", sessionId, username);
    const response = await api.post(
      `${PARTICIPANT_URLS.CONFIRM_PARTICIPANT(sessionId)}`,
      {
        username: username,
      }
    );

    return response.data;
  } catch (err) {
    console.error("Error in confirmParticipant:", err);
    throw err;
  }
};

export const checkUserParticipation = async (sessionId, userId) => {
  try {
    const response = await api.get(
      `${PARTICIPANT_URLS.CHECK_IF_PARTICIPANT(sessionId, userId)}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const sendInvitation = async (data) => {
  console.log("SessionId:", data.sessionId, "UserId:", data.id, "Data:", data);
  try {
    const response = await api.post(
      `${PARTICIPANT_URLS.SEND_INIVTATION(data.sessionId, data.id)}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

import {
  showInterestInSession,
  checkIfInterested,
  getInterestedParticipantsPerSession,
  confirmParticipant,
  checkUserParticipation,
  sendInvitation,
} from "@/services/participantsService";
import api from "@/config/apiInterceptor";
import { PARTICIPANT_URLS } from "@/config/apiUrls";
import { vi, describe, it, expect } from "vitest";

vi.mock("@/config/apiInterceptor", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("Participant Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("showInterestInSession", () => {
    it("should successfully show interest in session", async () => {
      const mockResponse = { data: { success: true } };
      api.post.mockResolvedValueOnce(mockResponse);

      const sessionData = { sessionId: 1, userId: 2 };
      const result = await showInterestInSession(sessionData);

      expect(api.post).toHaveBeenCalledWith(
        PARTICIPANT_URLS.SHOW_INTEREST_IN_SESSION,
        sessionData
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle error when showing interest in session fails", async () => {
      const mockError = new Error("Error showing interest");
      api.post.mockRejectedValueOnce(mockError);

      await expect(showInterestInSession({ sessionId: 1 })).rejects.toThrow(
        "Error showing interest"
      );
    });
  });

  describe("checkIfInterested", () => {
    it("should successfully check if user is interested in session", async () => {
      const mockResponse = { data: { interested: true } };
      api.get.mockResolvedValueOnce(mockResponse);

      const sessionId = 1;
      const result = await checkIfInterested(sessionId);

      expect(api.get).toHaveBeenCalledWith(
        PARTICIPANT_URLS.GET_CHECK_IF_INTERESTED(sessionId)
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle error when checking interest fails", async () => {
      const mockError = new Error("Error checking interest");
      api.get.mockRejectedValueOnce(mockError);

      await expect(checkIfInterested(1)).rejects.toThrow(
        "Error checking interest"
      );
    });
  });

  describe("getInterestedParticipantsPerSession", () => {
    it("should successfully get interested participants for a session", async () => {
      const mockResponse = { data: [{ id: 1, username: "JohnDoe" }] };
      api.get.mockResolvedValueOnce(mockResponse);

      const sessionId = 1;
      const result = await getInterestedParticipantsPerSession(sessionId);

      expect(api.get).toHaveBeenCalledWith(
        PARTICIPANT_URLS.GET_INTERESTED_PARTICIPANTS_PER_SESSION(sessionId)
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle error when fetching interested participants fails", async () => {
      const mockError = new Error("Error fetching participants");
      api.get.mockRejectedValueOnce(mockError);

      await expect(getInterestedParticipantsPerSession(1)).rejects.toThrow(
        "Error fetching participants"
      );
    });
  });

  describe("confirmParticipant", () => {
    it("should successfully confirm participant", async () => {
      const mockResponse = { data: { confirmed: true } };
      api.post.mockResolvedValueOnce(mockResponse);

      const participantData = { sessionId: 1, username: "JohnDoe" };
      const result = await confirmParticipant(participantData);

      expect(api.post).toHaveBeenCalledWith(
        PARTICIPANT_URLS.CONFIRM_PARTICIPANT(participantData.sessionId),
        { username: participantData.username }
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle error when confirming participant fails", async () => {
      const mockError = new Error("Error confirming participant");
      api.post.mockRejectedValueOnce(mockError);

      await expect(
        confirmParticipant({ sessionId: 1, username: "JohnDoe" })
      ).rejects.toThrow("Error confirming participant");
    });
  });

  describe("checkUserParticipation", () => {
    it("should successfully check user participation", async () => {
      const mockResponse = { data: { participant: true } };
      api.get.mockResolvedValueOnce(mockResponse);

      const sessionId = 1;
      const userId = 2;

      const expectedUrl = PARTICIPANT_URLS.CHECK_IF_PARTICIPANT(
        sessionId,
        userId
      );
      const result = await checkUserParticipation(sessionId, userId);

      expect(api.get).toHaveBeenCalledWith(expectedUrl);
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle error when checking user participation fails", async () => {
      const mockError = new Error("Error checking participation");
      api.get.mockRejectedValueOnce(mockError);

      await expect(checkUserParticipation(1, 2)).rejects.toThrow(
        "Error checking participation"
      );
    });
  });

  describe("sendInvitation", () => {
    it("should successfully send invitation", async () => {
      const mockResponse = { data: { invited: true } };
      api.post.mockResolvedValueOnce(mockResponse);

      const invitationData = { sessionId: 1, id: 2 };
      const result = await sendInvitation(invitationData);

      expect(api.post).toHaveBeenCalledWith(
        PARTICIPANT_URLS.SEND_INIVTATION(
          invitationData.sessionId,
          invitationData.id
        )
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle error when sending invitation fails", async () => {
      const mockError = new Error("Error sending invitation");
      api.post.mockRejectedValueOnce(mockError);

      await expect(sendInvitation({ sessionId: 1, id: 2 })).rejects.toThrow(
        "Error sending invitation"
      );
    });
  });
});

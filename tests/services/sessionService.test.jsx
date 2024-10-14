import {
  getSessionDetails,
  getSuggestedSessions,
  getAllSessions,
  createSession,
  deleteSession,
  getRecommendedUsers,
  updateSession,
  getHostedSessions,
  getParticipatingSessions,
  getInterestedSessions,
} from "@/services/sessionService";
import { SESSION_URLS } from "@/config/apiUrls";
import { vi, describe, it, expect, beforeEach } from "vitest";
import api from "@/config/apiInterceptor";

vi.mock("@/config/apiInterceptor", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("sessionService - getSessionDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch session details successfully", async () => {
    const mockResponse = { data: { id: 1, name: "Test Session" } };
    api.get.mockResolvedValueOnce(mockResponse);

    const result = await getSessionDetails(1);

    expect(result).toEqual(mockResponse.data);
    expect(api.get).toHaveBeenCalledWith(SESSION_URLS.GET_SESSION_BY_ID(1));
  });

  it("should throw an error if fetching session details fails", async () => {
    const mockError = new Error("Error fetching session details");
    api.get.mockRejectedValueOnce(mockError);

    await expect(getSessionDetails(1)).rejects.toThrow(
      "Error fetching session details"
    );
  });
});

describe("sessionService - getSuggestedSessions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch suggested sessions successfully", async () => {
    const mockResponse = { data: [{ id: 1, name: "Suggested Session" }] };
    api.get.mockResolvedValueOnce(mockResponse);

    const result = await getSuggestedSessions();

    expect(result).toEqual(mockResponse.data);
    expect(api.get).toHaveBeenCalledWith(SESSION_URLS.GET_SUGGESTED_SESSIONS);
  });

  it("should throw an error if fetching suggested sessions fails", async () => {
    const mockError = new Error("Error fetching suggested sessions");
    api.get.mockRejectedValueOnce(mockError);

    await expect(getSuggestedSessions()).rejects.toThrow(
      "Error fetching suggested sessions"
    );
  });
});

describe("sessionService - getAllSessions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch all sessions successfully", async () => {
    const mockResponse = { data: [{ id: 1, name: "All Sessions" }] };
    api.get.mockResolvedValueOnce(mockResponse);

    const result = await getAllSessions();

    expect(result).toEqual(mockResponse.data);
    expect(api.get).toHaveBeenCalledWith(SESSION_URLS.GET_ALL_SESSIONS);
  });

  it("should throw an error if fetching all sessions fails", async () => {
    const mockError = new Error("Error fetching all sessions");
    api.get.mockRejectedValueOnce(mockError);

    await expect(getAllSessions()).rejects.toThrow(
      "Error fetching all sessions"
    );
  });
});

describe("sessionService - createSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a session successfully", async () => {
    const mockResponse = { data: { id: 1, name: "New Session" } };
    const mockSessionData = { name: "New Session" };
    api.post.mockResolvedValueOnce(mockResponse);

    const result = await createSession(mockSessionData);

    expect(result).toEqual(mockResponse.data);
    expect(api.post).toHaveBeenCalledWith(
      SESSION_URLS.CREATE_SESSION,
      mockSessionData
    );
  });

  it("should throw an error if creating session fails", async () => {
    const mockError = new Error("Error creating session");
    const mockSessionData = { name: "New Session" };
    api.post.mockRejectedValueOnce(mockError);

    await expect(createSession(mockSessionData)).rejects.toThrow(
      "Error creating session"
    );
  });
});

describe("sessionService - deleteSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should delete a session successfully", async () => {
    const mockResponse = { data: { success: true } };
    api.delete.mockResolvedValueOnce(mockResponse);

    const result = await deleteSession(1);

    expect(result).toEqual(mockResponse.data);
    expect(api.delete).toHaveBeenCalledWith(SESSION_URLS.GET_SESSION_BY_ID(1));
  });

  it("should throw an error if deleting session fails", async () => {
    const mockError = new Error("Error deleting session");
    api.delete.mockRejectedValueOnce(mockError);

    await expect(deleteSession(1)).rejects.toThrow("Error deleting session");
  });
});

describe("sessionService - getRecommendedUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch recommended users successfully", async () => {
    const mockResponse = { data: [{ id: 1, username: "John Doe" }] };
    api.get.mockResolvedValueOnce(mockResponse);

    const result = await getRecommendedUsers(1);

    expect(result).toEqual(mockResponse.data);
    expect(api.get).toHaveBeenCalledWith(
      SESSION_URLS.GET_RECOMMENDED_USERS_FOR_SESSION(1)
    );
  });

  it("should throw an error if fetching recommended users fails", async () => {
    const mockError = new Error("Error fetching recommended users");
    api.get.mockRejectedValueOnce(mockError);

    await expect(getRecommendedUsers(1)).rejects.toThrow(
      "Error fetching recommended users"
    );
  });
});
describe("sessionService - updateSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should update a session successfully", async () => {
    const mockResponse = { data: { id: 1, name: "Updated Session" } };
    const updatedData = { name: "Updated Session" };
    api.patch.mockResolvedValueOnce(mockResponse);

    const result = await updateSession(1, updatedData);

    expect(result).toEqual(mockResponse.data);
    expect(api.patch).toHaveBeenCalledWith(
      SESSION_URLS.UPDATE_SESSION(1),
      updatedData
    );
  });

  it("should throw an error if updating session fails", async () => {
    const mockError = new Error("Error updating session");
    api.patch.mockRejectedValueOnce(mockError);

    await expect(updateSession(1, { name: "Updated Session" })).rejects.toThrow(
      "Error updating session"
    );
  });
});

describe("sessionService - getHostedSessions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch hosted sessions successfully", async () => {
    const mockResponse = { data: [{ id: 1, name: "Hosted Session" }] };
    api.get.mockResolvedValueOnce(mockResponse);

    const result = await getHostedSessions();

    expect(result).toEqual(mockResponse.data);
    expect(api.get).toHaveBeenCalledWith(SESSION_URLS.GET_HOSTED_SESSIONS);
  });

  it("should throw an error if fetching hosted sessions fails", async () => {
    const mockError = new Error("Error fetching hosted sessions");
    api.get.mockRejectedValueOnce(mockError);

    await expect(getHostedSessions()).rejects.toThrow(
      "Error fetching hosted sessions"
    );
  });
});

describe("sessionService - getParticipatingSessions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch participating sessions successfully", async () => {
    const mockResponse = { data: [{ id: 1, name: "Participating Session" }] };
    api.get.mockResolvedValueOnce(mockResponse);

    const result = await getParticipatingSessions();

    expect(result).toEqual(mockResponse.data);
    expect(api.get).toHaveBeenCalledWith(
      SESSION_URLS.GET_PARTICIPATING_SESSIONS
    );
  });

  it("should throw an error if fetching participating sessions fails", async () => {
    const mockError = new Error("Error fetching participating sessions");
    api.get.mockRejectedValueOnce(mockError);

    await expect(getParticipatingSessions()).rejects.toThrow(
      "Error fetching participating sessions"
    );
  });
});

describe("sessionService - getInterestedSessions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch interested sessions successfully", async () => {
    const mockResponse = { data: [{ id: 1, name: "Interested Session" }] };
    api.get.mockResolvedValueOnce(mockResponse);

    const result = await getInterestedSessions();

    expect(result).toEqual(mockResponse.data);
    expect(api.get).toHaveBeenCalledWith(SESSION_URLS.GET_INTERESTED_SESSIONS);
  });

  it("should throw an error if fetching interested sessions fails", async () => {
    const mockError = new Error("Error fetching interested sessions");
    api.get.mockRejectedValueOnce(mockError);

    await expect(getInterestedSessions()).rejects.toThrow(
      "Error fetching interested sessions"
    );
  });
});

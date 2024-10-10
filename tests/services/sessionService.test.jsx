import {
  getSessionDetails,
  getProjectForSession,
  getSuggestedSessions,
  getAllSessions,
  createSession,
  deleteSession,
  getRecommendedUsers,
} from "@/services/sessionService";
import { SESSION_URLS } from "@/config/apiUrls";
import { vi, describe, it, expect, beforeEach } from "vitest";
import api from "@/config/apiInterceptor";

vi.mock("@/config/apiInterceptor", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
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

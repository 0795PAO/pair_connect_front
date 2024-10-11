import { getUser, updateUser } from "@/services/profileService";
import api from "@/config/apiInterceptor";
import { PROFILE_URLS } from "@/config/apiUrls";
import { vi, describe, it, expect } from "vitest";

vi.mock("@/config/apiInterceptor", () => ({
  default: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("getUser", () => {
  it("should fetch and return user data successfully", async () => {
    const mockUserData = { name: "John Doe", email: "john.doe@example.com" };
    api.get.mockResolvedValueOnce({ data: mockUserData });

    const result = await getUser();

    expect(api.get).toHaveBeenCalledWith(PROFILE_URLS.GET_MY_PROFILE);
    expect(result).toEqual(mockUserData);
  });

  it("should handle error when fetching user data fails", async () => {
    const mockError = new Error("Failed to fetch user data");
    api.get.mockRejectedValueOnce(mockError);

    await expect(getUser()).rejects.toThrow("Failed to fetch user data");
  });
});

describe("updateUser", () => {
  it("should update and return the response successfully", async () => {
    const mockUpdateData = {
      name: "John Doe Updated",
      email: "john.updated@example.com",
    };
    const mockResponse = { data: mockUpdateData };
    api.patch.mockResolvedValueOnce(mockResponse);

    const result = await updateUser(mockUpdateData);

    expect(api.patch).toHaveBeenCalledWith(
      PROFILE_URLS.UPDATE,
      mockUpdateData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should handle error when updating user data fails", async () => {
    const mockError = new Error("Failed to update user data");
    api.patch.mockRejectedValueOnce(mockError);

    await expect(updateUser({ name: "Jane Doe" })).rejects.toThrow(
      "Failed to update user data"
    );
  });
});

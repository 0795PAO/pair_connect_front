import {
  createProject,
  getProjects,
  updateProject,
  updateProjectImage,
  deleteProject,
} from "@/services/projectService";
import api from "@/config/apiInterceptor";
import { PROJECT_URLS } from "@/config/apiUrls";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@/config/apiInterceptor", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("projectService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createProject", () => {
    it("should create and return the project successfully", async () => {
      const mockProjectData = {
        name: "New Project",
        description: "Project Description",
        stack: "Frontend",
        level: "Intermediate",
        languages: [1, 2],
        image: ["image.png"],
      };

      const mockResponse = { data: { id: 1, ...mockProjectData } };
      api.post.mockResolvedValueOnce(mockResponse);

      const result = await createProject(mockProjectData);

      expect(api.post).toHaveBeenCalledWith(
        PROJECT_URLS.CREATE_PROJECT,
        expect.any(FormData),
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle error when creating a project fails", async () => {
      const mockError = new Error("Error creating project");
      api.post.mockRejectedValueOnce(mockError);

      await expect(
        createProject({
          name: "Project",
          description: "Test project",
          stack: "Frontend",
          level: "Intermediate",
          languages: [],
        })
      ).rejects.toThrow("Error creating project");
    });
  });

  describe("getProjects", () => {
    it("should fetch and return projects successfully", async () => {
      const mockProjects = [
        { id: 1, name: "Project 1" },
        { id: 2, name: "Project 2" },
      ];
      api.get.mockResolvedValueOnce({ data: mockProjects });

      const result = await getProjects();

      expect(api.get).toHaveBeenCalledWith(PROJECT_URLS.GET_PROJECTS);
      expect(result).toEqual(mockProjects);
    });

    it("should handle error when fetching projects fails", async () => {
      const mockError = new Error("Error fetching projects");
      api.get.mockRejectedValueOnce(mockError);

      await expect(getProjects()).rejects.toThrow("Error fetching projects");
    });
  });

  describe("updateProject", () => {
    it("should update and return the project successfully", async () => {
      const mockProjectData = {
        name: "Updated Project",
        description: "Updated Description",
        stack: "Backend",
        level: "Advanced",
        languages: [1, 3],
      };
      const mockResponse = { data: mockProjectData };
      api.patch.mockResolvedValueOnce(mockResponse);

      const result = await updateProject(1, mockProjectData);

      expect(api.patch).toHaveBeenCalledWith(
        PROJECT_URLS.GET_PROJECT_BY_ID(1),
        expect.any(FormData),
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle error when updating a project fails", async () => {
      const mockError = new Error("Error updating project");
      api.patch.mockRejectedValueOnce(mockError);

      await expect(
        updateProject(1, {
          name: "Updated Project",
          description: "Updated Description",
          stack: "Backend",
          level: "Advanced",
          languages: [],
        })
      ).rejects.toThrow("Error updating project");
    });
  });

  describe("updateProjectImage", () => {
    it("should update and return the project image successfully", async () => {
      const mockFormData = new FormData();
      const mockResponse = { data: { image: "updated_image.png" } };
      api.patch.mockResolvedValueOnce(mockResponse);

      const result = await updateProjectImage(1, mockFormData);

      expect(api.patch).toHaveBeenCalledWith(
        PROJECT_URLS.GET_PROJECT_BY_ID(1),
        mockFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle error when updating the project image fails", async () => {
      const mockError = new Error("Error updating project image");
      api.patch.mockRejectedValueOnce(mockError);

      const mockFormData = new FormData();
      mockFormData.append("image", "new_image.png");

      await expect(updateProjectImage(1, mockFormData)).rejects.toThrow(
        "Error updating project image"
      );
    });
  });

  describe("deleteProject", () => {
    it("should delete the project successfully", async () => {
      const mockResponse = { data: { success: true } };
      api.delete.mockResolvedValueOnce(mockResponse);

      const result = await deleteProject(1);

      expect(api.delete).toHaveBeenCalledWith(
        PROJECT_URLS.GET_PROJECT_BY_ID(1)
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle error when deleting the project fails", async () => {
      const mockError = new Error("Error deleting project");
      api.delete.mockRejectedValueOnce(mockError);

      await expect(deleteProject(1)).rejects.toThrow("Error deleting project");
    });
  });
});

import api from '@/config/apiInterceptor';
import { PROJECT_URLS } from '@/config/apiUrls';

// Create Project
export const createProject = async (projectData) => {
  const formData = new FormData();

  formData.append("name", projectData.name);
  formData.append("description", projectData.description);
  formData.append("stack", projectData.stack);
  formData.append("level", projectData.level);

  projectData.languages.forEach(lang => formData.append("languages", Number(lang)));

  // Check if the image exists and is a valid file
  if (projectData.image && projectData.image.length > 0) {
    const imageFile = projectData.image[0];
    console.log("Appending image:", imageFile);
    formData.append("image", imageFile);
  }

  // Log FormData content
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    const response = await api.post(PROJECT_URLS.CREATE_PROJECT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch Projects
export const getProjects = async () => {
  try {
    const response = await api.get(PROJECT_URLS.GET_PROJECTS);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error.response?.data || error.message);
    throw error;
  }
};
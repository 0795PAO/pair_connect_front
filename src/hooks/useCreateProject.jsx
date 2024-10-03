import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '@/services/projectService';

import api from '@/config/apiInterceptor';
import { PROJECT_URLS } from '@/config/apiUrls';

/* const createProject = async (projectData) => {
  const formData = new FormData();

  formData.append("name", projectData.name);
  formData.append("description", projectData.description);
  formData.append("stack", projectData.stack);
  formData.append("level", projectData.level);

  projectData.languages.forEach(lang => formData.append("languages", Number(lang)));

  // Check if the image exists and is a valid file
  if (projectData.image && projectData.image.length > 0) {
    const imageFile = projectData.image[0];  // Ensure this is a File object
    console.log("Appending image:", imageFile);
    formData.append("image", imageFile);
  } else {
    console.error("No valid image file detected.");
  }

  // Log the contents of FormData before sending it
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
}; */

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });
};
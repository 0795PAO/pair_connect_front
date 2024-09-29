import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/config/apiInterceptor';
import { PROJECT_URLS } from '@/config/apiUrls';

const createProject = async (projectData) => {
  const formData = new FormData();

  formData.append("name", projectData.name);
  formData.append("description", projectData.description);
  formData.append("stack", projectData.stack);
  formData.append("level", projectData.level);

  projectData.languages.forEach(lang => formData.append("languages", Number(lang)));

  if (projectData.image && projectData.image.length > 0) {
    formData.append("image", projectData.image[0]);
  }

  if (projectData.image) {
    if (projectData.image instanceof File) {
      console.log("Appending image:", projectData.image); // Verify if the image is a File object
      formData.append("image", projectData.image);
    } else {
      console.error("No valid image file detected.");
    }
  }
  
  // Log the contents of FormData before sending it
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  const response = await api.post(PROJECT_URLS.CREATE_PROJECT, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

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
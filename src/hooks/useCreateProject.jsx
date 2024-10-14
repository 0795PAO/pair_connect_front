import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '@/services/projectService';

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
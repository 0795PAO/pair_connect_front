import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '@/components/project/ProjectForm';
import { useStacks } from '@/hooks/useStacks';
import { useLevels } from '@/hooks/useLevels';
import { useLanguages } from '@/hooks/useLanguages';
import { useCreateProject } from '@/hooks/useCreateProject';
import Loader from '@/components/shared/Loader';
import { useQueryClient } from '@tanstack/react-query';
import { useMousePosition } from "@/hooks/useMousePosition";
import { useProjectDetails } from '@/hooks/useProjectDetails';


const ProjectFormPage = () => {
  const navigate = useNavigate();
  const { elementRef } = useMousePosition();
  const queryClient = useQueryClient();

  const { data: stacks, isLoading: isStacksLoading } = useStacks();
  const { data: levels, isLoading: isLevelsLoading } = useLevels();
  const { data: languages, isLoading: isLanguagesLoading } = useLanguages();
  const [newProjectId, setNewProjectId] = useState(null);
  const [showForm, setShowForm] = useState(false); //for logging purposes - delete after

  const createProjectMutation = useCreateProject();

  const handleFormSubmit = (formData) => {
    
    //for logging purposes - delete after
    console.log('Form data submitted:', formData);
    if (formData.image && formData.image.length > 0) {
      console.log("Image file:", formData.image[0]);
    } else {
      console.log("No image file selected.");
    }

    createProjectMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log("Project created:", data); // Log the response to check the data object
        
        if (data?.id) {
          setNewProjectId(data.id); // Set the new project ID to track
          queryClient.invalidateQueries(['projects']);
        }
      },
      onError: (error) => {
        console.error('Error creating project:', error);
      },
    });
  };

  const handleCancel = () => {
    navigate('/projects');
  };

  useEffect(() => {
    if (!isStacksLoading && !isLevelsLoading && !isLanguagesLoading) {
      setShowForm(true);
    }
  }, [isStacksLoading, isLevelsLoading, isLanguagesLoading]);

  // Fetch the new project details when the new project ID is set
  const { isLoading: isProjectLoading, data: newProjectData } = useProjectDetails(newProjectId, {
    enabled: !!newProjectId // Fetch only when newProjectId is set
  });

  useEffect(() => {
    // When the project details are fetched, navigate to the project page
    if (newProjectData && newProjectId) {
      navigate(`/projects/${newProjectId}`);
    }
  }, [newProjectData, newProjectId, navigate]);

  // If any data is loading, show the loader
  if (isStacksLoading || isLevelsLoading || isLanguagesLoading || isProjectLoading) {
    return <Loader />;
  }

  return (
    <>
        {showForm ? (
            <section className="my-8 flex flex-col items-center justify-center gap-5 text-center">
                <h1 className="font-bold text-3xl">Crea tu proyecto</h1>
                <div className="border rounded-lg w-[80vw] mouse-light-effect md:w-[60vw]" ref={elementRef}>
                    <div className="card-with-light-effect p-5">
                        <ProjectForm
                            handleSubmit={handleFormSubmit}
                            loading={createProjectMutation.isLoading}
                            options={{ stacks, levels, languages }}
                            onCancel={handleCancel}
                        />
                    </div>
                </div>
            </section>
        ) : (
            <p>Loading form data...</p>
        )}
    </>
);
};

export default ProjectFormPage;
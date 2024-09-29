import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '@/components/project/ProjectForm';
import { useStacks } from '@/hooks/useStacks';
import { useLevels } from '@/hooks/useLevels';
import { useLanguages } from '@/hooks/useLanguages';
import { useCreateProject } from '@/hooks/useCreateProject';
import Loader from '@/components/shared/Loader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMousePosition } from "@/hooks/useMousePosition";


const ProjectFormPage = () => {
  const navigate = useNavigate();
  const { elementRef } = useMousePosition();
  const queryClient = useQueryClient();

  const { data: stacks, isLoading: isStacksLoading } = useStacks();
  const { data: levels, isLoading: isLevelsLoading } = useLevels();
  const { data: languages, isLoading: isLanguagesLoading } = useLanguages();

  const [showForm, setShowForm] = useState(false);

  const createProjectMutation = useCreateProject();

  const handleFormSubmit = (formData) => {
    createProjectMutation.mutate(formData, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['projects']);
            navigate(`/projects/${data.id}`);
        },
        onError: (error) => {
            console.error('Error creating project:', error);
        }
    });
  };

  useEffect(() => {
    if (!isStacksLoading && !isLevelsLoading && !isLanguagesLoading) {
      setShowForm(true);
    }
  }, [isStacksLoading, isLevelsLoading, isLanguagesLoading]);

  // If any data is loading, show the loader
  if (isStacksLoading || isLevelsLoading || isLanguagesLoading) {
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
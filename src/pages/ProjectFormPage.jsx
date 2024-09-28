import ProjectForm from '@/components/project/ProjectForm';
import { useNavigate } from 'react-router-dom';
import { useMousePosition } from "@/hooks/useMousePosition";

const ProjectFormPage = () => {
  const navigate = useNavigate();
  const { elementRef } = useMousePosition()

  const handleProjectCreated = (newProject) => {
    // Optionally, redirect to the project details page or back to the projects list
    navigate(`/projects/${newProject.id}`);
  };

  return (
    <>
      <section className="my-8 flex flex-col items-center justify-center gap-5 text-center">
          <h1 className="text-2xl font-bold mb-4">Crea tu proyecto</h1>
      </section>
      
      <section className="flex flex-col items-center justify-center gap-5 text-center w-[80vw] md:w-[60vw]">
        <div
          className="border rounded-lg  w-[80vw] mouse-light-effect md:w-[60vw] " ref={elementRef}
        >
          <div className="card-with-light-effect p-5" >
            <ProjectForm
              onClose={() => navigate('/projects')}
              onProjectCreated={handleProjectCreated}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectFormPage;
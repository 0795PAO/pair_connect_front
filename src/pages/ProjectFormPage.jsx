import ProjectForm from '@/components/projects/ProjectForm';
import { useNavigate } from 'react-router-dom';

const ProjectFormPage = () => {
  const navigate = useNavigate();

  const handleProjectCreated = (newProject) => {
    // Optionally, redirect to the project details page or back to the projects list
    navigate(`/projects/${newProject.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <ProjectForm
        onClose={() => navigate('/projects')}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default ProjectFormPage;
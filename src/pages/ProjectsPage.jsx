import { Button } from "@/components/ui/button";
import ProjectList from "@/components/project/ProjectList";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useProjects } from "@/hooks/useProjects"; 
import { useEffect } from 'react';

const ProjectsPage = () => {
  const { data: user, isLoading: isProfileLoading, isError: isProfileError } = useProfile();
  const { data: projects, isLoading: isProjectsLoading, isError: isProjectsError, error: projectsError } = useProjects();
  const navigate = useNavigate(); 

  useEffect(() => {
    console.log("Projects data:", projects);
    console.log("User data:", user);
  }, [projects, user]);

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`);
  };

  const handleCreateProject = () => {
      navigate("/projects/create");  // Redirect to the form page
  };

  // Determine which projects belong to the current user
  const userProjects = (projects && user) 
  ? projects.filter(project => project.owner_id === user.id)
  : [];
  
  if (isProfileLoading || isProjectsLoading) {
      return <p>Loading profile and projects...</p>; // Show a loader until both profile and projects are fetched
  }

  if (isProfileError || isProjectsError) {
      return <p>Error fetching data: {projectsError ? projectsError.message : "Profile fetch failed"}</p>;
  }

  return (
    <>
      {/* Greeting Section (Always visible) */}
      <section className="w-full py-4 flex flex-col items-center text-center">
        {!isProfileLoading && user && (
          <h1 className="text-3xl font-bold">Hola, {user.username}</h1>
        )}
      </section>

      {/* Main Section */}
      <section className="mt-8">
        <div className="container mx-auto p-8 border rounded-lg">
          <h2 className="text-3xl font-bold pb-4">Tus proyectos </h2>
          <div className="items-center">
            {/* Check if user has projects */}
            {userProjects.length === 0 ? (
              <div className="text-center">
                <p className="text-lg mb-4">Todavía no tienes proyectos creados</p>
              </div>
            ) : (
              <ProjectList projects={userProjects} onProjectClick={handleProjectClick} />
            )}
          </div>
        </div>
        {/* "Crear Proyecto" Button (Always visible) */}
        <div className="text-center mt-8">
          <Button onClick={handleCreateProject}>Crear Proyecto</Button>
        </div>
      </section>
  </>
  );
};

export default ProjectsPage
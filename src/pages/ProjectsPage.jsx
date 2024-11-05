import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useProjects } from "@/hooks/useProjects";
import { deleteProject } from "@/services/projectService";
import ProjectList from "@/components/project/ProjectList";
import Loader from "@/components/shared/Loader";

const ProjectsPage = () => {
  const {
    data: user,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfile();
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
    refetch,
  } = useProjects();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Projects data:", projects);
    console.log("User data:", user);
  }, [projects, user]);

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`);
  };

  const handleCreateProject = () => {
    navigate("/projects/create");
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      refetch();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const userProjects =
    projects && user
      ? projects.filter((project) => project.owner_id === user.id)
      : [];

  if (isProfileLoading || isProjectsLoading) {
    return <Loader />;
  }

  if (isProfileError || isProjectsError) {
    return (
      <p>
        Error fetching data:{" "}
        {projectsError ? projectsError.message : "Error al recuperar el perfil"}
      </p>
    );
  }

  return (
    <>
      <section className="container mx-auto px-4 py-6 sm:px-6 md:px-8 max-w-[100rem]">
        <div className="container max-w-full px-2 py-6 mx-auto sm:px-6 md:px-8">
          <h2 className="pb-4 text-3xl font-bold text-left">Tus proyectos</h2>
          <div className="items-center">
            {userProjects.length === 0 ? (
              <div className="text-center">
                <p className="mb-4 text-lg">Todavía no tienes proyectos creados</p>
              </div>
            ) : (
              <ProjectList
                projects={userProjects}
                onProjectClick={handleProjectClick}
                onProjectDelete={handleDeleteProject}
              />
            )}
          </div>
        </div>

        <div className="mt-8 mb-8 text-center">
          <Button onClick={handleCreateProject}>Crear Proyecto</Button>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage

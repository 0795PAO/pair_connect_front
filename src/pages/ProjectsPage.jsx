import { Button } from "@/components/ui/button";
import ProjectList from "@/components/project/ProjectList";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useProjects } from "@/hooks/useProjects";
import { useEffect } from "react";
import { deleteProject } from "@/services/projectService";
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
      <section className="sticky z-10 w-full px-8 py-4 top-16">
        {!isProfileLoading && user && (
          <h1 className="text-3xl font-bold text-left">
            Hola, {user.username}
          </h1>
        )}
      </section>

      <section className="mt-8">
        <div className="container p-8 border rounded-lg">
          <h2 className="pb-4 text-3xl font-bold">Tus proyectos </h2>
          <div className="items-center">
            {userProjects.length === 0 ? (
              <div className="text-center">
                <p className="mb-4 text-lg">
                  Todavía no tienes proyectos creados
                </p>
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
        <div className="mt-8 text-center">
          <Button onClick={handleCreateProject}>Crear Proyecto</Button>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage

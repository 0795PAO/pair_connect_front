import { useState } from "react";
import { useParams } from "react-router-dom"; // To access the project ID from the URL
import { useProjectDetails } from "@/hooks/useProjectDetails";
import Loader from "@/components/shared/Loader";
import SessionList from "@/components/session/SessionList";
import SessionForm from "../session/SessionForm";

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from the URL
  const { data: project, isLoading, isError } = useProjectDetails(id); // Fetch project details
  const [isCreatingSession, setIsCreatingSession] = useState(false); // Control form visibility

  // Handle loading state
  if (isLoading) {
    return <Loader />;
  }

  // Handle error state
  if (isError || !project) {
    return <p>Error loading project or project not found.</p>;
  }

  // Handle toggling session creation form
  const handleCreateSessionClick = () => {
    setIsCreatingSession(true); // Show the session creation form
  };

  const handleSessionCreated = (newSessionData) => {
    setIsCreatingSession(false); // Hide the form once the session is created
    console.log("Session created:", newSessionData);
    // Here you can implement logic to refetch or update sessions
  };

  // Check if the project has sessions
  const hasSessions = project.sessions && project.sessions.length > 0;

  // Project image URL or default image if none is provided
  const projectImage = project.image_url || "/default_project_image.png";

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="container mx-auto p-4 space-y-8">
      {/* Title and Image Section */}
      <h1 className="text-4xl font-bold">Detalles del proyecto</h1>
      <div className="flex flex-col md:flex-row items-start p-8 border rounded-lg">
        {/* Left Section: Project Image */}
        <img
          src={projectImage}
          alt="Project"
          className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover rounded-lg md:mr-6"
        />

        {/* Right Section: Title, Description, and Required Skills */}
        <div className="flex-grow flex flex-col justify-between md:text-left h-full">
          <h2 className="text-4xl font-bold mb-4">{project.name}</h2>
          <h3 className="text-2xl font-semibold">Sobre el proyecto:</h3>
          <p className="text-lg mb-4">{project.description}</p>
          
          {/* Required Skills Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Competencias del proyecto:</h2>
            <p>Stack: {project.stack_name}</p>
            <p>Languages & Frameworks: {project.language_names.join(", ")}</p>
            <p>Nivel: {project.level_name}</p>
          </section>
        </div>
      </div>
      
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Sesiones</h2>
        {hasSessions ? (
          <>
            <SessionList sessions={project.sessions} />
            <button
              className="mt-4 bg-primary text-white p-2 rounded-lg"
              onClick={handleCreateSessionClick}
            >
              Crear nueva sesión
            </button>
          </>
        ) : (
          <>
            <p className="text-lg mb-4">Crea tu primera sesión</p>
            <button
              className="bg-primary text-white p-2 rounded-lg"
              onClick={handleCreateSessionClick}
            >
              Crear sesión
            </button>
          </>
        )}
      </section>

      {/* Show the form if creating a new session */}
      {isCreatingSession && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Programar nueva sesión</h2>
          <SessionForm project={project} onSessionCreated={handleSessionCreated} />
        </section>
      )}
    </div>
    </div>
  );
};

export default ProjectDetails;
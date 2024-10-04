import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import Loader from "@/components/shared/Loader";
import SessionList from "@/components/session/SessionList";
import SessionForm from "../session/SessionForm";
import { Edit, Trash, ArrowLeft } from "lucide-react";
import ConfirmModal from "../shared/ModalConfirm";
import { deleteProject } from "@/services/projectService"; 

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from the URL
  const { data: project, isLoading, isError } = useProjectDetails(id); // Fetch project details
  const [isCreatingSession, setIsCreatingSession] = useState(false); // Control form visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !project) {
    return <p>Error loading project or project not found.</p>;
  }

  const handleEditClick = () => {
    navigate(`/projects/edit/${project.id}`); // Navigate to the project edit page
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProject(id);
      navigate("/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  const handleCreateSessionClick = () => {
    setIsCreatingSession(true);
  };

  const handleSessionCreated = (newSessionData) => {
    setIsCreatingSession(false); // Hide the form once the session is created
    console.log("Session created:", newSessionData);
    // implement logic to refetch or update sessions here
  };

  // Check if the project has sessions
  const hasSessions = project.sessions && project.sessions.length > 0;

  // Project image URL or default image if none is provided
  const projectImage = project.image_url || "/default_project_image.png";

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="container mx-auto p-4 space-y-8">
      <button
        onClick={() => navigate("/projects")}
        className="text-white hover:text-primary flex items-center"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver a mis proyectos
      </button>

      {/* Title and Image Section */}
      <h1 className="text-4xl gradient2-text font-bold">Detalles del proyecto</h1>
      <div className="flex flex-col md:flex-row items-start p-8 border rounded-lg">
        {/* Left Section: Project Image */}
        <img
          src={projectImage}
          alt="Project"
          className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover rounded-lg md:mr-6"
        />

        {/* Right Section: Title, Description, and Required Skills */}
        <div className="flex-grow flex flex-col justify-between md:text-left h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold mb-4">{project.name}</h2>
            <div className="flex space-x-4">
                <button
                  onClick={handleEditClick}
                  className="text-primary hover:text-muted"
                >
                  <Edit className="w-6 h-6" />
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="text-secondary hover:text-red-700"
                >
                  <Trash className="w-6 h-6" />
                </button>
              </div>
          </div>
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
              className="bg-primary text-black p-2 rounded-lg"
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

      {/* Confirmation Modal */}
      <ConfirmModal
          title="Confirmación borrar proyecto"
          message={`¿Estás seguro de que quieres borrar el proyecto "${project.name}"?`}
          border_color="border-red-600"
          open={isModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleModalClose}
          confirmButtonText="Borrar"
        />
    </div>
    </div>
  );
};

export default ProjectDetails;
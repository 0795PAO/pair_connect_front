import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { useStacks } from "@/hooks/useStacks";
import { useLevels } from "@/hooks/useLevels";
import { useLanguages } from "@/hooks/useLanguages";
import Loader from "@/components/shared/Loader";
import OwnerSessionList from "../session/OwnerSessionList";
import SessionForm from "../session/SessionForm";
import { Edit, Trash, ArrowLeft } from "lucide-react";
import ConfirmModal from "../shared/ModalConfirm";
import { deleteProject, updateProjectImage, updateProject } from "@/services/projectService"; 
import { useQueryClient } from '@tanstack/react-query';
import UpdateProjectForm from '@/components/project/UpdateProjectForm';

const ProjectDetails = () => {
  const queryClient = useQueryClient();
  const { id } = useParams(); // Get project ID from the URL
  const navigate = useNavigate();
  const { data: project, isLoading, isError } = useProjectDetails(id); // Fetch project details
  const { data: stacks } = useStacks();
  const { data: levels } = useLevels();
  const { data: languages } = useLanguages();
  const [projectImage, setProjectImage] = useState(project?.image_url || "/default_project_image.png");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false); // Control form visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  

  useEffect(() => {
    if (project && project.image_url) {
      setProjectImage(project.image_url);
    }
  }, [project]);

  if (isLoading) return <Loader />;
  if (isError || !project) return <p>Error loading project or project not found.</p>;

  const handleEditClick = () => {
    setIsEditing(true);
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

  const handleFormSubmit = async (updatedData) => {
    try {
      const updatedProject = await updateProject(id, updatedData);
      console.log("Project updated successfully:", updatedProject);
      setIsEditing(false); // Close the form after submitting
      queryClient.invalidateQueries(['projects']); // Invalidate to refetch the updated project list
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const matchedStack = stacks?.find(s => s.label === project.stack_name)?.value || ""; 
  const matchedLanguages = project.language_names
    ? project.language_names.map(lang => languages?.find(l => l.label === lang)?.value || "")
    : [];
  const matchedLevel = levels?.find(l => l.label === project.level_name)?.value || "";

  const handleCreateSessionClick = () => {
    setIsCreatingSession(true);
  };

  const handleCancelSessionCreation = () => {
    setIsCreatingSession(false);
  };

  const handleSessionCreated = (sessionData) => {
    setIsCreatingSession(false);
    console.log("Session created:", sessionData);
    queryClient.invalidateQueries(['projectDetails', id]);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const updatedProject = await updateProjectImage(id, formData); 
        setProjectImage(updatedProject.image_url); // Update the image URL locally in state
        
        // Invalidate the 'projects' query to refetch the updated project list
        queryClient.invalidateQueries(['projects']);
      } catch (error) {
        console.error("Error updating project image:", error);
      }
    }
  };

  // Trigger the file input dialog
  const handleEditImageClick = () => {
    fileInputRef.current.click();
  };

  // Check if the project has sessions
  const hasSessions = project.sessions && project.sessions.length > 0;

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
        <div className="relative">
            <img
              src={projectImage}
              alt="Project"
              className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover rounded-lg md:mr-6"
            />
            <button
              className="absolute bottom-2 right-2 bg-muted text-white hover:text-primary p-2 rounded-full"
              onClick={handleEditImageClick} // Trigger file input dialog
            >
              <Edit className="w-5 h-5" />
            </button>
            {/* Hidden file input for image selection */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

        {/* Right Section: Title, Description, and Required Skills */}
        <div className="flex-grow flex flex-col justify-between md:text-left h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold mb-4">{project.name}</h2>
            <div className="flex space-x-4">
                <button
                  onClick={handleEditClick}
                  className="text-white hover:text-primary"
                >
                  <Edit className="w-6 h-6" />
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="text-white hover:text-secondary"
                >
                  <Trash className="w-6 h-6" />
                </button>
              </div>
          </div>

          {/* Conditionally render the UpdateProjectForm */}
          {isEditing && stacks && languages && levels ? (
          <UpdateProjectForm
            handleSubmit={handleFormSubmit}
            loading={false} 
            options={{
              stacks: stacks,
              languages: languages,
              levels: levels,
            }}
            defaultValues={{
              name: project.name,
              description: project.description,
              stack: matchedStack, 
              languages: matchedLanguages, 
              level: matchedLevel,
            }}
              onCancel={() => setIsEditing(false)}  // Close the form on cancel
            />
          ) : (
            <>
              <h3 className="text-2xl font-semibold">Sobre el proyecto:</h3>
              <p className="text-lg mb-4">{project.description}</p>
            
              {/* Required Skills Section */}
              <section className="mt-8">
                <h2 className="text-2xl font-semibold">Competencias del proyecto:</h2>
                <p>Stack: {project.stack_name}</p>
                <p>Languages & Frameworks: {project.language_names.join(", ")}</p>
                <p>Nivel: {project.level_name}</p>
              </section>
            </>
          )}
        </div>
      </div>
      

      {/* Sessions section */}
      <section className="mt-8 ">
        <h2 className="text-4xl font-semibold gradient3-text">Sesiones</h2>
        <div className="flex flex-col lg:flex-row gap-8 mt-4 p-4">
          {/* Left column: Session List */}
          <div className="flex-1">
              {!isCreatingSession && (
                <button
                  className="bg-primary text-black p-2 rounded-lg mb-4"
                  onClick={handleCreateSessionClick}
                >
                  Crear nueva sesión
                </button>
              )}
              {project.sessions && project.sessions.length > 0 ? (
                <OwnerSessionList
                  sessions={project.sessions}
                  loading={isLoading}
                  error={isError}
                  projectImageUrl={project.image_url}
                />
              ) : (
                <p className="text-lg mb-4">Crea tu primera sesión</p>
              )}
            </div>
          
          {/* Right column */}
          <div className="flex-1">
            {isCreatingSession && stacks && languages && (
              <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Programar nueva sesión</h2>
                <SessionForm
                  options={{ stacks, languages }}
                  projectStack={project.stack_name}
                  projectLanguages={project.language_names}
                  projectId={project.id}
                  projectLevelId={matchedLevel}
                  stacks={stacks}
                  languages={languages}
                  onSessionCreated={handleSessionCreated}
                  onCancel={handleCancelSessionCreation}
                />
              </section>
            )}
          </div>
        </div>
      </section>

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
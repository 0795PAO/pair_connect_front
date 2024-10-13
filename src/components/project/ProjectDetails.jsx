import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { useStacks } from "@/hooks/useStacks";
import { useLevels } from "@/hooks/useLevels";
import { useLanguages } from "@/hooks/useLanguages";
import { useProfile } from "@/hooks/useProfile";
import { useQueryClient } from '@tanstack/react-query';
import { Edit, Trash, ArrowLeft } from "lucide-react";
import { deleteProject, updateProjectImage, updateProject } from "@/services/projectService";
import { getInterestedParticipantsPerSession } from "@/services/participantsService";
import { findMatchedValues } from "@/utils/findMatchedValues";
import Loader from "@/components/shared/Loader";
import ConfirmModal from "@/components/shared/ModalConfirm";
import SectionCard from "@/components/profile/SectionCard";
import UpdateProjectForm from '@/components/project/UpdateProjectForm';
import OwnerSessionList from "@/components/session/OwnerSessionList";
import SessionForm from "@/components/session/SessionForm";

const ProjectDetails = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: project, isLoading, isError } = useProjectDetails(id);
  const { data: stacks } = useStacks();
  const { data: levels } = useLevels();
  const { data: languages } = useLanguages();
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useProfile();

  const [projectImage, setProjectImage] = useState(project?.image_url || "/default_project_image.png");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (project) {
      if (project.image_url) {
        setProjectImage(project.image_url);
      }

      if (project.sessions) {
        const fetchInterestedUsers = async () => {
          const sessionsWithInterestedUsers = await Promise.all(
            project.sessions.map(async (session) => {
              try {
                const interestedUsers = await getInterestedParticipantsPerSession(session.id);
                return { ...session, interested_users: interestedUsers };
              } catch (error) {
                console.error("Error fetching interested participants for session:", session.id, error);
                return { ...session, interested_users: [] };
              }
            })
          );
          setSessions(sessionsWithInterestedUsers);
        };

        fetchInterestedUsers();
      }
    }
  }, [project]);


  if (isLoading) return <Loader />;
  if (isError || !project) return <p>Error loading project or project not found.</p>;

  if (isUserLoading) return <Loader />;
  if (isUserError || !user) return <p>Error al cargar el perfil o el usuario no existe.</p>;

  const { matchedStack, matchedLanguages, matchedLevel } = findMatchedValues(project, stacks, languages, levels);

  const handleEditClick = () => {
    setIsEditing(true);
  };

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
      setIsEditing(false);
      queryClient.invalidateQueries(['projects']);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const updatedProject = await updateProjectImage(id, formData);
        setProjectImage(updatedProject.image_url);
        queryClient.invalidateQueries(['projects']);
      } catch (error) {
        console.error("Error updating project image:", error);
      }
    }
  };

  const handleEditImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container mx-auto max-w-[90rem] px-4 sm:px-6 py-4">
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center mt-0 mb-4 text-white hover:text-primary"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver a mis proyectos
      </button>

      <h1 className="mb-10 text-4xl font-bold leading-none md:text-6xl gradient2-text" style={{ lineHeight: '1.2' }}>
        Detalles del proyecto
      </h1>

      <section className="grid grid-cols-1 gap-6 mb-10 lg:grid-cols-3">
        <div className="col-span-1 p-6 rounded-lg shadow-lg bg-card">
          <h2 className="mt-4 mb-4 text-xl font-bold text-center transition duration-300 sm:text-2xl md:text-3xl lg:text-3xl hover:text-secondary text-textPrimary">
            {project.name}
          </h2>
          <div className="relative ">
            <div className="w-full overflow-hidden rounded-lg aspect-w-16 aspect-h-9">
              <img
                src={projectImage}
                alt="Project"
                className="object-cover object-center w-full h-full"
              />
            </div>
            <button
              className="absolute p-2 text-white rounded-full bottom-2 right-2 bg-muted hover:text-primary"
              onClick={handleEditImageClick}
            >
              <Edit className="w-5 h-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="relative p-6 rounded-lg shadow-lg lg:col-span-2 bg-card">
          {isEditing ? (
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
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <h2 className="mb-4 text-2xl font-semibold transition duration-300 hover:text-secondary text-textPrimary">
                Sobre el proyecto
              </h2>
              <p className="text-lg text-white">{project.description}</p>

              <div className="absolute flex space-x-2 top-4 right-4">
                <button onClick={handleEditClick} className="text-white hover:text-primary">
                  <Edit className="w-6 h-6" />
                </button>
                <button onClick={() => setIsModalOpen(true)} className="text-white hover:text-secondary">
                  <Trash className="w-6 h-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="relative mt-6 rounded-lg bg-card" aria-labelledby="languages-title">
        <div className="p-6 mt-6 shadow-lg lg:col-span-2">
          <h2 id="languages-title" className="mb-6 text-2xl font-semibold transition duration-300 hover:text-secondary text-textPrimary">
            Lenguajes y Frameworks
          </h2>
          <ul className="flex flex-wrap gap-4">
            {project?.language_names?.length > 0 ? (
              project.language_names.map((language, index) => (
                <li
                  key={index}
                  className=" text-black py-2 px-4 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] font-semibold shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
                  {language}
                </li>
              ))
            ) : (
              <li>No hay lenguajes o frameworks definidos.</li>
            )}
          </ul>
        </div>
      </section>

      <section className="relative mt-6" aria-labelledby="stack-nivel-title">
        <h2 id="stack-nivel-title" className="sr-only">Stack y Nivel</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <SectionCard
            title="Stack"
            content={project.stack_name ? project.stack_name : "Stack no definido 🚀"}
          />
          <SectionCard
            title="Nivel"
            content={project.level_name ? project.level_name : "Nivel no definido 🧑‍💻"}
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-4xl font-semibold gradient3-text">Sesiones</h2>
        <div className="flex flex-col gap-8 p-4 mt-4 lg:flex-row">
          <div className="flex-1">
            {!isCreatingSession && (
              <button
                className="p-2 mb-4 text-black rounded-lg bg-primary"
                onClick={handleCreateSessionClick}
              >
                Crear nueva sesión
              </button>
            )}
            {project.sessions && project.sessions.length > 0 ? (
              <OwnerSessionList
                sessions={sessions}
                loading={isLoading}
                error={isError}
                projectImageUrl={project.image_url}
                projectId={project.id}
              />
            ) : (
              <p className="mb-4 text-lg">Crea tu primera sesión</p>
            )}
          </div>

          <div className="flex-1">
            {isCreatingSession && stacks && languages && (
              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold">Programar nueva sesión</h2>
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
  );
};

export default ProjectDetails

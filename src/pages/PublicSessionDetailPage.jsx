import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { useFutureSessions } from "@/hooks/useFutureSessions";
import HeroButton from "@/components/landing/HeroButton";
import { useAuth } from "@/hooks/useAuth";
import RegisterDialog from "@/components/auth/RegisterDialog";
import { useRegister } from "@/hooks/useRegister";
import { ArrowLeft } from "lucide-react"; // Asegúrate de importar ArrowLeft

const PublicSessionDetailPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { handleRegister, loading } = useRegister();
  const { isAuthenticated } = useAuth();

  const {
    data: sessionData,
    isLoading: isSessionLoading,
    isError: isSessionError,
  } = useSessionDetails(sessionId);

  const {
    data: projectData,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useProjectDetails(sessionData?.project_id);

  const { data: futureSessions } = useFutureSessions(
    projectData?.id,
    sessionData?.schedule_date_time
  );

  useEffect(() => {
    if (!sessionId) {
      console.error("Session ID no está disponible");
    }
  }, [sessionId]);

  if (isSessionError || isProjectError) {
    return (
      <p>Hubo un error al cargar los detalles de la sesión o el proyecto.</p>
    );
  }

  if (!projectData || !sessionData) {
    return <p>No se encontraron datos para este proyecto o sesión.</p>;
  }

  const projectOwnerId = projectData.owner_id;
  const projectOwnerName = projectData.owner_name;
  const projectOwnerAvatar = projectData.owner_avatar_url;

  return (
    <div className="pt-0 mt-0 p-4 sm:p-6 mx-auto mb-6 w-full max-w-full">
      <button
        onClick={() => navigate("/")}
        className="text-white hover:text-primary flex items-center"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver atras
      </button>

      <h1 className="text-4xl sm:text-7xl md:text-9xl lg:text-10xl xl:text-10xl font-bold mb-2 text-center gradient2-text">
        {projectData.name}
      </h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col items-start p-3 sm:p-5 text-base sm:text-lg flex-1 justify-between">
          <div className="w-full bg-card text-card-foreground my-1 mb-1 cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-800 p-4">
            <img
              src={projectData.image_url ? projectData.image_url : "/neon2.png"}
              alt="proyecto"
              className="w-full h-full object-cover mb-4 rounded-lg"
            />
          </div>

          <div className="w-full bg-card text-card-foreground my-1 mb-1 cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-800 p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-textPrimary">
              Sobre el proyecto:
            </h2>
            <p className="mb-4 sm:mb-6 text-left sm:text-lg md:text-xl">
              {projectData.description}
            </p>
          </div>

          {sessionData.description && (
            <div className="w-full bg-card text-card-foreground mb-1 cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-800 p-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-textPrimary">
                Descripción de la sesión:
              </h2>
              <p className="mb-4 sm:mb-6">{sessionData.description}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start p-3 sm:p-5 text-base sm:text-lg flex-1 justify-between">
          {sessionData.schedule_date_time && (
            <div className="w-full bg-card text-card-foreground my-1 mb-1 cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-800 p-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-textPrimary">
                Fecha de la sesión:
              </h2>
              <p className="mb-4 sm:mb-6">
                {new Date(sessionData.schedule_date_time).toLocaleString()}
              </p>
            </div>
          )}

          {sessionData.duration && (
            <div className="w-full bg-card text-card-foreground my-1 mb-1 cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-800 p-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-textPrimary">
                Duración de la sesión:
              </h2>
              <p className="mb-4 sm:mb-6">{sessionData.duration}</p>
            </div>
          )}

          {projectData.stack_name && (
            <div className="w-full bg-card text-card-foreground my-1 mb-1 cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-800 p-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-textPrimary">
                Stack de la sesión:
              </h2>
              <p className="mb-4 sm:mb-6">{projectData.stack_name}</p>
            </div>
          )}

          {Array.isArray(sessionData.language_names) &&
          sessionData.language_names.length > 0 ? (
            <div className="w-full bg-card text-card-foreground my-1 mb-1 cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-800 p-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-textPrimary">
                Lenguajes requeridos:
              </h2>
              <ul className="mb-4 sm:mb-6 flex flex-wrap gap-2">
                {sessionData.language_names.map((language, index) => (
                  <li
                    key={index}
                    className="py-1 px-3 rounded-full text-black font-bold shadow-lg hover-shadow-custom bg-gradient-to-r from-primary to-secondary transform"
                  >
                    {language}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-lg sm:text-xl font-bold my-8 mb-4 sm:mb-6">
              No se han especificado lenguajes para esta sesión.
            </p>
          )}

          <div className="w-full bg-card text-card-foreground my-1 mb-1 cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-800 p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-textPrimary">
              El perfil que se busca:
            </h2>
            <p className="mb-4 sm:mb-6">{sessionData.level_name}</p>
          </div>
        </div>
      </section>

      <div className="flex justify-center mt-8">
        <HeroButton onClick={() => setIsOpen(true)} text="Regístrate" />
      </div>
      <RegisterDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        handleSubmit={handleRegister}
        loading={loading}
      />
    </div>
  );
};

export default PublicSessionDetailPage;

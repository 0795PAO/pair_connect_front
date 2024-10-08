import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { useFutureSessions } from "@/hooks/useFutureSessions";
import HeroButton from "@/components/landing/HeroButton";
import { useAuth } from "@/hooks/useAuth";
import RegisterDialog from "@/components/auth/RegisterDialog";
import { useRegister } from "@/hooks/useRegister";
import Loader from "@/components/shared/Loader";
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

  console.log("Project data:", projectData);

  const { data: futureSessions } = useFutureSessions(
    projectData?.id,
    sessionData?.schedule_date_time
  );

  useEffect(() => {
    if (!sessionId) {
      console.error("Session ID no está disponible");
    }
  }, [sessionId]);

  if (isSessionLoading || isProjectLoading) {
    return <Loader />;
  }

  if (isSessionError || isProjectError) {
    return (
      <div className="pt-0 mt-0 p-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 mb-8 lg:pl-24 gap-8">
          <div className="flex flex-col items-start lg:items-start">
            <h1 className="text-6xl font-bold mb-6 text-left gradient2-text gradient2-text">
              {projectData.name}
            </h1>

            <img
              src={projectData.image_url ? projectData.image_url : "/neon2.png"}
              alt="proyecto"
              className="w-full lg:w-[500px] lg:mx-0 mx-auto mb-6 rounded-lg"
            />

            <h2 className="text-xl font-bold mb-4 text-left">
              Sobre el proyecto:
            </h2>
            <p className="mb-6 text-left">{projectData.description}</p>

            {isAuthenticated ? (
              projectOwnerId ? (
                <div className="mt-4 mb-4 lg:mt-6 lg:mb-6 text-left">
                  <h2 className="text-xl font-bold mb-4">
                    Responsable del proyecto:
                  </h2>
                  <div className="flex items-center space-x-4">
                    {projectOwnerAvatar && (
                      <img
                        src={projectOwnerAvatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <button
                      className="hover:text-primary transition-colors duration-300"
                      onClick={() =>
                        navigate(
                          `/profile/${projectOwnerId}/session/${sessionId}`
                        )
                      }
                    >
                      {projectOwnerName || "Nombre no disponible"}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mb-6">Información del dueño no disponible.</p>
              )
            ) : (
              <p className="mb-6">
                Inicia sesión para ver la información del dueño del proyecto.
              </p>
            )}
          </div>

          <div>
            {sessionData.description && (
              <>
                <h2 className="text-xl font-bold mb-4 lg:mb-6">
                  Descripción de la sesión:
                </h2>
                <p className="mb-4 lg:mb-6">{sessionData.description}</p>
              </>
            )}

            {sessionData.schedule_date_time && (
              <>
                <h2 className="text-xl font-bold mb-4 lg:mb-6">
                  Fecha de la sesión:
                </h2>
                <p className="mb-4 lg:mb-6">
                  {new Date(sessionData.schedule_date_time).toLocaleString()}
                </p>
              </>
            )}

            {sessionData.duration && (
              <>
                <h2 className="text-xl font-bold mb-4 lg:mb-6">
                  Duración de la sesión:
                </h2>
                <p className="mb-4 lg:mb-6">{sessionData.duration}</p>
              </>
            )}

            {projectData.stack_name && (
              <>
                <h2 className="text-xl font-bold mb-4 lg:mb-6">
                  Stack de la sesión:
                </h2>
                <p className="mb-4 lg:mb-6">{projectData.stack_name}</p>
              </>
            )}

            {Array.isArray(sessionData.language_names) &&
            sessionData.language_names.length > 0 ? (
              <>
                <h2 className="text-xl font-bold mb-4 lg:mb-6">
                  Lenguajes requeridos:
                </h2>
                <ul className="mb-4 lg:mb-6 flex flex-wrap gap-2">
                  {sessionData.language_names.map((language, index) => (
                    <li
                      key={index}
                      className="py-1 px-3 rounded-full text-black font-bold shadow-lg hover-shadow-custom bg-gradient-to-r from-primary to-secondary transform"
                    >
                      {language}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mb-4 lg:mb-6">
                No se han especificado lenguajes para esta sesión.
              </p>
            )}

            <h2 className="text-xl font-bold mb-4 lg:mb-6">
              El perfil que se busca:
            </h2>
            <p className="mb-4 lg:mb-6">{sessionData.level_name}</p>
          </div>
        </section>

        {futureSessions && futureSessions.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Futuras Sesiones</h2>
            <ul>
              {futureSessions.map((futureSession) => (
                <li key={futureSession.id}>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => navigate(`/sessions/${futureSession.id}`)}
                  >
                    {new Date(
                      futureSession.schedule_date_time
                    ).toLocaleString()}{" "}
                    - {futureSession.description}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="flex justify-center mt-8">
          <HeroButton onClick={() => setIsOpen(true)} text="Registrate" />
        </div>
        <RegisterDialog
          open={isOpen}
          onOpenChange={setIsOpen}
          handleSubmit={handleRegister}
          loading={loading}
        />
      </div>
    );
  }

  if (!projectData || !sessionData) {
    return <p>No se encontraron datos para este proyecto o sesión.</p>;
  }

  const projectOwnerId = projectData.owner_id;
  const projectOwnerName = projectData.owner_name;
  const projectOwnerAvatar = projectData.owner_avatar_url;

  return (
    <div className="pt-0 mt-0 p-6">
      <section className="grid grid-cols-1 lg:grid-cols-2 mb-8 lg:pl-24 gap-8">
        <div className="flex flex-col items-start lg:items-start">
          <h1 className="text-6xl font-bold mb-6 text-left gradient2-text gradient2-text">
            {projectData.name}
          </h1>

          <img
            src={projectData.image_url ? projectData.image_url : "/neon2.png"}
            alt="proyecto"
            className="w-full lg:w-[500px] lg:mx-0 mx-auto mb-6 rounded-lg"
          />

          <h2 className="text-xl font-bold mb-4 text-left">
            Sobre el proyecto:
          </h2>
          <p className="mb-6 text-left">{projectData.description}</p>

          {isAuthenticated ? (
            projectOwnerId ? (
              <div className="mt-4 mb-4 lg:mt-6 lg:mb-6 text-left">
                <h2 className="text-xl font-bold mb-4">
                  Responsable del proyecto:
                </h2>
                <div className="flex items-center space-x-4">
                  {projectOwnerAvatar && (
                    <img
                      src={projectOwnerAvatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <button
                    className="hover:text-primary transition-colors duration-300"
                    onClick={() => navigate(`/profile/${projectOwnerId}`)}
                  >
                    {projectOwnerName || "Nombre no disponible"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="mb-6">Información del dueño no disponible.</p>
            )
          ) : (
            <p className="mb-6">
              Inicia sesión para ver la información del dueño del proyecto.
            </p>
          )}
        </div>

        <div>
          {sessionData.description && (
            <>
              <h2 className="text-xl font-bold mb-4 lg:mb-6">
                Descripción de la sesión:
              </h2>
              <p className="mb-4 lg:mb-6">{sessionData.description}</p>
            </>
          )}

          {sessionData.schedule_date_time && (
            <>
              <h2 className="text-xl font-bold mb-4 lg:mb-6">
                Fecha de la sesión:
              </h2>
              <p className="mb-4 lg:mb-6">
                {new Date(sessionData.schedule_date_time).toLocaleString()}
              </p>
            </>
          )}

          {sessionData.duration && (
            <>
              <h2 className="text-xl font-bold mb-4 lg:mb-6">
                Duración de la sesión:
              </h2>
              <p className="mb-4 lg:mb-6">{sessionData.duration}</p>
            </>
          )}

          {projectData.stack_name && (
            <>
              <h2 className="text-xl font-bold mb-4 lg:mb-6">
                Stack de la sesión:
              </h2>
              <p className="mb-4 lg:mb-6">{projectData.stack_name}</p>
            </>
          )}

          {Array.isArray(sessionData.language_names) &&
          sessionData.language_names.length > 0 ? (
            <>
              <h2 className="text-xl font-bold mb-4 lg:mb-6">
                Lenguajes requeridos:
              </h2>
              <ul className="mb-4 lg:mb-6 flex flex-wrap gap-2">
                {sessionData.language_names.map((language, index) => (
                  <li
                    key={index}
                    className="py-1 px-3 rounded-full text-black font-bold shadow-lg hover-shadow-custom bg-gradient-to-r from-primary to-secondary transform"
                  >
                    {language}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mb-4 lg:mb-6">
              No se han especificado lenguajes para esta sesión.
            </p>
          )}

          <h2 className="text-xl font-bold mb-4 lg:mb-6">
            El perfil que se busca:
          </h2>
          <p className="mb-4 lg:mb-6">{sessionData.level_name}</p>
        </div>
      </section>

      {futureSessions && futureSessions.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Futuras Sesiones</h2>
          <ul>
            {futureSessions.map((futureSession) => (
              <li key={futureSession.id}>
                <button
                  className="text-blue-500 underline"
                  onClick={() => navigate(`/sessions/${futureSession.id}`)}
                >
                  {new Date(futureSession.schedule_date_time).toLocaleString()}{" "}
                  - {futureSession.description}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex justify-center mt-8">
        <HeroButton onClick={() => setIsOpen(true)} text="Registrate" />
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

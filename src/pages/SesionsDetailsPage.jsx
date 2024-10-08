import { useParams, useNavigate } from "react-router-dom";
import SimplePopUp from "@/components/shared/SimplePopUp";
import ItemList from "@/components/shared/ItemList";
import PopupWithInput from "@/components/shared/PopupWithInput";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { useFutureSessions } from "@/hooks/useFutureSessions";
import HeroButton from "@/components/landing/HeroButton";
import FutureSessionList from "@/components/session/FutureSessionList";
import useShowInterestInSession from "@/hooks/useShowInterestInSession";
import { useCheckIfInterested } from "@/hooks/useCheckIfInterested";
import { useGetInterestedUsers } from "@/hooks/useGetInterestedUsers";
const SessionsDetailsPage = () => {
  const { sessionId } = useParams();
  const { data: isInterested, isLoading: isInterestedLoading } = useCheckIfInterested(sessionId);
  const { data: intersetedParitcipants, isLoading: isInterestedParticipantsLoading } = useGetInterestedUsers(sessionId);
  console.log("isInterested:", isInterested);
  console.log("InterestedParticipants:", intersetedParitcipants);
  const {
    showPopup,
    showSignupPopup,
    message,
    setShowSignupPopup,
    closePopup,
    mutation,
  } = useShowInterestInSession();

  const navigate = useNavigate();

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

  if (isSessionLoading || isProjectLoading || isInterestedLoading || isInterestedParticipantsLoading) {
    return <p>Cargando los detalles de la sesión y del proyecto...</p>;
  }

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

  const saveMessage = (sessionId) => {
    mutation.mutate({ session: sessionId });
  };

  return (
    <div className="pt-0 mt-0 p-6">
      <section className="grid grid-cols-1 lg:grid-cols-2 mb-8 lg:pl-24 gap-8">
        <div className="flex flex-col items-start lg:items-start">
          <h1 className="text-6xl font-bold mb-6 text-left gradient2-text">
            {projectData.name}
          </h1>

          <img
            src={projectData.image_url}
            alt="proyecto"
            className="w-full lg:w-3/4 lg:mx-0 mx-auto mb-6 rounded-lg"
          />

          <h2 className="text-xl font-bold mb-4 text-left">
            Sobre el proyecto:
          </h2>
          <p className="mb-6 text-left">{projectData.description}</p>

          {projectOwnerId ? (
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
          )}
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
          <ItemList
            items={sessionData.language_names}
            title="Lenguajes requeridos"
          />

          <h2 className="text-xl font-bold mb-4 lg:mb-6">
            El perfil que se busca:
          </h2>
          <p className="mb-4 lg:mb-6">{sessionData.level_name}</p>
        </div>
      </section>

      {futureSessions && futureSessions.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Futuras Sesiones</h2>
          <FutureSessionList futureSessions={futureSessions} />
        </section>
      )}

      <div className="flex justify-center mt-8">
        {isInterested.is_interested ? (<p>Ya estas apuntado a esta sesión!</p>)
          :
          <HeroButton onClick={() => setShowSignupPopup(true)} text="Apúntate" />}
      </div>

      {showSignupPopup && (
        <PopupWithInput
          closePopup={closePopup}
          saveMessage={() => saveMessage(sessionId)}
          projectName={projectData.name}
          title={`¡Nos alegra ver que quieras apuntarte a la sesión del ${projectData.name}!`}
          subtitle="¿Quieres dejar un mensaje?"
          placeholder="Escribe un mensaje"
          closeButtonText="Volver"
          saveButtonText="Guardar"
        />
      )}

      {showPopup && (
        <SimplePopUp
          closePopup={closePopup}
          message={message}
          closeText="Cerrar"
        />
      )}
    </div>
  );
};

export default SessionsDetailsPage;

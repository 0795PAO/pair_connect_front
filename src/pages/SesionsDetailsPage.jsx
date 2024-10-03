import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import SimplePopUp from "@/components/shared/SimplePopUp";
import PopupWithInput from "@/components/shared/PopupWithInput";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import HeroButton from "@/components/landing/HeroButton";

const SessionsDetailsPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  console.log("Session ID:", sessionId);

  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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

  console.log(projectData);

  useEffect(() => {
    if (!sessionId) {
      console.error("Session ID no está disponible");
    }
  }, [sessionId]);

  if (isSessionLoading || isProjectLoading) {
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

  const openSignupPopup = () => {
    setShowSignupPopup(true);
  };

  const closePopup = () => {
    setShowSignupPopup(false);
    setShowSuccessPopup(false);
  };

  const saveMessage = (message) => {
    console.log("Mensaje guardado:", message);
    setShowSignupPopup(false);
    setShowSuccessPopup(true);
  };

  return (
    <div className="pt-0 mt-0 p-6">
      <section className="grid grid-cols-1 lg:grid-cols-2  mb-8 lg:pl-24 gap-8">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-6xl font-bold mb-6 text-center gradient2-text lg: text-center gradient2-text">
            {projectData.name}
          </h1>

          <img
            src={projectData.image_url}
            alt="proyecto"
            className="w-full lg:w-3/4 lg:mx-0 mx-auto mb-6 rounded-lg"
          />

          <h2 className="text-xl font-bold mb-4">Sobre el proyecto:</h2>
          <p className="mb-6">{projectData.description}</p>

          {projectOwnerId ? (
            <div className="mt-4 mb-4 lg:mt-6 lg:mb-6">
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

      <div className="flex justify-center mt-8">
        <HeroButton onClick={openSignupPopup} text="Apúntate" />
      </div>
      {showSignupPopup && (
        <PopupWithInput
          closePopup={closePopup}
          saveMessage={saveMessage}
          projectName={projectData.name}
          title={`¡Nos alegra ver que quieras apuntarte a la sesión del ${projectData.name}!`}
          subtitle="¿Quieres dejar un mensaje?"
          placeholder="Escribe un mensaje"
          closeButtonText="Volver"
          saveButtonText="Guardar"
        />
      )}

      {showSuccessPopup && (
        <SimplePopUp
          closePopup={closePopup}
          message="¡Tu mensaje ha sido enviado correctamente!"
          closeText="Cerrar"
        />
      )}
    </div>
  );
};

export default SessionsDetailsPage;
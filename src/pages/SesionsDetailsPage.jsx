import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import SimplePopUp from "@/components/shared/SimplePopUp";
import PopupWithInput from "@/components/shared/PopupWithInput";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { useProjectDetails } from "@/hooks/useProjectDetails";

const SesionsDetailsPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  console.log("Project ID:", projectId);

  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const {
    data: sessionData,
    isLoading: isSessionLoading,
    isError: isSessionError,
  } = useSessionDetails(projectId);
  const {
    data: projectData,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useProjectDetails(projectId);

  useEffect(() => {
    if (!projectId) {
      console.error("Project ID no está disponible");
    }
  }, [projectId]);

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

  // Filtrar futuras sesiones
  const futureSessions =
    sessionData.future_sessions?.filter(
      (session) => new Date(session.schedule_date_time) > new Date()
    ) || [];

  return (
    <div className="pt-0 mt-0 p-6">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{projectData.name}</h1>
        <p className="mb-4">{sessionData.schedule_date_time}</p>
        <img
          src={projectData.image_url}
          alt="proyecto"
          className="w-full mb-4 rounded-lg"
        />
        <h2 className="text-2xl font-bold mb-2">Sobre el proyecto:</h2>
        <p className="mb-4">{projectData.description}</p>

        {sessionData.description && (
          <>
            <h2 className="text-2xl font-bold mb-2">
              Descripción de la sesión:
            </h2>
            <p className="mb-4">{sessionData.description}</p>
          </>
        )}

        {projectData.stack_name && (
          <>
            <h2 className="text-2xl font-bold mb-2">Stack del proyecto:</h2>
            <p className="mb-4">{projectData.stack_name}</p>
          </>
        )}

        {/* Lenguajes independientes */}
        {sessionData.languages && sessionData.languages.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Lenguajes requeridos:</h2>
            <ul className="mb-4 list-disc list-inside">
              {sessionData.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </>
        )}

        <h2 className="text-2xl font-bold mb-2">El perfil que se busca:</h2>
        <p className="mb-4">{sessionData.level_name}</p>

        {/* Futuras Sesiones */}
        {futureSessions.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Futuras Sesiones:</h2>
            <ul className="mb-4 list-disc list-inside">
              {futureSessions.map((session, index) => (
                <li key={index}>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => navigate(`/sessions/${session.id}`)}
                  >
                    {session.schedule_date_time} - {session.name}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Información del Dueño del Proyecto */}
        {projectData.owner && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">
              Información del Dueño del Proyecto:
            </h2>
            <button
              className="text-blue-500 underline"
              onClick={() => navigate(`/profile/${projectData.owner.id}`)}
            >
              {projectData.owner.name}
            </button>
          </div>
        )}
      </section>

      <Button
        onClick={openSignupPopup}
        className="w-[30%] mx-auto my-auto flex justify-center items-center"
      >
        Apúntate
      </Button>

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

export default SesionsDetailsPage;

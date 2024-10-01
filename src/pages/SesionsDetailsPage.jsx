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
        <h1 className="text-3xl font-bold mb-2 text-center">
          {projectData.name}
        </h1>
        <p className="mb-4">{sessionData.schedule_date_time}</p>
        <img
          src={projectData.image_url}
          alt="proyecto"
          className="w-full mb-4 rounded-lg"
        />
        <h2 className="text-xl font-bold mt-6 ">Sobre el proyecto:</h2>
        <p className="mb-10">{projectData.description}</p>

        {sessionData.description && (
          <>
            <h2 className="text-xl font-bold mb-2">
              Descripción de la sesión:
            </h2>
            <p className="mb-10">{sessionData.description}</p>
          </>
        )}

        {projectData.stack_name && (
          <>
            <h2 className="text-xl font-bold mb-2">Stack del proyecto:</h2>
            <p className="mb-10">{projectData.stack_name}</p>
          </>
        )}

        {/* Lenguajes con estilo moderno */}
        {Array.isArray(projectData.language_names) &&
        projectData.language_names.length > 0 ? (
          <>
            <h2 className="text-xl font-bold mb-5">Lenguajes requeridos:</h2>
            <ul className="mb-14 flex flex-wrap gap-2">
              {projectData.language_names.map((language, index) => (
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
          <p>No se han especificado lenguajes para este proyecto.</p>
        )}

        <h2 className="text-xl font-bold mb-2">El perfil que se busca:</h2>
        <p className="mb-10">{sessionData.level_name}</p>

        {/* Futuras Sesiones */}
        {futureSessions.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-10">Futuras Sesiones:</h2>
            <ul className="mb-6 list-disc list-inside">
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
        {projectData.owner ? (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">
              Información del Dueño del Proyecto:
            </h2>
            <button
              className="text-blue-500 underline"
              onClick={() => navigate(`/profile/${projectData.owner.id}`)}
            >
              {projectData.owner.name}
            </button>
          </div>
        ) : (
          <p>Información del dueño no disponible.</p>
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

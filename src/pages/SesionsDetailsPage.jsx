import HeroButton from "@/components/landing/HeroButton";
import FutureSessionList from "@/components/session/FutureSessionList";
import ProjectInfoSession from "@/components/session/ProjectInfoSession";
import SessionInfoSection from "@/components/session/SessionInfoSection";
import Loader from "@/components/shared/Loader";
import PopupWithInput from "@/components/shared/PopupWithInput";
import SimplePopUp from "@/components/shared/SimplePopUp";
import { useCheckIfInterested } from "@/hooks/useCheckIfInterested";
import { useFutureSessions } from "@/hooks/useFutureSessions";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import useShowInterestInSession from "@/hooks/useShowInterestInSession";
import { useNavigate, useParams } from "react-router-dom";

const SessionsDetailsPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const { data: sessionData, isLoading: isSessionLoading, isError: isSessionError } = useSessionDetails(sessionId);
  const { data: projectData, isLoading: isProjectLoading, isError: isProjectError } = useProjectDetails(sessionData?.project_id);
  const { data: futureSessions } = useFutureSessions(projectData?.id, sessionData?.schedule_date_time);
  const { data: isInterested, isLoading: isInterestedLoading } = useCheckIfInterested(sessionId);
  const { showPopup, showSignupPopup, setShowSignupPopup, closePopup, mutation } = useShowInterestInSession();

  if (isSessionLoading || isProjectLoading || isInterestedLoading) {
    return <Loader />;
  }

  if (isSessionError || isProjectError || !projectData || !sessionData) {
    return <p>Hubo un error al cargar los detalles de la sesión o el proyecto.</p>;
  }

  const saveMessage = () => mutation.mutate({ session: sessionId });

  return (
    <div className="pt-0 mt-0 p-6">
      <section className="grid grid-cols-1 lg:grid-cols-2 mb-8 lg:pl-24 gap-8">
        <ProjectInfoSession projectData={projectData} navigate={navigate} sessionId={sessionId} />
        <SessionInfoSection sessionData={sessionData} />
      </section>

      {futureSessions?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Futuras Sesiones</h2>
          <FutureSessionList futureSessions={futureSessions} />
        </section>
      )}

      <div className="flex justify-center mt-8">
        {isInterested?.is_interested ? (
          <p>Ya estas apuntado a esta sesión!</p>
        ) : (
          <HeroButton onClick={() => setShowSignupPopup(true)} text="Apúntate" />
        )}
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

      {showPopup && (
        <SimplePopUp
          closePopup={closePopup}
          message="Tu interés ha sido registrado."
          closeText="Cerrar"
        />
      )}
    </div>
  );
};

export default SessionsDetailsPage;
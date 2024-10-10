// SessionDetails.jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import SectionCard from "@/components/profile/SectionCard";
import ItemList from "@/components/shared/ItemList";
import ProjectInfoSession from "@/components/session/ProjectInfoSession";
import SessionInfoSection from "@/components/session/SessionInfoSection";
import FutureSessionList from "@/components/session/FutureSessionList";
import HeroButton from "@/components/landing/HeroButton";
import PopupWithInput from "@/components/shared/PopupWithInput";
import SimplePopUp from "@/components/shared/SimplePopUp";
import Loader from "@/components/shared/Loader";
import { useProfile } from "@/hooks/useProfile";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { useGetInterestedUsers } from "@/hooks/useGetInterestedUsers";
import { useGetRecommendedUsers } from "@/hooks/useGetRecommendedUsers";
import { useCheckIfInterested } from "@/hooks/useCheckIfInterested";
import useShowInterestInSession from "@/hooks/useShowInterestInSession";
import { useFutureSessions } from "@/hooks/useFutureSessions";
import { ArrowLeft } from "lucide-react";

const SessionDetails = ({ isOwner }) => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { data: userProfile, isLoading: isUserLoading } = useProfile();
  const { data: sessionData, isLoading: isSessionLoading, isError: isSessionError } = useSessionDetails(sessionId);
  const { data: projectData, isLoading: isProjectLoading, isError: isProjectError } = useProjectDetails(sessionData?.project_id);
  const { data: interestedParticipants } = useGetInterestedUsers(sessionId);
  const { data: recommendedUsers } = useGetRecommendedUsers(sessionId);
  const { data: futureSessions } = useFutureSessions(projectData?.id, sessionData?.schedule_date_time);
  const { data: isInterested, isLoading: isInterestedLoading } = useCheckIfInterested(sessionId);
  const { showPopup, showSignupPopup, setShowSignupPopup, closePopup, mutation } = useShowInterestInSession();

  if (isSessionLoading || isProjectLoading || isInterestedLoading || isUserLoading) {
    return <Loader />;
  }

  if (isSessionError || isProjectError || !projectData || !sessionData || !userProfile) {
    return <p>Error loading session or project details.</p>;
  }

  const saveMessage = () => mutation.mutate({ session: sessionId });

  const filteredInterestedParticipants = interestedParticipants?.filter(
    (user) => !sessionData.participants.some((participant) => participant.id === user.id)
  );

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(`/projects/${projectData.id}`)}
        className="text-white hover:text-primary flex items-center mt-0 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        {isOwner ? "Volver a mi proyecto" : "Volver"}
      </button>
      <h1 className="text-4xl md:text-6xl mb-10 gradient2-text font-bold justify-self-start">Detalles de la sesión</h1>
      
      {/* Project and Session Info */}
      <section className="grid grid-cols-1 lg:grid-cols-2 mb-8 gap-8">
        <ProjectInfoSession projectData={projectData} navigate={navigate} sessionId={sessionId} isOwner={isOwner}  />
        <SessionInfoSection sessionData={sessionData} />
      </section>
      
      {/* Owner-specific Sections */}
      {isOwner && (
        <div className="grid grid-cols-1 gap-10 items-stretch mt-8">
          <SectionCard
            title="Participantes confirmados"
            content={
              sessionData.participants.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {sessionData.participants.map((user) => (
                    <Link key={user.id} to={`/profile/${user.id}/session/${sessionData.id}`} className="flex items-center gap-2">
                      <img src={user.photo} alt={user.username} className="w-10 h-10 rounded-full" />
                      <p>{user.username}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p>No hay participantes confirmados.</p>
              )
            }
          />
          <SectionCard
            title="Coders interesados"
            content={
              <>
                <p className="mb-2">Algunos coders están interesados en participar en tu sesión.</p>
                {filteredInterestedParticipants && filteredInterestedParticipants.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {filteredInterestedParticipants.map((user) => (
                      <Link key={user.id} to={`/profile/${user.id}/session/${sessionData.id}`} className="flex items-center gap-2">
                        <img src={user.photo} alt={user.username} className="w-10 h-10 rounded-full" />
                        <p>{user.username}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p>Parece que no se ha apuntado nadie aún.</p>
                )}
              </>
            }
          />
          <SectionCard
            title="Coders recomendados"
            content={
              <>
                <p className="mb-2">Te podría interesar estos otros coders para tu proyecto.</p>
                {recommendedUsers && recommendedUsers.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {recommendedUsers.map((user) => (
                      <Link key={user.id} to={`/profile/${user.id}/session/${sessionData.id}`} className="flex items-center gap-2">
                        <img src={user.photo || '/path/to/default-avatar.png'} alt={user.username} className="w-10 h-10 rounded-full" />
                        <p>{user.username}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p>No hay recomendaciones en este momento.</p>
                )}
              </>
            }
          />
        </div>
      )}

      {/* Future Sessions */}
      {!isOwner && futureSessions?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Futuras Sesiones</h2>
          <FutureSessionList futureSessions={futureSessions} />
        </section>
      )}

      {/* Interest Button */}
      {!isOwner && (
        <div className="flex justify-center mt-8">
          {isInterested?.is_interested ? (
            <p>Ya estás apuntado a esta sesión!</p>
          ) : (
            <HeroButton onClick={() => setShowSignupPopup(true)} text="Apúntate" />
          )}
        </div>
      )}

      {/* Popups */}
      {!isOwner && showSignupPopup && (
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

export default SessionDetails;

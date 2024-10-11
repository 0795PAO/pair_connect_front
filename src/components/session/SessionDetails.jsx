// SessionDetails.jsx
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import SectionCard from "@/components/profile/SectionCard";
import ProjectInfoSession from "@/components/session/ProjectInfoSession";
import SessionInfoSection from "@/components/session/SessionInfoSection";
import FutureSessionList from "@/components/session/FutureSessionList";
import HeroButton from "@/components/landing/HeroButton";
import PopupWithInput from "@/components/shared/PopupWithInput";
import SimplePopUp from "@/components/shared/SimplePopUp";
import Loader from "@/components/shared/Loader";
import UpdateSessionForm from "@/components/session/UpdateSessionForm";
import { useProfile } from "@/hooks/useProfile";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { useGetInterestedUsers } from "@/hooks/useGetInterestedUsers";
import { useGetRecommendedUsers } from "@/hooks/useGetRecommendedUsers";
import { useCheckIfInterested } from "@/hooks/useCheckIfInterested";
import useShowInterestInSession from "@/hooks/useShowInterestInSession";
import { useFutureSessions } from "@/hooks/useFutureSessions";
import { useToast } from "@/hooks/useToast";
import { ArrowLeft, Edit } from "lucide-react";
import { updateSession } from "@/services/sessionService";

const SessionDetails = ({ isOwner }) => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: userProfile, isLoading: isUserLoading } = useProfile();
  const { data: sessionData, isLoading: isSessionLoading, isError: isSessionError } = useSessionDetails(sessionId);
  const { data: projectData, isLoading: isProjectLoading, isError: isProjectError } = useProjectDetails(sessionData?.project_id);
  const { data: interestedParticipants } = useGetInterestedUsers(sessionId);
  const { data: recommendedUsers } = useGetRecommendedUsers(sessionId);
  const { data: futureSessions } = useFutureSessions(projectData?.id, sessionData?.schedule_date_time);
  const { data: isInterested, isLoading: isInterestedLoading } = useCheckIfInterested(sessionId);
  const { showPopup, showSignupPopup, setShowSignupPopup, closePopup, mutation } = useShowInterestInSession();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditSessionClick = () => {
    setIsEditing(true);
  };
  
  const handleFormSubmit = async (updatedData) => {
    
      const { date, time, duration, stack, languages, description, participant_limit, session_link, is_private } = updatedData;
      if (!date || !time) {
        console.error("Date or time is undefined.");
        return;
      }
      
      const formattedData = {
        schedule_date_time: `${date}T${time}`,
        duration: duration.includes(":") ? duration : `${duration}:00`,
        stack,
        languages,
        description,
        participant_limit: participant_limit ? parseInt(participant_limit, 10) : null,
        session_link: session_link ? session_link.startsWith('http') ? session_link : `http://${session_link}` : null,
        is_private,
      };

      try {
        await updateSession(sessionId, formattedData);

      setIsEditing(false);
      queryClient.invalidateQueries(["sessionDetails", sessionId]);
      toast({
        title: "Éxito",
        description: "Los datos de la sesión se ha actualizado correctamente!",
        variant: "success",
      });
      } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        toast({
            title: "Error",
            description: "¡Oops! No se ha podido actualizar los datos de la sesión. Por favor, intentalo de nuevo.",
            variant: "destructive",
        });
    }
  };

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
      <section className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-10 items-stretch">
        <ProjectInfoSession projectData={projectData} navigate={navigate} sessionId={sessionId} isOwner={isOwner} />
        <div className="relative">
          {isEditing ? (
            <UpdateSessionForm
              sessionData={sessionData}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <SessionInfoSection sessionData={sessionData} isOwner={isOwner} />
              {isOwner && (
                <button onClick={handleEditSessionClick} className="absolute top-0 right-0">
                  <Edit className="w-7 h-7 text-gray-500 hover:text-primary" />
                </button>
              )}
            </>
          )}
        </div>
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

import { useParams, useNavigate } from "react-router-dom";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { useGetInterestedUsers } from "@/hooks/useGetInterestedUsers";
//import { useGetRecommendedUsers } from "@/hooks/useGetRecommendedUsers"; // New hook for recommendations
import Loader from "@/components/shared/Loader";
import { ArrowLeft } from "lucide-react";

const OwnerSessionDetailsPage = () => {
  const { sessionId } = useParams();
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

  const {
    data: interestedParticipants,
    isLoading: isInterestedLoading,
    isError: isInterestedError,
  } = useGetInterestedUsers(sessionId);

  /* const {
    data: recommendedUsers,
    isLoading: isRecommendedLoading,
    isError: isRecommendedError,
  } = useGetRecommendedUsers(sessionId); */ // Fetch recommended users based on matching stack and languages

  const formatCustomDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = duration.split(":").map(Number);
    const startDateTime = new Date(startTime);
    startDateTime.setHours(startDateTime.getHours() + hours);
    startDateTime.setMinutes(startDateTime.getMinutes() + minutes);
    return startDateTime;
  };

  const formattedDate = sessionData ? formatCustomDate(sessionData.schedule_date_time) : '';
  const startTime = sessionData ? formatTime(sessionData.schedule_date_time) : '';
  const endTime = sessionData ? formatTime(calculateEndTime(sessionData.schedule_date_time, sessionData.duration)) : '';
  const durationText = sessionData 
    ? `${parseInt(sessionData.duration.split(":")[0], 10)}h${sessionData.duration.split(":")[1] > 0 ? ' ' + sessionData.duration.split(":")[1] + "m" : ""}` 
    : '';

  if (isSessionLoading || isProjectLoading) {
    return <Loader />;
  }

  if (isSessionError || isProjectError || !projectData || !sessionData) {
    return <p>Error loading session or project details.</p>;
  }

  return (
    <div className="p-6">
        <div className="flex items-center justify-center min-h-screen">
            <div className="container mx-auto p-4 space-y-8">
                <button
                    onClick={() => navigate(`/projects/${projectData.id}`)}
                    className="text-white hover:text-primary flex items-center"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver a mi proyecto
                </button>
                {/* Title and Image Section */}
                <h1 className="text-4xl gradient2-text font-bold">Detalles de la sesión</h1>
                <div className="flex flex-col md:flex-row items-start p-8">
                    {/* Left Section: Project Image */}
                    <div className="relative">
                        <img
                        src={projectData.image_url}
                        alt="Project"
                        className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover rounded-lg md:mr-6"
                        />
                        <h2 className="text-4xl font-bold">{projectData.name}</h2>
                        <p className="text-lg mb-6">{projectData.description}</p>
                    </div>
                    {/* Right Section: Title, Description, and Required Skills */}
                    <div className="flex-grow flex flex-col justify-between md:text-left px-8 h-full">
                        <div className="text-2xl font-bold pb-4">
                            <p>{formattedDate}</p>
                            <p>{startTime}-{endTime} [{durationText}]</p>
                        </div>
                        <div className="pb-4">
                            <h3 className="text-xl font-bold">Descripción de la sesión:</h3>
                            <p>{sessionData.description}</p>
                        </div>
                        <div className="pb-4">
                            <p>Level: {sessionData.level_name}</p>
                            <p>Stack: {sessionData.stack_name}</p>
                            <p>Lenguajes y frameworks: {sessionData.language_names}</p>
                        </div>
                        <div className="pb-4">
                            <p>Límite de participantes: {sessionData.participant_limit ? sessionData.participant_limit : "Sin límite"}</p>
                            <p>Enlace sesión:  
                                {sessionData.session_link ? 
                                <a href={sessionData.session_link} target="_blank" rel="noopener noreferrer">{sessionData.session_link}</a>
                                : " No disponible"}
                            </p>
                            <p>{sessionData.is_private ? "Sesión privada" : "Sesión pública"}</p>
                        </div>
                    </div>
                </div>
                
                {/* Participants Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Participantes confirmados</h2>
                    {/* {sessionData.participants.length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            {sessionData.participants.map((user) => (
                                <div key={user.id} className="flex items-center gap-2">
                                    <img src={user.avatar_url} alt={user.username} className="w-10 h-10 rounded-full" />
                                    <p>{user.username}</p>
                                </div>
                            ))}
                        </div>
                    ) : ( */}
                        <p>No hay participantes confirmados.</p>
                    {/* )} */}
                </div>

                {/* Interested Participants Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Participantes interesados</h2>
                    {interestedParticipants && interestedParticipants.length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            {interestedParticipants.map((user) => (
                                <div key={user.id} className="flex items-center gap-2">
                                    <img src={user.photo} alt={user.username} className="w-10 h-10 rounded-full" />
                                    <p>{user.username}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No hay participantes interesados.</p>
                    )}
                </div>

                {/* Recommended Users Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Recomendaciones</h2>
                    {/* {recommendedUsers.length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            {recommendedUsers.map((user) => (
                                <div key={user.id} className="flex items-center gap-2">
                                    <img src={user.avatar_url} alt={user.username} className="w-10 h-10 rounded-full" />
                                    <p>{user.username}</p>
                                </div>
                            ))}
                        </div>
                    ) : ( */}
                        <p>No hay recomendaciones en este momento.</p>
                   {/*  )} */}
                </div>
            </div>
        </div>
    </div>
  );
};

export default OwnerSessionDetailsPage;
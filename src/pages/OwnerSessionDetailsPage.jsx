import { useParams, useNavigate, Link  } from "react-router-dom";
import SectionCard from "@/components/profile/SectionCard";
import ItemList from "@/components/shared/ItemList";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { useGetInterestedUsers } from "@/hooks/useGetInterestedUsers";
import { useGetRecommendedUsers } from "@/hooks/useGetRecommendedUsers";
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

  const {
    data: recommendedUsers,
    isLoading: isRecommendedLoading,
    isError: isRecommendedError,
  } = useGetRecommendedUsers(sessionId);

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
  const sessionDateTime = `${formattedDate}\n${startTime} - ${endTime} [${durationText}]`;

  if (isSessionLoading || isProjectLoading) {
    return <Loader />;
  }

  if (isSessionError || isProjectError || !projectData || !sessionData) {
    return <p>Error loading session or project details.</p>;
  }

  return (
    <div className="p-6">
        <button
            onClick={() => navigate(`/projects/${projectData.id}`)}
            className="text-white hover:text-primary flex items-center mt-0 mb-4"
        >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a mi proyecto
        </button>
        {/* Title and Image Section */}
        <h1 className="text-4xl md:text-6xl mb-10 gradient2-text font-bold justify-self-start">Detalles de la sesión</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-10 items-stretch">
                {/* Left Section: Project Image */}
                <section className="flex flex-col items-center justify-between bg-card p-10 rounded-lg overflow-y-auto">
                    <div className="flex flex-col items-center">
                        <img
                        src={projectData.image_url}
                        alt="Project"
                        className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover rounded-lg md:mr-6"
                        />
                        <h2 className="text-4xl font-bold text-textPrimary">{projectData.name}</h2>
                        <p className="text-lg mb-6">{projectData.description}</p>
                    </div>
                </section>
                {/* Right Section: Title, Description, and Required Skills */}
                <div className="flex flex-col justify-between gap-4 ">
                    <SectionCard title={sessionDateTime} />

                    <SectionCard title="Descripción de la sesión:" content={sessionData.description} />
                    
                    <SectionCard
                        content={
                            <>
                                <p>Level: {sessionData.level_name}</p>
                                <p>Stack: {sessionData.stack_name}</p>
                                Languages: <ItemList items={sessionData.language_names} title="Lenguajes y frameworks" />
                            </>
                        } 
                    />
                    
                    <SectionCard 
                        content={
                            <>
                                <p>Límite de participantes: {sessionData.participant_limit ? sessionData.participant_limit : "Sin límite"}</p>
                                <p>Enlace sesión:  
                                    {sessionData.session_link ? 
                                    <a href={sessionData.session_link} target="_blank" rel="noopener noreferrer">{sessionData.session_link}</a>
                                    : " No disponible"}
                                </p>
                                <p>{sessionData.is_private ? "Sesión privada" : "Sesión pública"}</p>
                            </>
                        }
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr] gap-10 items-stretch mt-8">        
                {/* Participants Section */}
                <div className="flex flex-col justify-between gap-8">
                    {/* Confirmed Participants Section */}
                    <SectionCard
                        title="Participantes confirmados"
                        /* content={
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
                        } */
                    />
                    {/* Interested Participants Section */}
                    <SectionCard
                        title="Coders interesados"
                        content={
                            <>
                                <p className="mb-2">Algunos coders están interesados en participar en tu sesión.</p>
                                {interestedParticipants && interestedParticipants.length > 0 ? (
                                    <div className="flex flex-wrap gap-4">
                                        {interestedParticipants.map((user) => (
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
                    {/* Recommended Coders Section */}
                    <SectionCard
                        title="Coders recomendados"
                        content={
                            <>
                                <p className="mb-2">Te podria interesar estos otros coders para tu proyecto.</p>
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
            </div>    
    </div>
  );
};

export default OwnerSessionDetailsPage;
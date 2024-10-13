import ItemList from "../shared/ItemList";
import SectionCard from "../profile/SectionCard";

const SessionInfoSection = ({ sessionData, isOwner, isParticipant }) => {
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

    const formattedDate = formatCustomDate(sessionData.schedule_date_time);
    const startTime = formatTime(sessionData.schedule_date_time);
    const endTime = formatTime(calculateEndTime(sessionData.schedule_date_time, sessionData.duration));
    const durationText = `${parseInt(sessionData.duration.split(":")[0], 10)}h${sessionData.duration.split(":")[1] > 0 ? ' ' + sessionData.duration.split(":")[1] + "m" : ""}`;
    const sessionDateTime = `${formattedDate}\n${startTime} - ${endTime} [${durationText}]`;

    const shouldShowSessionLink = isOwner || isParticipant || !sessionData.is_private;

    return (
        <div className="flex flex-col justify-between gap-4">
            <SectionCard title="Fecha y hora de la sesión:" content={sessionDateTime} />

            {sessionData.description && (
                <SectionCard title="Descripción de la sesión:" content={sessionData.description} />
            )}
            <section className="relative">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
                    {sessionData.language_names && (
                        <SectionCard
                            title="Lenguaje:"
                            content={
                                <div className="text-sm leading-tight">
                                    <ItemList items={sessionData.language_names} />
                                </div>
                            }
                        />
                    )}
                    <SectionCard title="Stack:" content={sessionData.stack_name} />
                    <SectionCard title="Nivel:" content={sessionData.level_name} />
                </div>
            </section>
            {shouldShowSessionLink && (
                <SectionCard
                    title="Enlace sesión:"
                    content={
                        sessionData.session_link ? (
                            <a href={sessionData.session_link} target="_blank" rel="noopener noreferrer">
                                {sessionData.session_link}
                            </a>
                        ) : (
                            "No disponible aún"
                        )
                    }
                />
            )}
            {isOwner && (
                <SectionCard
                    content={
                        <>
                            <p>Límite de participantes: {sessionData.participant_limit ? sessionData.participant_limit : "Sin límite"}</p>
                            <p>{sessionData.is_private ? "Sesión privada" : "Sesión pública"}</p>
                        </>
                    }
                />
            )}
        </div>
    );
};

export default SessionInfoSection;

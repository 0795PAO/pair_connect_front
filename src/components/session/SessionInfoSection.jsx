import ItemList from "../shared/ItemList";
import SectionCard from "../profile/SectionCard";

const SessionInfoSection = ({ sessionData }) => {
    return (
        <div className="flex flex-col justify-between gap-4">
            {sessionData.description && (
                <SectionCard title="Descripción de la sesión:" content={sessionData.description} />
            )}
            {sessionData.schedule_date_time && (
                <SectionCard
                    title="Fecha de la sesión:"
                    content={new Date(sessionData.schedule_date_time).toLocaleString()}
                />
            )}
            {sessionData.duration && (
                <SectionCard title="Duración:" content={sessionData.duration} />
            )}
            {sessionData.language_names && (
                <SectionCard
                    title="Lenguajes requeridos:"
                    content={<ItemList items={sessionData.language_names} />}
                />
            )}
            <SectionCard title="Perfil requerido:" content={sessionData.level_name} />
        </div>
    );
};

export default SessionInfoSection;

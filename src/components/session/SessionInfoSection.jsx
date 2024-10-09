import ItemList from "../shared/ItemList"

/* eslint-disable react/prop-types */
const SessionInfoSection = ({ sessionData }) => {
    return (
        <>
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
                    <h2 className="text-xl font-bold mb-4 lg:mb-6">Fecha de la sesión:</h2>
                    <p className="mb-4 lg:mb-6">
                        {new Date(sessionData.schedule_date_time).toLocaleString()}
                    </p>
                </>
            )}
            {sessionData.duration && (
                <>
                    <h2 className="text-xl font-bold mb-4 lg:mb-6">Duración:</h2>
                    <p className="mb-4 lg:mb-6">{sessionData.duration}</p>
                </>
            )}
            {sessionData.language_names && (
                <ItemList items={sessionData.language_names} title="Lenguajes requeridos" />
            )}
            <h2 className="text-xl font-bold mb-4 lg:mb-6">Perfil requerido:</h2>
            <p className="mb-4 lg:mb-6">{sessionData.level_name}</p>
        </>
    )
}
export default SessionInfoSection
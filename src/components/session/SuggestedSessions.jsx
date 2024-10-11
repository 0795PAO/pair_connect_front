import SessionCard from "./SessionCard"

/* eslint-disable react/prop-types */
const SuggestedSessions = ({ sessions }) => {
    return sessions.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session) => (
                <SessionCard key={session.id} session={session} to={`sessions/${session.id}`} />
            ))}
        </ul>
    ) : (
        <p>No hay sesiones sugeridas disponibles.</p>
    )
}
export default SuggestedSessions
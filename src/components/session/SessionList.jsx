/* eslint-disable react/prop-types */
import SessionCard from "@/components/session/SessionCard";
import Loader from "../shared/Loader";
import { formatDate } from "@/utils/formaDateAndTime";

const groupSessionsByDate = (sessions) => {
    if (!sessions || sessions.length === 0) {
        return {};
    }
    return sessions.reduce((grouped, session) => {
        const date = formatDate(session.schedule_date_time);
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(session);
        return grouped;
    }, {});
};

const filterSessionsByPage = (sessions, currentPage) => {
    const sortedSessions = sessions.sort(
        (a, b) => new Date(a.schedule_date_time) - new Date(b.schedule_date_time)
    );

    const start = (currentPage - 1) * 5;
    const end = start + 5;
    return sortedSessions.slice(start, end);
};

const SessionList = ({
    sessions,
    loading,
    error,
    projectImageUrl,
    currentPage,
    to,
}) => {
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error al cargar las sesiones.</p>;
    }
    const filteredSessions = filterSessionsByPage(sessions, currentPage);

    const sessionsByDate = groupSessionsByDate(filteredSessions);

    return (
        <>
            {sessions && sessions.length > 0 ? (
                Object.keys(sessionsByDate).map((date) => {
                    return (
                        <div key={date}>
                            <h4 className="mb-4 text-lg font-semibold px-5 lg:[w-70%] ">{date}</h4>
                            <ul className="grid grid-cols-1 gap-4 w-full items-center justify-items-center">
                                {sessionsByDate[date].map((session, index) => {
                                    return (
                                        <SessionCard
                                            session={session}
                                            key={index}
                                            to={`${to}${session.id}`}
                                            projectImageUrl={projectImageUrl}
                                        />
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })
            ) : (
                <div className="my-10 flex flex-col items-center justify-center text-center">
                    <p className="text-center font-semibold text-xl">
                        Ups! Parece que no hemos encontrado sesiones con estos filtros.
                        ¡Prueba ajustando tus opciones para encontrar tu próxima aventura de
                        pair programming! 🚀👩🏻‍💻
                    </p>
                </div>
            )}
        </>
    );
};

export default SessionList;

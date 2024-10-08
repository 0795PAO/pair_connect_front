/* eslint-disable react/prop-types */
import SessionCard from '@/components/session/SessionCard';
import Loader from '../shared/Loader';
import { formatDate } from '@/utils/formaDateAndTime';

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


const filterSessionsByFiveDays = (sessions, startDate) => {
    if (!sessions || sessions.length === 0) {
        return [];
    }

    const sortedSessions = sessions.sort((a, b) => new Date(a.schedule_date_time) - new Date(b.schedule_date_time));

    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 4); 

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return sortedSessions.filter(session => {
        const sessionDate = new Date(session.schedule_date_time); 
        return sessionDate >= today && sessionDate >= start && sessionDate <= end;
    });
};

const SessionList = ({ sessions, loading, error, startDate, projectImageUrl }) => {
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error al cargar las sesiones.</p>;
    }
    const filteredSessions = filterSessionsByFiveDays(sessions, startDate);
    const sessionsByDate = groupSessionsByDate(filteredSessions);

    return (
        <>
            {sessions && sessions.length > 0 ? Object.keys(sessionsByDate).map((date) => (
                <div key={date} >
                    <h4 className="mb-4 text-lg font-semibold">{date}</h4>
                    <ul className={`grid gap-6 items-stretch ${sessionsByDate[date].length === 1
                        ? "grid-cols-1 justify-center items-center w-full"
                        : "grid-cols-1 md:grid-cols-2"
                        }`}>
                        {sessionsByDate[date].map((session, index) => (
                            <SessionCard session={session} key={index} to={`/public-sessions/${session.id}`}  projectImageUrl={projectImageUrl}/>
                        ))}
                    </ul>
                </div>
            ))
                :
                <div className="my-10 flex flex-col items-center justify-center text-center">
                    <p className="text-center font-semibold text-xl">Ups! Parece que no hemos encontrado sesiones con estos filtros. ¡Prueba ajustando tus opciones para encontrar tu próxima aventura de pair programming! 🚀👩🏻‍💻</p>
                </div>
            }
        </>
    );
};

export default SessionList

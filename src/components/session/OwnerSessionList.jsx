import OwnerSessionCard from './OwnerSessionCard';
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

const OwnerSessionList = ({ sessions, loading, error }) => {
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error al cargar las sesiones.</p>;
    }

    // Sort sessions by schedule_date_time in ascending order
    const sortedSessions = [...sessions].sort((a, b) => 
        new Date(a.schedule_date_time) - new Date(b.schedule_date_time)
    );

    const sessionsByDate = groupSessionsByDate(sortedSessions);


    return (
        <>
            {sessions && sessions.length > 0 ? Object.keys(sessionsByDate).map((date) => (
                <div key={date} >
                    <h4 className="mt-3 mb-1 text-lg font-semibold">{date}</h4>
                    <ul className={`grid gap-6 items-stretch ${sessionsByDate[date].length === 1
                        ? "grid-cols-1 justify-center items-center w-full"
                        : "grid-cols-1 md:grid-cols-2"
                        }`}>
                        {sessionsByDate[date].map((session, index) => (
                            <OwnerSessionCard session={session} key={index} />
                        ))}
                    </ul>
                </div>
            ))
                :
                <div className="my-10 flex flex-col items-center justify-center text-center">
                    <p className="text-center font-semibold text-xl">No hay sesiones creadas. ¡Crea una nueva sesión!</p>
                </div>
            }
        </>
    );
};

export default OwnerSessionList;
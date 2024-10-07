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

const OwnerSessionList = ({ sessions, loading, error, projectImageUrl }) => {
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error al cargar las sesiones.</p>;
    }

    const sessionsByDate = groupSessionsByDate(sessions);

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
                            <SessionCard session={session} key={index} projectImageUrl={projectImageUrl} />
                        ))}
                    </ul>
                </div>
            ))
                :
                <div className="my-10 flex flex-col items-center justify-center text-center">
                    <p className="text-center font-semibold text-xl">No sessions found for this project. Start by creating a new session!</p>
                </div>
            }
        </>
    );
};

export default OwnerSessionList;
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

const getFourDayRange = (startDate) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 4);
    return { start, end };
};

const filterSessionsByFourDays = (sessions) => {
    if (!sessions || sessions.length === 0) {
        return [];
    }
    const sortedSessions = sessions.sort((a, b) => new Date(a.schedule_date_time) - new Date(b.schedule_date_time));

    const firstSessionDate = sortedSessions[0].schedule_date_time;

    const { start, end } = getFourDayRange(firstSessionDate);

    return sortedSessions.filter(session => {
        const sessionDate = new Date(session.schedule_date_time);
        return sessionDate >= start && sessionDate <= end;
    });
};



const SessionList = ({ sessions, loading, error }) => {


    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error al cargar las sesiones.</p>;
    }
    console.log(sessions)
    const filteredSessions = filterSessionsByFourDays(sessions);
    const sessionsByDate = groupSessionsByDate(filteredSessions);
    return (
        <section className="max-w-6xl mx-auto my-10">
            <h3 className="mb-4 text-4xl font-bold">Sesiones Programadas:</h3>
                {sessions && sessions.length > 0 && Object.keys(sessionsByDate).map((date) => (
                    <div key={date} >
                        <h4 className="mb-4 text-lg font-semibold">{date}</h4>
                        <ul className={`grid gap-6 items-stretch ${sessionsByDate[date].length === 1
                                ? "grid-cols-1" 
                                : "grid-cols-1 md:grid-cols-2" 
                            }`}>
                            {sessionsByDate[date].map((session, index) => (
                                <SessionCard session={session} key={index} />
                            ))}
                        </ul>
                    </div>
                ))}
        </section>
    );
};

export default SessionList

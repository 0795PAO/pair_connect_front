/* eslint-disable react/prop-types */
import SessionCard from '@/components/session/SessionCard';
import Loader from '../shared/Loader';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
};

const groupSessionsByDate = (sessions) => {
    if (!sessions || sessions.length === 0) {
        return {};
    }
    return sessions.reduce((grouped, session) => {
        const date = formatDate(session.date);
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(session);
        return grouped;
    }, {});
};


const SessionList = ({sessions, loading, error}) => {
    

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error al cargar las sesiones.</p>;
    }
    console.log(sessions)
    const sessionsByDate = groupSessionsByDate(sessions);
    return (
        <section className="max-w-6xl mx-auto my-10">
            <h3 className="mb-4 text-4xl font-bold">Sesiones Programadas:</h3>

            {sessions && sessions.length > 0 && Object.keys(sessionsByDate).map((date) => (
                <div key={date} className="mb-8">
                    <h4 className="mb-4 text-lg font-semibold">{date}</h4>
                    <div className="grid justify-center grid-cols-1 gap-6 md:grid-cols-2">
                        {sessionsByDate[date].map((session, index) => (
                            <div key={index} className="mx-auto">
                                <SessionCard session={session} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default SessionList

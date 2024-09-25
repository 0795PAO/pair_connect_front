import { useState, useEffect } from 'react';
import SessionCard from '@/components/session/SessionCard';

// Datos simulados BORRAR
const simulatedSessions = [
    {
        id: 1,
        title: "Desarrollar App de Pair Programming",
        description: "Quiero desarrollar una app para hacer pair programming.",
        date: "2024-09-15T10:00:00",
        technologies: ["Django", "Python"],
        owner: {
            username: "italianCookieMonster",
            avatar: "/photo_italian.svg",
        },
        status: "",
    },
    {
        id: 2,
        title: "Crear un Blog con React",
        description: "Aprendemos a crear un blog moderno usando React y Tailwind.",
        date: "2024-09-15T11:00:00",
        technologies: ["React", "Tailwind"],
        owner: {
            username: "Fire Fairy 84",
            avatar: "/photo_fire.svg",
        },
        status: "",
    },
    {
        id: 3,
        title: "Covid Tracker",
        description: "Desarrollar con REACT el front-end de un dashboard que muestra de manera dinámica la información de la API de Disease covimap.",
        date: "2024-09-15T09:00:00",
        technologies: ["Node.js", "Express", "MongoDB"],
        owner: {
            username: "Naminé",
            avatar: "/photo_namine.svg",
        },
        projectImage: "/project_covid.svg",
        status: "",
    },
    {
        id: 4,
        title: "Desarrollar App de Pair Programming",
        description: "Quiero desarrollar una app para hacer pair programming.",
        date: "2024-09-15T10:00:00",
        technologies: ["Django", "Python"],
        owner: {
            username: "Dpoetess",
            avatar: "/photo_default.svg",
        },
        status: "",
    },
    {
        id: 5,
        title: "Crear un Blog con React",
        description: "Aprendemos a crear un blog moderno usando React y Tailwind.",
        date: "2024-09-16T11:00:00",
        technologies: ["React", "Tailwind"],
        owner: {
            username: "0795PAO",
            avatar: "/photo_default.svg",
        },
        status: "",
    },
    {
        id: 6,
        title: "Covid Tracker",
        description: "Desarrollar con REACT el front-end de un dashboard que muestra de manera dinámica la información de la API de Disease covimap.",
        date: "2024-09-16T09:00:00",
        technologies: ["Node.js", "Express", "MongoDB"],
        owner: {
            username: "Naminé",
            avatar: "/photo_namine.svg",
        },
        projectImage: "/project_covid.svg",
        status: "",
    },
    {
        id: 7,
        title: "Crear un Blog con React",
        description: "Aprendemos a crear un blog moderno usando React y Tailwind.",
        date: "2024-09-16T11:00:00",
        technologies: ["React", "Tailwind"],
        owner: {
            username: "Fire Fairy 84",
            avatar: "/photo_fire.svg",
        },
        projectImage: "photo_default_project.svg",
        status: "",
    },
    {
        id: 8,
        title: "Covid Tracker",
        description: "Desarrollar con REACT el front-end de un dashboard que muestra de manera dinámica la información de la API de Disease covimap.",
        date: "2024-09-16T09:00:00",
        technologies: ["Node.js", "Express", "MongoDB"],
        owner: {
            username: "italianCookieMonster",
            avatar: "/photo_italian.svg",
        },
        projectImage: "/project_covid.svg",
        status: "",
    },
];

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
};

const groupSessionsByDate = (sessions) => {
    return sessions.reduce((grouped, session) => {
        const date = formatDate(session.date);
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(session);
        return grouped;
    }, {});
};


const SessionList = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        // Simula la llamada a la API
        const fetchSessions = async () => {
            // Aquí reemplazaremos la llamada a la API cuando esté lista
            // const response = await fetch('/api/sessions');
            // const data = await response.json();
            // setSessions(data);
            setSessions(simulatedSessions);
        };

        fetchSessions();
    }, []);

    const sessionsByDate = groupSessionsByDate(sessions);

    return (
        <section className="max-w-6xl mx-auto my-10">
            <h3 className="mb-4 text-4xl font-bold">Sesiones Programadas:</h3>

            {Object.keys(sessionsByDate).map((date) => (
                <div key={date} className="mb-8">
                    <h4 className="mb-4 text-lg font-semibold">{date}</h4>
                    <div className="grid justify-center grid-cols-1 gap-6 md:grid-cols-2">
                        {sessionsByDate[date].map((session) => (
                            <div key={session.id} className="mx-auto">
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

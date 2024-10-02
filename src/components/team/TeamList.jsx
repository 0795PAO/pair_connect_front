import TeamCard from '@/components/team/TeamCard';

const teamMembers = [
    {
        name: "Paola",
        role: "Junior Full Stack Developer",
        avatar: "/team/paola.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
    },
    {
        name: "Jessica",
        role: "Junior Full Stack Developer",
        avatar: "/team/jessica.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
    },
    {
        name: "Helena",
        role: "Junior Full Stack Developer",
        avatar: "/team/helena.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
    },
    {
        name: "Valentina",
        role: "Junior Full Stack Developer",
        avatar: "/team/valentina.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
    },
    {
        name: "Lynn",
        role: "Junior Full Stack Developer",
        avatar: "/team/lynn.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
    },
    {
        name: "Esther",
        role: "Junior Full Stack Developer",
        avatar: "/team/esther.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
    },
    {
        name: 'Alejandro',
        role: 'Stakeholder',
        avatar: "/team/alejandro.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
    },
];

const TeamList = () => {
    return (
        <section id="team-section" className="py-10 team-section">
            <h2 className="mb-8 text-3xl font-bold text-center">Las desarrolladoras</h2>
            <div className="grid w-full max-w-screen-lg grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {teamMembers.map((member, index) => (
                        <TeamCard key={index} member={member} />
                    ))}
                </div>
        </section>
    );
};

export default TeamList

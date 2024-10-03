import TeamCard from '@/components/about/TeamCard';

const teamMembers = [
    {
        name: "Paola",
        role: "Junior Full Stack Developer",
        avatar: "/team/paola.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
        githubUrl: "https://github.com/0795PAO",
        linkedinUrl: "https://linkedin.com/",
    },
    {
        name: "Jessica Arroyo",
        role: "Junior Full Stack Developer",
        avatar: "/team/jessica.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
        githubUrl: "https://github.com/jess-ar",
        linkedinUrl: "https://www.linkedin.com/in/jessica-arroyo-lebron/",
    },
    {
        name: "Helena López",
        role: "Junior Full Stack Developer",
        avatar: "/team/helena.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
        githubUrl: "https://github.com/helopgom",
        linkedinUrl: "https://linkedin.com/",
    },
    {
        name: "Valentina Toni",
        role: "Junior Full Stack Developer",
        avatar: "/team/valentina.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
        githubUrl: "https://github.com/ItalianCookieMonster",
        linkedinUrl: "https://linkedin.com/",
    },
    {
        name: "Lynn Poh",
        role: "Junior Full Stack Developer",
        avatar: "/team/lynn.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
        githubUrl: "https://github.com/Dpoetess",
        linkedinUrl: "https://www.linkedin.com/in/lynn-poh/"
    },
    {
        name: "Esther",
        role: "Junior Full Stack Developer",
        avatar: "/team/esther.webp",
        description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
        githubUrl: "https://github.com/Fire-Fairy84",
        linkedinUrl: "https://linkedin.com/",
    },
];

const stakeholder = {
    name: 'Alejandro Arends',
    role: 'Stakeholder',
    avatar: "/team/alejandro.webp",
    description: "Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí, Aquí va un pequeño sobre mí",
    githubUrl: "https://github.com/",
    linkedinUrl: "https://linkedin.com/",
};

const TeamList = () => {
    return (
        <section id="team-section" className="team-section">
            <h2 className="mt-12 mb-16 text-3xl font-bold text-center">Las desarrolladoras</h2>

            <div className="w-full max-w-screen-lg mx-auto">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
                    {teamMembers.map((member, index) => (
                        <TeamCard key={index} member={member} />
                    ))}
                </div>
            </div>

            <h2 className="mt-12 mb-8 text-3xl font-bold text-center">Stakeholder</h2>

            <div className="w-full max-w-screen-lg mx-auto">
                <div className="grid grid-cols-1 gap-8 justify-items-center">
                    <div className="w-full max-w-[510px]">
                        <TeamCard
                            member={stakeholder}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamList




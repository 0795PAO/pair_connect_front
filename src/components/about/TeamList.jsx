import TeamCard from '@/components/about/TeamCard';
import teamData from '@/data/teamData.json';


const TeamList = () => {
    const { teamMembers, stakeholder } = teamData;
    return (
        <section id="team-section">
            <h2 className="mt-12 mb-16 text-4xl font-bold text-center">Las desarrolladoras:</h2>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2 justify-items-center">
                {teamMembers.map((member, index) => (
                    <TeamCard key={index} member={member} />
                ))}
            </div>

            <h2 className="mt-20 text-4xl font-bold text-center mb-14 ">El Stakeholder:</h2>

            <div className="flex justify-center">
                <TeamCard member={stakeholder} />
            </div>
        </section>
    );
};

export default TeamList




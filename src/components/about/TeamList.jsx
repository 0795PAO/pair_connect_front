import TeamCard from '@/components/about/TeamCard';
import teamData from '@/data/teamData.json';


const TeamList = () => {
    const { teamMembers, stakeholder } = teamData;
    return (
        <section id="team-section">
            <h2 className="mt-10 mb-8 text-2xl font-bold text-center sm:mt-16 md:mt-20 sm:text-2xl md:text-3xl lg:text-4xl sm:mb-12 md:mb-14">Las desarrolladoras:</h2>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2 justify-items-center">
                {teamMembers.map((member, index) => (
                    <TeamCard key={index} member={member} />
                ))}
            </div>

            <h2 className="mt-10 mb-8 text-xl font-bold text-center sm:mt-16 md:mt-20 sm:text-2xl md:text-3xl lg:text-4xl sm:mb-12 md:mb-14 ">El Stakeholder:</h2>

            <div className="flex justify-center">
                <TeamCard member={stakeholder} />
            </div>
        </section>
    );
};

export default TeamList




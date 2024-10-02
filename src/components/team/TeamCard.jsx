/* eslint-disable react/prop-types */
import { useState } from 'react';

const TeamCard = ({ member }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <div
                onClick={openModal}
                className="relative w-full max-w-[320px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[700px] sm:p-5 md:p-6 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-card text-card-foreground transition-transform duration-300 ease-in-out transform hover:scale-10 hover:shadow-white cursor-pointer flex flex-col justify-between hover:scale-105"
                data-testid="team-card"
            >
                <div className="flex items-center gap-5 pt-2">
                    <img
                        src={member.avatar || "/photo_default_user.svg"}
                        alt={`${member.name}'s avatar`}
                        className="w-20 h-20 rounded-full"
                    />
                    <div>
                        <h3 className="mt-2 mb-5 text-lg font-bold leading-tight">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                </div>
                <p className="p-4 text-sm text-muted-foreground dark:text-muted-foreground-dark">
                    {member.description || "Aquí va un pequeño sobre mí"}
                </p>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={closeModal}
                >
                    <img
                        src={member.avatar || "/photo_default_user.svg"}
                        alt={`${member.name}'s avatar`}
                        className="max-w-[80%] max-h-[80%] sm:max-w-[60%] sm:max-h-[60%] md:max-w-[50%] md:max-h-[50%] lg:max-w-[30%] lg:max-h-[40%] rounded-lg"
                    />
                </div>
            )}
        </>
    );
};


export default TeamCard

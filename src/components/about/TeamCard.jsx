/* eslint-disable react/prop-types */
import { useState } from 'react';

const TeamCard = ({ member }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <div className="relative w-full max-w-[320px] sm:max-w-[750px] lg:max-w-[750px] p-5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-card text-card-foreground transition-transform duration-300 ease-in-out transform hover:scale-10 hover:shadow-white cursor-pointer flex flex-col justify-between hover:scale-105">

                <div className="flex justify-end w-full gap-2">
                    <img src="/github-logo.svg"
                        alt="GitHub logo"
                        className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.githubUrl, '_blank');
                        }}
                    />
                    <img src="/linkedin-logo.svg"
                        alt="LinkedIn logo"
                        className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.linkedinUrl, '_blank');
                        }}
                    />
                </div>

                <div className="flex items-center gap-3 ">
                    <img
                        src={member.avatar || "/photo_default_user.svg"}
                        alt={`Foto de perfil de ${member.name}`}
                        className="w-16 h-16 mr-0 rounded-full cursor-pointer lg:mr-4 sm:w-20 sm:h-20"
                        onClick={openModal}
                    />
                    <div>
                        <h3 className="mt-2 mb-0 text-lg font-bold leading-tight lg:mt-0 lg:mb-4 sm:text-xl">{member.name}</h3>
                        <p className="mb-3 text-sm sm:text-base text-muted-foreground">{member.role}</p>
                    </div>
                </div>

                <p className="p-3 text-xs text-left sm:text-sm text-muted-foreground dark:text-muted-foreground-dark">
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
                        alt={`Foto de perfil de ${member.name}`}
                        className="max-w-[80%] max-h-[80%] sm:max-w-[60%] sm:max-h-[60%] md:max-w-[50%] md:max-h-[50%] lg:max-w-[30%] lg:max-h-[40%] rounded-lg "
                    />
                </div>
            )}
        </>
    );
};

export default TeamCard

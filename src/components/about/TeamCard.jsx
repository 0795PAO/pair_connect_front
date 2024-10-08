/* eslint-disable react/prop-types */
import { useState } from 'react';

const TeamCard = ({ member }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isImageModalOpen, setImageModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const openImageModal = () => setImageModalOpen(true);
    const closeImageModal = () => setImageModalOpen(false);

    return (
        <>
            <div className="relative max-w-[300px] lg:max-w-[600px] p-5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-card dark:bg-gray-800 text-card-foreground dark:text-white transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-white">
                <div className="flex justify-end w-full gap-2">
                    <img
                        src="/github-logo.svg"
                        alt="GitHub logo"
                        className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.githubUrl, '_blank');
                        }}
                    />
                    <img
                        src="/linkedin-logo.svg"
                        alt="LinkedIn logo"
                        className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.linkedinUrl, '_blank');
                        }}
                    />
                </div>

                <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                    <div className="flex-shrink-0">
                        <img
                            src={member.avatar || "/photo_default_user.svg"}
                            alt={`Foto de perfil de ${member.name}`}
                            className="w-24 h-24 rounded-full cursor-pointer sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-28 lg:h-28"
                            onClick={openImageModal}
                        />
                    </div>

                    <div className="flex flex-col items-center flex-1 mt-3 sm:items-start">
                        <h3 className="font-bold text-center sm:text-left">{member.name}</h3>
                        <p className="mt-2 text-sm text-center sm:text-base sm:text-left">{member.role}</p>
                    </div>
                </div>

                <div
                    className="mt-4 text-xs text-left line-clamp-3 sm:text-sm text-muted-foreground dark:text-muted-foreground-dark hover:cursor-pointer"
                    onClick={openModal}
                >
                    <p>{member.description || "Aquí va un pequeño sobre mí"}</p>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={closeModal}
                >
                    <div
                        className="max-w-lg p-6 bg-white rounded-lg dark:bg-gray-800 dark:text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="mb-4 font-bold text-center">{member.name}</h3>
                        <p className="text-sm text-center sm:text-base">
                            {member.description || "Aquí va un pequeño sobre mí"}
                        </p>
                    </div>
                </div>
            )}

            {isImageModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={closeImageModal}
                >
                    <img
                        src={member.avatar || "/photo_default_user.svg"}
                        alt={`Foto de perfil de ${member.name}`}
                        className="max-w-[80%] max-h-[80%] sm:max-w-[60%] sm:max-h-[60%] md:max-w-[50%] md:max-h-[50%] lg:max-w-[30%] lg:max-h-[40%] rounded-lg"
                    />
                </div>
            )}
        </>
    );
};

export default TeamCard
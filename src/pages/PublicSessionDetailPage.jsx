import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { useFutureSessions } from "@/hooks/useFutureSessions";
import HeroButton from "@/components/landing/HeroButton";
import { useAuth } from "@/hooks/useAuth";
import RegisterDialog from "@/components/auth/RegisterDialog";
import { useRegister } from "@/hooks/useRegister";

const PublicSessionDetailPage = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { handleRegister, loading } = useRegister();

    const { isAuthenticated } = useAuth();

    const {
        data: sessionData,
        isLoading: isSessionLoading,
        isError: isSessionError,
    } = useSessionDetails(sessionId);

    const {
        data: projectData,
        isLoading: isProjectLoading,
        isError: isProjectError,
    } = useProjectDetails(sessionData?.project_id);

    const { data: futureSessions } = useFutureSessions(
        projectData?.id,
        sessionData?.schedule_date_time
    );

    useEffect(() => {
        if (!sessionId) {
            console.error("Session ID no está disponible");
        }
    }, [sessionId]);

    if (isSessionLoading || isProjectLoading) {
        return <p>Cargando los detalles de la sesión y del proyecto...</p>;
    }

    if (isSessionError || isProjectError) {
        return (
            <p>Hubo un error al cargar los detalles de la sesión o el proyecto.</p>
        );
    }

    if (!projectData || !sessionData) {
        return <p>No se encontraron datos para este proyecto o sesión.</p>;
    }

    const projectOwnerId = projectData.owner_id;
    const projectOwnerName = projectData.owner_name;
    const projectOwnerAvatar = projectData.owner_avatar_url;

    return (
        <div className="pt-2 mt-0 p-4 sm:p-6 mx-auto mb-6 max-w-[100%] md:max-w-[100%] lg:max-w-[70%] xl:max-w-[90%] rounded-lg border border-gray-300">
            <div>
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-8xl font-bold mb-4 text-center gradient2-text">
                    {projectData.name}
                </h1>
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col items-start p-3 sm:p-5 text-base sm:text-lg">
                    <img
                        src={projectData.image_url ? projectData.image_url : "/neon2.png"}
                        alt="proyecto"
                        className="w-full lg:w-[500px] mb-4 rounded-lg"
                    />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                        Sobre el proyecto:
                    </h2>
                    <p className="mb-4 sm:mb-6 text-left sm:text-lg md:text-xl">
                        {projectData.description}
                    </p>

                    {isAuthenticated ? (
                        projectOwnerId ? (
                            <div className="mt-4 mb-4 text-left">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                                    Responsable del proyecto:
                                </h2>
                                <div className="flex items-center space-x-2">
                                    {projectOwnerAvatar && (
                                        <img
                                            src={projectOwnerAvatar}
                                            alt="avatar"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    )}
                                    <button
                                        className="hover:text-primary transition-colors duration-300"
                                        onClick={() => navigate(`/profile/${projectOwnerId}`)}
                                    >
                                        {projectOwnerName || "Nombre no disponible"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="mb-4 sm:mb-6">
                                Información del dueño no disponible.
                            </p>
                        )
                    ) : (
                        <p className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                            Inicia sesión para ver la información del dueño del proyecto.
                        </p>
                    )}
                </div>

                <div className="flex flex-col items-start p-3 sm:p-5 text-base sm:text-lg">
                    {sessionData.description && (
                        <>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                                Descripción de la sesión:
                            </h2>
                            <p className="mb-4 sm:mb-6">{sessionData.description}</p>
                        </>
                    )}
                    {sessionData.schedule_date_time && (
                        <>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                                Fecha de la sesión:
                            </h2>
                            <p className="mb-4 sm:mb-6">
                                {new Date(sessionData.schedule_date_time).toLocaleString()}
                            </p>
                        </>
                    )}

                    <hr className="border-t-2 my-1" />
                    {sessionData.duration && (
                        <>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                                Duración de la sesión:
                            </h2>
                            <p className="mb-4 sm:mb-6">{sessionData.duration}</p>
                        </>
                    )}
                    <hr className="border-t-2 my-1" />
                    {projectData.stack_name && (
                        <>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                                Stack de la sesión:
                            </h2>
                            <p className="mb-4 sm:mb-6">{projectData.stack_name}</p>
                        </>
                    )}
                    <hr className="border-t-2 my-1" />
                    {Array.isArray(sessionData.language_names) &&
                        sessionData.language_names.length > 0 ? (
                        <>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                                Lenguajes requeridos:
                            </h2>
                            <ul className="mb-4 sm:mb-6 flex flex-wrap gap-2">
                                {sessionData.language_names.map((language, index) => (
                                    <li
                                        key={index}
                                        className="py-1 px-3 rounded-full text-black font-bold shadow-lg hover-shadow-custom bg-gradient-to-r from-primary to-secondary transform"
                                    >
                                        {language}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="mb-4 sm:mb-6">
                            No se han especificado lenguajes para esta sesión.
                        </p>
                    )}
                    <hr className="border-t-2 my-1" />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                        El perfil que se busca:
                    </h2>
                    <p className="mb-4 sm:mb-6">{sessionData.level_name}</p>
                </div>
            </section>

            {futureSessions && futureSessions.length > 0 && (
                <section className="mt-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
                        Futuras Sesiones
                    </h2>
                    <ul>
                        {futureSessions.map((futureSession) => (
                            <li key={futureSession.id}>
                                <button
                                    className="text-blue-500 underline"
                                    onClick={() => navigate(`/sessions/${futureSession.id}`)}
                                >
                                    {new Date(futureSession.schedule_date_time).toLocaleString()}{" "}
                                    - {futureSession.description}
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <div className="flex justify-center mt-8">
                <HeroButton onClick={() => setIsOpen(true)} text="Registrate" />
            </div>
            <RegisterDialog open={isOpen} onOpenChange={setIsOpen} handleSubmit={handleRegister} loading={loading} />
        </div>
    );
};

export default PublicSessionDetailPage;
9
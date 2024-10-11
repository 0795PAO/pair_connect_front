import { Link } from "react-router-dom";

const ProjectInfoSession = ({ projectData, navigate, sessionId, isOwner }) => {

    return (
        <div className="flex flex-col items-center bg-card p-10 rounded-lg overflow-y-auto">
            
            <img
                src={projectData.image_url}
                alt="Proyecto"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover rounded-lg mb-6"
            />
            <h2 className="text-4xl font-bold text-textPrimary">
                {projectData.name}
            </h2>
            <h3 className="text-xl text-left font-bold mt-8 mb-2">Sobre el proyecto:</h3>
            <p className="mb-6 text-left">{projectData.description}</p>

            {!isOwner ? (
                projectData.owner_id ? (
                    <div className="mt-4 mb-4 text-left w-full">
                        <h2 className="text-xl font-bold mb-4">Responsable del proyecto:</h2>
                        <div className="flex items-center space-x-4">
                            {projectData.owner_avatar_url && (
                                <img
                                    src={projectData.owner_avatar_url}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                            )}
                            <Link
                                className="hover:text-primary transition-colors duration-300"
                                onClick={() => navigate(`/profile/${projectData.owner_id}/session/${sessionId}`)}
                            >
                                {projectData.owner_name || "Nombre no disponible"}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p className="mb-6">Información del dueño no disponible.</p>
                )
            ) : null}
        </div>
    );
};

export default ProjectInfoSession;

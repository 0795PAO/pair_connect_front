import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const ProjectInfoSession = ({ projectData, navigate }) => {
    return (
        <div className="flex flex-col items-start lg:items-start">
            <h1 className="text-6xl font-bold mb-6 text-left gradient2-text">
                {projectData.name}
            </h1>
            <img
                src={projectData.image_url}
                alt="proyecto"
                className="w-full lg:w-3/4 lg:mx-0 mx-auto mb-6 rounded-lg"
            />
            <h2 className="text-xl font-bold mb-4 text-left">Sobre el proyecto:</h2>
            <p className="mb-6 text-left">{projectData.description}</p>

            {projectData.owner_id ? (
                <div className="mt-4 mb-4 lg:mt-6 lg:mb-6 text-left">
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
                            onClick={() => navigate(`/profile/${projectData.owner_id}`)}
                        >
                            {projectData.owner_name || "Nombre no disponible"}
                        </Link>
                    </div>
                </div>
            ) : (
                <p className="mb-6">Información del dueño no disponible.</p>
            )}
        </div>
    )
}
export default ProjectInfoSession
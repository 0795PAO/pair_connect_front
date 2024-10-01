const ProjectCard = ({ project }) => {
    return (
      <div
        className="relative w-full max-w-[280px] sm:max-w-[430px] md:max-w-[588px] p-4 sm:p-5 md:p-6 rounded-lg border border-neutral-300 dark:border-neutral-800 
        bg-card text-card-foreground my-2 transition-transform duration-300 ease-in-out transform hover:scale-105  cursor-pointer flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          {/* Project Name */}
          <h3 className="text-base md:text-lg font-bold leading-tight">
            {project.name}
          </h3>
          
          {/* Project Image or Placeholder */}
          <img
            src={project.image_url || "/photo_default_project.svg"}
            alt="Imagen del proyecto"
            className="object-cover w-12 h-12 flex-shrink-0 overflow-hidden rounded-lg"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/photo_default_project.svg"; // Fallback to default if image fails to load
              }}
          />
        </div>
  
        {/* Project Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {project.description}
        </p>
      </div>
    );
  };
  
  export default ProjectCard;
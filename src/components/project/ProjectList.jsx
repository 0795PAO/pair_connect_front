const ProjectList = ({ projects, onProjectClick }) => {
    return (
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => onProjectClick(project)}
          >
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProjectList;
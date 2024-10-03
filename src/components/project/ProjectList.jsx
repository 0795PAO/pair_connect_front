import ProjectCard from './ProjectCard';  // Import the ProjectCard component

const ProjectList = ({ projects, onProjectClick, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} onClick={() => onProjectClick(project)}>
          <ProjectCard project={project} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
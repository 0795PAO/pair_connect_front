import ProjectCard from './ProjectCard';  // Import the ProjectCard component

const ProjectList = ({ projects, onProjectClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} onClick={() => onProjectClick(project)}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
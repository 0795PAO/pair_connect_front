import ProjectCard from './ProjectCard';  // Import the ProjectCard component

const ProjectList = ({ projects, onProjectClick, onProjectDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
          <ProjectCard 
            key={project.id}
            project={project} 
            onProjectClick={onProjectClick}  
            onProjectDelete={onProjectDelete} 
          />
      ))}
    </div>
  );
};

export default ProjectList;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProjectList from "@/components/project/ProjectList";
//import ProjectForm from "@/components/project/ProjectForm";
import ProjectDetails from "@/components/project/ProjectDetails";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
    // Fetch the user's projects from the backend
    /*     const fetchProjects = async () => {
            try {
            const response = await api.get('projects/');
            setProjects(response.data);
            } catch (error) {
            console.error('Error fetching projects', error);
            }
        };
        
        fetchProjects(); */

    // For now, we'll simulate with an empty array
        setProjects([]);
    }, []);

    const handleProjectClick = (project) => {
        //navigate(`/projects/${project.id}`);
        navigate("/projects");
    };

    const handleCreateProject = () => {
        navigate("/projects/create");  // Redirect to the form page
    };

    return (
        <div className="container mx-auto p-4">
      {selectedProject ? (
        <ProjectDetails project={selectedProject} />
      ) : (
        <>
          {projects.length === 0 ? (
            <div className="text-center">
              <p className="text-lg mb-4">No hay proyectos creados</p>
              <Button onClick={handleCreateProject}>Crear Proyecto</Button>
            </div>
          ) : (
            <ProjectList projects={projects} onProjectClick={handleProjectClick} />
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsPage
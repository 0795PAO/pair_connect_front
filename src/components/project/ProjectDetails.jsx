import { useState } from "react";
import { Button } from "@/components/ui/button";
//import SessionForm from "@/components/sessions/SessionForm";
import SessionList from "../session/SessionList";

const ProjectDetails = ({ project }) => {
  const [sessions, setSessions] = useState([]);
  const [showSessionForm, setShowSessionForm] = useState(true); // Show form initially if no sessions

  const handleAddSession = (newSession) => {
    setSessions([...sessions, newSession]);
    setShowSessionForm(false);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <img
        src={project.image || "/default_project_image.png"}
        alt="Project"
        className="w-full h-64 object-cover rounded-md"
      />
      <section>
        <h2 className="text-xl font-semibold">Sobre el proyecto</h2>
        <p>{project.description}</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Habilidades requeridas</h2>
        <p>Stack: {project.stack}</p>
        <p>Lenguajes y frameworks: {project.languages.join(", ")}</p>
        <p>Nivel: {project.level}</p>
      </section>

      {showSessionForm ? (
        <SessionForm
          project={project}
          onSessionCreated={handleAddSession}
        />
      ) : (
        <>
          <SessionList sessions={sessions} />
          <Button onClick={() => setShowSessionForm(true)}>Añade una sesión</Button>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

// Componente del Popup para la inscripción
const SignupPopup = ({ closePopup, saveMessage, projectName }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-xl font-bold mb-4">
          ¡Nos alegra ver que quieras apuntarte a la sesión de {projectName}!
        </h3>
        <p className="mb-4">¿Quieres dejar un mensaje?</p>
        <textarea
          className="border rounded-md p-2 w-full mb-4"
          placeholder="Escribe un mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div className="flex justify-between">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            onClick={closePopup}
          >
            Volver
          </button>
          <Button onClick={() => saveMessage(message)}>Guardar</Button>
        </div>
      </div>
    </div>
  );
};

// Componente del Popup para confirmación de éxito
const SuccessPopup = ({ closePopup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-xl font-bold mb-4">¡Mensaje enviado con éxito!</h3>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={closePopup}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectDetailsPage = () => {
  const { projectId } = useParams(); // Así obtenemos el ID del proyecto desde la URL
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Datos hardcodeados, cuando haya info hay que borrarlo
  const projectData = {
    logo: "/path-to-logo.png",
    title: `Proyecto ${projectId}`,
    date: "15 Septiembre 2024, 10:00h",
    image: "/path-to-image.png",
    description:
      "Este es un proyecto de ejemplo donde trabajaremos en equipo para lograr objetivos específicos. Se usarán varias tecnologías modernas.",
    profile:
      "Buscamos desarrolladores con experiencia en React, Node.js y MongoDB. Conocimiento en CSS y Tailwind es un plus.",
    collaborators: [
      { name: "Namine", avatar: "../../public/photo_namine.svg" },
      { name: "Italian", avatar: "../../public/photo_italian.svg" },
      {
        name: "Fire Fairy",
        avatar: "../../public/photo_fire.svg",
      },
    ],
  };

  const openSignupPopup = () => {
    setShowSignupPopup(true);
  };

  const closePopup = () => {
    setShowSignupPopup(false);
    setShowSuccessPopup(false);
  };

  const saveMessage = (message) => {
    console.log("Mensaje guardado:", message);
    setShowSignupPopup(false);
    setShowSuccessPopup(true);
  };

  return (
    <div className="p-6 bg-card h-full ">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{projectData.title}</h1>
        <p className="text-gray-500 mb-4">{projectData.date}</p>
        <img
          src={projectData.image}
          alt="proyecto"
          className="w-full mb-4 rounded-lg"
        />
        <h2 className="text-2xl font-bold mb-2">Sobre el proyecto:</h2>
        <p className="mb-4">{projectData.description}</p>

        <h2 className="text-2xl font-bold mb-2">El perfil que se busca:</h2>
        <p className="mb-4">{projectData.profile}</p>

        <h2 className="text-2xl font-bold mb-2">Colaboradores:</h2>
        <div className="flex gap-4 mb-4">
          {projectData.collaborators.map((collaborator, index) => (
            <div key={index} className="text-center">
              <img
                src={collaborator.avatar}
                alt={collaborator.name}
                className="w-12 h-12 rounded-full mb-2"
              />
              <p>{collaborator.name}</p>
            </div>
          ))}
        </div>
      </section>

      <Button onClick={openSignupPopup}>Apúntate</Button>

      {showSignupPopup && (
        <SignupPopup
          closePopup={closePopup}
          saveMessage={saveMessage}
          projectName={projectData.title}
        />
      )}
      {showSuccessPopup && <SuccessPopup closePopup={closePopup} />}
    </div>
  );
};

export default ProjectDetailsPage;

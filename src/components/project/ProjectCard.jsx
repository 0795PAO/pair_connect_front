/* eslint-disable react/prop-types */
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalConfirm from "../shared/ModalConfirm";
import { useState } from "react";

const ProjectCard = ({ project, onProjectClick, onProjectDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onProjectDelete(project.id);
    setIsModalOpen(false);
  };

    return (
      <div
        className="special-shadow w-full max-w-[420px] h-full max-h-[140px] p-4 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-card text-card-foreground transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer flex"
      >
          <img
            src={project.image_url || "/neon2.png"}
            alt="Imagen del proyecto"
            className="object-cover w-20 h-20 mr-4 rounded-lg flex-shrink-0"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/photo_default_project.svg";
              }}
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-start">
              <h3 className="text-base justify-left w-full md:text-lg font-bold leading-tight" onClick={() => onProjectClick(project)}>
                {project.name}
              </h3>
                <Button variant="ghost" size="icon" className="hover:text-primary font-light" onClick={handleDeleteClick}>
                  <Trash />
                </Button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2" onClick={() => onProjectClick(project)}>
              {project.description}
            </p>
        </div>

        <ModalConfirm
          title="Confirmación borrar proyecto"
          message={`¿Estas seguro que quieres borrar el proyecto "${project.name}"?`}
          border_color="border-red-600"
          open={isModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleModalClose}
          confirmButtonText="Borrar"
        />
      </div>
    );
  };
  
  export default ProjectCard;
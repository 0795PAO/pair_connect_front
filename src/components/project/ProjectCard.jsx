import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "../shared/Modal";
import { useState } from "react";

const ProjectCard = ({ project, onProjectDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true); // Open modal when trash button is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal when the user cancels or confirms
  };

  const handleConfirmDelete = () => {
    onProjectDelete(project.id); // Call the delete function passed as a prop
    setIsModalOpen(false); // Close modal after deletion
  };

    return (
      <div
        className="special-shadow w-full max-w-[420px] h-full max-h-[140px] p-4 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-card text-card-foreground transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer flex"
      >
          {/* Project Image or Placeholder */}
          <img
            src={project.image_url || "/photo_default_project.svg"}
            alt="Imagen del proyecto"
            //className="object-cover flex-shrink-0 overflow-hidden rounded-lg"
            className="object-cover w-20 h-20 mr-4 rounded-lg flex-shrink-0"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/photo_default_project.svg"; // Fallback to default if image fails to load
              }}
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-start">
              {/* Project Name */}
              <h3 className="text-base justify-left w-full md:text-lg font-bold leading-tight">
                {project.name}
              </h3>
                <Button variant="ghost" size="icon" className="hover:text-primary font-light" onClick={handleDeleteClick}>
                  <Trash />
                </Button>
            </div>

            {/* Project Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {project.description}
            </p>
        </div>
        {/* Modal for Confirming Project Deletion */}
        <Modal
          title="Confirm Deletion"
          message={`Are you sure you want to delete the project "${project.name}"?`}
          border_color="border-red-600"
          open={isModalOpen}
          onOpenChange={handleModalClose} // Close modal if user cancels
        />
        {isModalOpen && (
          <div className="flex justify-end mt-4">
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Confirmar Eliminación
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  export default ProjectCard;
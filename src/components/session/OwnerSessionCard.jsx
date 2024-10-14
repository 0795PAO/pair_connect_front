import { Trash, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalConfirm from "../shared/ModalConfirm";
import { useState } from "react";
import { formatTime, formatDate } from "@/utils/formaDateAndTime";

const formatCustomDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

const calculateEndTime = (startTime, duration) => {
  const [hours, minutes] = duration.split(":").map(Number);
  const startDateTime = new Date(startTime);
  startDateTime.setHours(startDateTime.getHours() + hours);
  startDateTime.setMinutes(startDateTime.getMinutes() + minutes);
  return startDateTime;
};

const OwnerSessionCard = ({ session, onClick, onSessionDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const endTime = calculateEndTime(session.schedule_date_time, session.duration);

  console.log('Interested Users:', session.interested_users);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onSessionDelete(session.id);
    setIsModalOpen(false);
  };

  return (
    <li
      className="special-shadow relative w-full max-w-[280px] sm:max-w-[420px] md:max-w-[500px] px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 
    bg-card text-card-foreground my-0 mx-0 transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer 
    md:min-h-[100px] lg:min-h-[120px] flex flex-col justify-between"
      data-testid="owner-session-card"
      onClick={isModalOpen ? null : onClick}
    >
      <div className="flex flex-col items-start justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 hover:text-primary font-light"
          onClick={handleDeleteClick}
        >
          <Trash />
        </Button>

        {session.interested_users?.length > 0 && (
          <Users className="absolute bottom-2 right-2 text-primary w-5 h-5" />
        )}

        <p className="text-xs sm:text-sm md:text-lg text-muted-foreground dark:text-muted-foreground-dark">
        {formatCustomDate(session.schedule_date_time)}: {formatTime(session.schedule_date_time)}-{formatTime(endTime)}  
        </p>

        <div className="flex items-center">
          <h2 className="mr-2 text-xs sm:text-sm md:text-base font-semibold">Descripción:</h2>
          <p className="text-xs sm:text-sm md:text-base line-clamp-2">
            {session.description ? session.description : "No description available"}
          </p>
        </div>

        <p className="text-xs sm:text-sm md:text-base text-muted-foreground dark:text-muted-foreground-dark">
          Stack: {session.stack_name}
        </p>

        <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-0 dark:text-muted-foreground-dark">
          Languages:{" "}
          {session.language_names
            ? session.language_names.join(", ")
            : "No languages specified"}
        </p>
      </div>

      <ModalConfirm
        title="Confirmación borrar sesión"
        message={`¿Estas seguro que quieres borrar la sesión "${session.description}"?`}
        border_color="border-red-600"
        open={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleModalClose}
        confirmButtonText="Borrar"
      />
    </li>
  );
};

export default OwnerSessionCard;

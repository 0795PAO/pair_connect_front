import { formatTime, formatDate } from "@/utils/formaDateAndTime";

const formatCustomDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
  return `${day}/${month}/${year}`;
};

const calculateEndTime = (startTime, duration) => {
  const [hours, minutes] = duration.split(":").map(Number);
  const startDateTime = new Date(startTime);
  startDateTime.setHours(startDateTime.getHours() + hours);
  startDateTime.setMinutes(startDateTime.getMinutes() + minutes);
  return startDateTime;
};

const OwnerSessionCard = ({ session }) => {
  const endTime = calculateEndTime(session.schedule_date_time, session.duration);

  return (
    <li
      className="special-shadow relative w-full max-w-[280px] sm:max-w-[420px] md:max-w-[500px] px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 
    bg-card text-card-foreground my-0 mx-0 transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer 
    md:min-h-[100px] lg:min-h-[120px] flex flex-col justify-between"
      data-testid="owner-session-card"
    >
      <div className="flex flex-col items-start justify-between">
        {/* Date and Time */}
        <p className="text-xs sm:text-sm md:text-lg text-muted-foreground dark:text-muted-foreground-dark">
        {formatCustomDate(session.schedule_date_time)}: {formatTime(session.schedule_date_time)}-{formatTime(endTime)}  
        </p>

        {/* Description */}
        <div className="flex items-center">
          <h2 className="mr-2 text-xs sm:text-sm md:text-base font-semibold">Descripción:</h2>
          <p className="text-xs sm:text-sm md:text-base line-clamp-2">
            {session.description ? session.description : "No description available"}
          </p>
        </div>

        {/* Stack */}
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground dark:text-muted-foreground-dark">
          Stack: {session.stack_name}
        </p>

        {/* Languages */}
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-0 dark:text-muted-foreground-dark">
          Languages:{" "}
          {session.language_names
            ? session.language_names.join(", ")
            : "No languages specified"}
        </p>
      </div>
    </li>
  );
};

export default OwnerSessionCard;

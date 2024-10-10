/* eslint-disable react/prop-types */
import SessionCardActions from "@/components/session/SessionCardActions";
import { formatTime, formatDate } from "@/utils/formaDateAndTime";
import { Link } from "react-router-dom";

const SessionCard = ({ session, to }) => {
  const imageUrl = session.projectImageUrl || "/neon2.png";

  return (
    <li
      className="special-shadow relative w-full md:max-w-[700px] p-4 md:p-6 rounded-lg border border-neutral-300 dark:border-neutral-800 
    bg-card text-card-foreground my-2 transition-transform duration-300 ease-in-out transform hover:scale-105  cursor-pointer 
    md:min-h-[220px] lg:min-h-[240px] flex flex-col justify-between"
      data-testid="session-card"
    >
      <Link to={to}>
        {session.status && session.status !== "default" && (
          <>
            {session.status === "enrolled" && (
              <img
                src="/icon_green.svg"
                alt="Estado Inscrito"
                className=" object-cover absolute w-2 h-2 top-2 right-2 sm:w-3 sm:h-3 sm:top-3 sm:right-3 md:w-4 md:h-4 md:top-4 md:right-4"
              />
            )}
            {session.status === "pending" && (
              <img
                src="/icon_yellow.svg"
                alt="Estado Pendiente"
                className=" object-coverabsolute w-2 h-2 top-2 right-2 sm:w-3 sm:h-3 sm:top-3 sm:right-3 md:w-4 md:h-4 md:top-4 md:right-4"
              />
            )}
            {session.status === "editable" && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4">
                <SessionCardActions session={session} />
              </div>
            )}
          </>
        )}

        <div className="flex flex-col justify-between pr-[70px] sm:pr-[90px] md:pr-[120px]">
          <p className="text-xs sm:text-sm md:text-lg text-muted-foreground dark:text-muted-foreground-dark">
            {formatDate(session.schedule_date_time)} -{" "}
            {formatTime(session.schedule_date_time)}
          </p>
          <div
            className="min-h-[2.5em] flex items-center"
            style={{
              minHeight: "2.5em",
            }}
          >
            <h3 className="text-sm font-bold leading-tight sm:text-base md:text-xl line-clamp-2">
              {session.project_name ? session.project_name : "Sin título"}
            </h3>
          </div>
          <div className="flex items-center gap-2 sm:gap-2">
            <img
              src={`${
                session.host_avatar_url
                  ? session.host_avatar_url
                  : "/avatar_no_bg.png"
              }`}
              alt={`${session.owner_name}'s avatar`}
              className="w-8 h-8 rounded-full sm:w-6 sm:h-6 md:w-8 md:h-8"
            />
            <span className="text-xs sm:text-sm md:text-base">
              {session.owner_name}
            </span>
          </div>
          <p className="text-xs truncate sm:text-sm md:text-base text-muted-foreground dark:text-muted-foreground-dark">
            {session.language_names
              ? session.language_names.join(", ")
              : "No especificado"}
          </p>
          <p className="text-xs sm:text-sm md:text-base line-clamp-2">
            {session.description}
          </p>
        </div>
        <img
          src={imageUrl}
          alt="Imagen del proyecto"
          className="absolute object-cover w-10 h-10 rounded-full bottom-2 right-2 sm:w-14 sm:h-14 md:w-24 md:h-24"
        />
      </Link>
    </li>
  );
};

export default SessionCard;

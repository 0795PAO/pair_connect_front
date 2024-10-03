import { useEffect, useState } from "react";
import { EventCalendar } from "@/components/shared/EventCalendar";
import Loader from "@/components/shared/Loader";
import { useProfile } from "@/hooks/useProfile";
import { useSuggestedSessions } from "@/hooks/useSuggestedSessions";
import CompleteProfileModal from "@/components/profile/CompleteProfileModal";

const UserHomePage = () => {
  const { data: user, isLoading: isProfileLoading, error } = useProfile();
  const [open, setOpen] = useState(false);

  const { data: sessions = [], isLoading: isSessionsLoading } =
    useSuggestedSessions();

  useEffect(() => {
    if (user && (!user.prog_language || !user.stack)) {
      setOpen(true);
    }
  }, [user]);

  return (
    <div
      data-testid="user-home-page"
      className="flex flex-col items-center w-full gap-5"
    >
      {isProfileLoading && <Loader />}
      {error && <p>Error: {error.message}</p>}
      {user && (
        <>
          <h1
            className="mb-4 font-poppins font-bold text-6xl leading-[120%] text-transparent bg-clip-text"
            style={{ backgroundImage: "var(--gradient)" }}
          >
            Pair Connect
          </h1>
          <h2 className="self-start text-3xl font-semibold">
            Hola, {user?.username}
          </h2>

          {/* Mostrar las sesiones sugeridas */}
          {isSessionsLoading ? (
            <Loader />
          ) : (
            <ul className="sessions-list">
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <li key={session.id}>
                    <h2>{session.title}</h2>
                    <p>{session.description}</p>
                    <p>Stack: {session.stack}</p>
                    <p>Level: {session.level}</p>
                    <p>Date: {session.date}</p>
                  </li>
                ))
              ) : (
                <p>No hay sesiones sugeridas disponibles.</p>
              )}
            </ul>
          )}
          <EventCalendar />
          <CompleteProfileModal open={open} onOpenChange={setOpen} />
        </>
      )}
    </div>
  );
};

export default UserHomePage;

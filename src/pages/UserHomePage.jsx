import { useState, useEffect } from "react";
import { EventCalendar } from "@/components/shared/EventCalendar";
import Loader from "@/components/shared/Loader";
import { useProfile } from "@/hooks/useProfile";
import { useSuggestedSessions } from "@/hooks/useSuggestedSessions";
import CompleteProfileModal from "@/components/profile/CompleteProfileModal";
import SessionCard from "@/components/session/SessionCard";

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
  console.log("Sessions in UserHomePage:", sessions);

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

          {isSessionsLoading ? (
            <Loader />
          ) : sessions.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </ul>
          ) : (
            <p>No hay sesiones sugeridas disponibles.</p>
          )}

          <EventCalendar />
          <CompleteProfileModal open={open} onOpenChange={setOpen} />
        </>
      )}
    </div>
  );
};

export default UserHomePage;

import { useState, useEffect, useRef } from "react";
import { EventCalendar } from "@/components/shared/EventCalendar";
import Loader from "@/components/shared/Loader";
import { useProfile } from "@/hooks/useProfile";
import { useSuggestedSessions } from "@/hooks/useSuggestedSessions";
import CompleteProfileModal from "@/components/profile/CompleteProfileModal";
import SessionCard from "@/components/session/SessionCard";
import SessionFilter from "@/components/session/SessionFilter";
import { useSessionFilter } from "@/hooks/useSessionFilter";
import { Button } from "@/components/ui/button";

const UserHomePage = () => {
  const { data: user, isLoading: isProfileLoading, error } = useProfile();
  const [open, setOpen] = useState(false);
  const { data: sessions = [], isLoading: isSessionsLoading } =
    useSuggestedSessions();
  const sessionListRef = useRef(null); // Ref para sesiones filtradas

  const {
    filteredSessions,
    searchTerm,
    setSearchTerm,
    selectedStack,
    setSelectedStack,
    selectedLevel,
    setSelectedLevel,
    selectedDate,
    setSelectedDate,
    applyFilters,
  } = useSessionFilter(sessions);

  useEffect(() => {
    if (user && (!user.prog_language || !user.stack)) {
      setOpen(true);
    }
  }, [user]);

  const handleSearchSessions = () => {
    applyFilters();
  };

  const disableNextButton = filteredSessions.length === 0;

  return (
    <div className="user-home-page flex flex-col items-center w-full gap-5">
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
          <h3 className="self-start text-xl ">Sesiones sugeridas para ti:</h3>

          <div ref={sessionListRef} className="mt-5">
            {isSessionsLoading ? (
              <Loader />
            ) : filteredSessions.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </ul>
            ) : (
              <p>No hay sesiones sugeridas disponibles.</p>
            )}
            <h3 className="self-start text-xl mt-16 ">
              ¡Busca otras sesiones de tu interés!
            </h3>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-4">
            <SessionFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedStack={selectedStack}
              setSelectedStack={setSelectedStack}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />
            <EventCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>

          <Button variant="specialShadow" onClick={handleSearchSessions}>
            Buscar sesiones
          </Button>

          <CompleteProfileModal open={open} onOpenChange={setOpen} />
        </>
      )}
    </div>
  );
};

export default UserHomePage;

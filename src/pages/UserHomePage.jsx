import { useState, useEffect } from "react";
import { EventCalendar } from "@/components/shared/EventCalendar";
import Loader from "@/components/shared/Loader";
import { useProfile } from "@/hooks/useProfile";
import { useSuggestedSessions } from "@/hooks/useSuggestedSessions";
import CompleteProfileModal from "@/components/profile/CompleteProfileModal";
import SessionFilter from "@/components/session/SessionFilter";
import SessionCard from "@/components/session/SessionCard";
import { Button } from "@/components/ui/button";
import { normalizeDate } from "@/utils/formaDateAndTime";
import { useAllSessions } from "@/hooks/useAllSessions";
import SessionSection from "@/components/session/SessionSection";

const UserHomePage = () => {
  const { data: user, isLoading: isProfileLoading, error } = useProfile();

  // Obtener todas las sesiones sugeridas
  const { data: suggestedSessions = [], isLoading: isSessionsLoading } = useSuggestedSessions();

  const { data: allSessions = [], isLoading: isAllSessionsLoading, error: allSessionsError } = useAllSessions();

  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStack, setSelectedStack] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);

  const filteredSuggestedSessions = suggestedSessions.filter((session) => {
    const sessionDate = normalizeDate(new Date(session.schedule_date_time));
    const today = normalizeDate(new Date());
    return sessionDate >= today;  
  });

  useEffect(() => {
    if (user && (!user.prog_language || !user.stack)) {
      setOpen(true);
    }
  }, [user]);

  useEffect(() => {
    const today = normalizeDate(new Date());
    const futureSessions = allSessions.filter((session) => {
      const sessionDate = normalizeDate(new Date(session.schedule_date_time));
      return sessionDate >= today;
    });
    setFilteredSessions(futureSessions);
  }, [allSessions]);

  const handleSearchSessions = () => {
    const today = normalizeDate(new Date());

    const filtered = allSessions.filter((session) => {
      const sessionDate = normalizeDate(new Date(session.schedule_date_time));
      const isFutureSession = sessionDate >= today;

      const matchesLanguage = session.language_names.some((language) =>
        language.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStack =
        selectedStack.length === 0 || selectedStack.includes(session.stack_name);
      const matchesLevel =
        selectedLevel.length === 0 || selectedLevel.includes(session.level_name);

      let matchesDate = true;
      if (selectedDate) {
        const normalizedSelectedDate = normalizeDate(selectedDate);
        matchesDate = sessionDate.getTime() === normalizedSelectedDate.getTime();
      }

      return (
        isFutureSession &&
        matchesLanguage &&
        matchesStack &&
        matchesLevel &&
        matchesDate
      );
    });

    setFilteredSessions(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStack([]);
    setSelectedLevel([]);
    setSelectedDate(null);

    const today = normalizeDate(new Date());
    const futureSessions = allSessions.filter((session) => {
      const sessionDate = normalizeDate(new Date(session.schedule_date_time));
      return sessionDate >= today;
    });
    setFilteredSessions(futureSessions);
  };

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
          <h2 className="self-start text-3xl font-semibold">Hola, {user?.username}</h2>

          <h3 className="self-start text-xl">Sesiones sugeridas para ti:</h3>
          <div className="mt-5">
            {isSessionsLoading ? (
              <Loader />
            ) : filteredSuggestedSessions.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSuggestedSessions.map((session) => (
                  <SessionCard key={session.id} session={session} to={`sessions/${session.id}`} />
                ))}
              </ul>
            ) : (
              <p>No hay sesiones sugeridas disponibles.</p>
            )}
          </div>

          <h3 className="self-start text-xl mt-16">¡Busca otras sesiones de tu interés!</h3>

          <div className="w-full flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <SessionFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedStack={selectedStack}
                setSelectedStack={setSelectedStack}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
              />
              <div className="w-full flex justify-center my-4">
                <EventCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              </div>
              <div className="flex gap-4 mt-4 justify-center">
                <Button variant={"specialShadow"} onClick={handleSearchSessions}>
                  Buscar sesiones
                </Button>
                <Button variant={"outline"} onClick={handleClearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <SessionSection
                sessions={filteredSessions}
                loading={isAllSessionsLoading}
                error={allSessionsError}
                to={/sessions/}
              />
            </div>
          </div>

          <CompleteProfileModal open={open} onOpenChange={setOpen} />
        </>
      )}
    </div>
  );
};

export default UserHomePage;
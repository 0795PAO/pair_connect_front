import { useState, useEffect, useRef } from "react";
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
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { getTotalPages } from "@/utils/sessionPagination";

const UserHomePage = () => {
  const { data: user, isLoading: isProfileLoading, error } = useProfile();
  const { data: suggestedSessions = [], isLoading: isSessionsLoading } =
    useSuggestedSessions();

  const {
    data: allSessions = [],
    isLoading: isAllSessionsLoading,
    error: allSessionsError,
  } = useAllSessions();

  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStack, setSelectedStack] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searched, setSearched] = useState(false);
  const [isButtonSpecial, setIsButtonSpecial] = useState(false);
  const sessionListRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 5;

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
        selectedStack.length === 0 ||
        selectedStack.includes(session.stack_name);
      const matchesLevel =
        selectedLevel.length === 0 ||
        selectedLevel.includes(session.level_name);

      let matchesDate = true;
      if (selectedDate) {
        const normalizedSelectedDate = normalizeDate(selectedDate);
        matchesDate =
          sessionDate.getTime() === normalizedSelectedDate.getTime();
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
    setSearched(true);
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
    setSearched(false);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    const totalPages = getTotalPages(filteredSessions, sessionsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * sessionsPerPage;
  const paginatedSessions = filteredSessions.slice(
    startIndex,
    startIndex + sessionsPerPage
  );

  const disablePreviousButton = currentPage === 1;
  const totalPages = getTotalPages(filteredSessions, sessionsPerPage);
  const disableNextButton = currentPage === totalPages;

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

          <h3 className="self-start text-xl">Sesiones sugeridas para ti:</h3>
          <div className="mt-5">
            {isSessionsLoading ? (
              <Loader />
            ) : suggestedSessions.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </ul>
            ) : (
              <p>No hay sesiones sugeridas disponibles.</p>
            )}
          </div>

          <h3 className="self-start text-xl mt-16">
            ¡Busca otras sesiones de tu interés!
          </h3>
          <div className="flex flex-col md:flex-row w-full gap-4 items-center">
            <SessionFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedStack={selectedStack}
              setSelectedStack={setSelectedStack}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />
            <div className="w-full md:w-1/2 flex justify-center mt-4 md:mt-0">
              <EventCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Button variant={"specialShadow"} onClick={handleSearchSessions}>
              Buscar sesiones
            </Button>
            <Button variant={"outline"} onClick={handleClearFilters}>
              Limpiar filtros
            </Button>
          </div>

          <div className="mt-5 w-full">
            <h3 className="self-start text-xl mt-8">Sesiones:</h3>
            <div className="flex justify-end my-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={disablePreviousButton}
              >
                <CircleChevronLeft />
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={disableNextButton}
              >
                <CircleChevronRight />
              </Button>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </ul>
            {filteredSessions.length === 0 && (
              <p>No hay sesiones disponibles.</p>
            )}
          </div>

          <CompleteProfileModal open={open} onOpenChange={setOpen} />
        </>
      )}
    </div>
  );
};

export default UserHomePage;

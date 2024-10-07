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
  const sessionListRef = useRef(null);
  const sessionFilterRef = useRef(null); // Ref para SessionFilter

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

  return (
    <div className="user-home-page flex flex-col items-center w-full gap-5">
      {isProfileLoading && <Loader />}
      {error && <p>Error: {error.message}</p>}
      {user && (
        <>
          <h1>Pair Connect</h1>
          <h2>Hola, {user.username}</h2>

          <div className="flex flex-col md:flex-row w-full">
            <SessionFilter
              ref={sessionFilterRef} // Pasar ref
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedStack={selectedStack}
              setSelectedStack={setSelectedStack}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />
            <EventCalendar />
          </div>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={isLastSession(sessions, startDate)}
          >
            <CircleChevronRight />
          </Button>

          <CompleteProfileModal open={open} onOpenChange={setOpen} />
        </>
      )}
    </div>
  );
};

export default UserHomePage;

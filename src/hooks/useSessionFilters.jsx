import { parse } from "date-fns";
import { useState, useMemo } from "react";

const useSessionFilters = (sessions = []) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStack, setSelectedStack] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const filteredSessions = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return sessions.filter((session) => {
      const sessionDate = new Date(session.schedule_date_time);
      const isFutureSession = sessionDate >= today;

      const matchesLanguage =
        searchTerm === "" ||
        session.language_names.some((language) =>
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
        console.log("Selected date:", selectedDate);
        const parsedSelectedDate = parse(selectedDate, "dd/MM/yyyy", new Date());
        matchesDate =
          sessionDate.toDateString() ===
          parsedSelectedDate.toDateString();
      }

      let matchesTime = true;
      if (selectedTime) {
        const sessionTime = sessionDate.toTimeString().substring(0, 5); 
        console.log("Session time:", sessionTime);
        console.log("Selected time:", selectedTime);
        matchesTime = sessionTime >= selectedTime;
        console.log("Matches time:", matchesTime);
      }

      return (
        isFutureSession &&
        matchesLanguage &&
        matchesStack &&
        matchesLevel &&
        matchesDate &&
        matchesTime
      );
    });
  }, [sessions, searchTerm, selectedStack, selectedLevel, selectedDate, selectedTime]);

  return {
    filteredSessions,
    searchTerm,
    setSearchTerm,
    selectedStack,
    setSelectedStack,
    selectedLevel,
    setSelectedLevel,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
  };
};

export default useSessionFilters;
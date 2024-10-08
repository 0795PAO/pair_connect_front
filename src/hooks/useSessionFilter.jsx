import { useState, useEffect } from "react";

export const useSessionFilter = (sessions) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStack, setSelectedStack] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);

  const [filteredSessions, setFilteredSessions] = useState([]);

  // useEffect(() => {
  //   if (sessions) {
  //     const filtered = sessions.filter((session) => {
  //       const matchesLanguage = session.language_names.some((language) =>
  //         language.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //       const matchesStack =
  //         selectedStack.length === 0 ||
  //         selectedStack.includes(session.stack_name);
  //       const matchesLevel =
  //         selectedLevel.length === 0 ||
  //         selectedLevel.includes(session.level_name);
  //       return matchesLanguage && matchesStack && matchesLevel;
  //     });
  //     setFilteredSessions(filtered);
  //   }
  // }, [sessions, searchTerm, selectedStack, selectedLevel]);

  useEffect(() => {
    if (sessions && sessions.length > 0) {
      const filtered = sessions.filter((session) => {
        const matchesLanguage = session.language_names.some((language) =>
          language.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesStack =
          selectedStack.length === 0 ||
          selectedStack.includes(session.stack_name);
        const matchesLevel =
          selectedLevel.length === 0 ||
          selectedLevel.includes(session.level_name);
        return matchesLanguage && matchesStack && matchesLevel;
      });
      setFilteredSessions(filtered);
    }
  }, [sessions, searchTerm, selectedStack, selectedLevel]);
  
  return {
    filteredSessions,
    searchTerm,
    setSearchTerm,
    selectedStack,
    setSelectedStack,
    selectedLevel,
    setSelectedLevel,
  };
};

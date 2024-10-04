import { useState, useEffect } from "react";
import {
  getSuggestedSessions,
  getAllSessions,
} from "../services/sessionService";

const useSessions = (filters = null) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMode, setFilteredMode] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        let response;
        if (filteredMode) {
          response = await getAllSessions();
        } else {
          response = await getSuggestedSessions();
        }

        setSessions(applyFilters(response, filters));
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [filters, filteredMode]);

  const applyFilters = (sessions, filters) => {
    let filteredSessions = sessions;

    if (filters.language) {
      filteredSessions = filteredSessions.filter((session) =>
        session.languages.includes(filters.language)
      );
    }
    if (filters.stack) {
      filteredSessions = filteredSessions.filter(
        (session) => session.stack === filters.stack
      );
    }
    if (filters.level) {
      filteredSessions = filteredSessions.filter(
        (session) => session.level === filters.level
      );
    }
    if (filters.date) {
      filteredSessions = filteredSessions.filter(
        (session) => session.date === filters.date
      );
    }

    return filteredSessions;
  };

  return { sessions, loading, setFilteredMode };
};

export default useSessions;

import {useState, useEffect } from "react";
import { EventCalendar } from "@/components/shared/EventCalendar";
import Loader from "@/components/shared/Loader";
import { useProfile } from "@/hooks/useProfile";
import useSessions from "../hooks/useSessions";
import CompleteProfileModal from "@/components/profile/CompleteProfileModal";

const UserHomePage = () => {
  const { data: user, isLoading, error } = useProfile();
  const [open, setOpen] = useState(false);


  const [filters, setFilters] = useState({
    language: "",
    stack: "",
    level: "",
    date: "",
  });

  const { sessions, loading, setFilteredMode } = useSessions(filters);


  useEffect(() => {
    if (user && (!user.prog_language || !user.stack)) {
      setOpen(true);
    }
  }, [user]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setFilteredMode(true);
  };

  return (
    <div
      data-testid="user-home-page"
      className="flex flex-col items-center w-full gap-5"
    >
      {isLoading && <Loader />}
      {error && <p>Error: {error.message}</p>}
      {user && (
        <>
          {" "}
          <h1
            className="mb-4 font-poppins font-bold text-6xl leading-[120%] text-transparent bg-clip-text"
            style={{ backgroundImage: "var(--gradient)" }}
          >
            Pair Connect
          </h1>
          <h2 className="self-start text-3xl font-semibold">
            Hola, {user?.username}
          </h2>
          <div className="filters-container">
            <label>Language:</label>
            <input
              type="text"
              name="language"
              value={filters.language}
              onChange={handleFilterChange}
            />

            <label>Stack:</label>
            <input
              type="text"
              name="stack"
              value={filters.stack}
              onChange={handleFilterChange}
            />

            <label>Level:</label>
            <input
              type="text"
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
            />

            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </div>
          {/* Mostrar las sesiones */}
          {loading ? (
            <Loader />
          ) : (
            <ul className="sessions-list">
              {sessions.map((session) => (
                <li key={session.id}>
                  <h2>{session.title}</h2>
                  <p>{session.description}</p>
                  <p>Stack: {session.stack}</p>
                  <p>Level: {session.level}</p>
                  <p>Date: {session.date}</p>
                </li>
              ))}
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

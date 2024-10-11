/* eslint-disable react/prop-types */
import { useState, forwardRef } from "react";
import SessionList from "./SessionList";
import { Button } from "../ui/button";
import { getTotalPages } from "@/utils/sessionPagination";
import { CircleChevronLeft, CircleChevronRight, Loader } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import useSessionFilters from "@/hooks/useSessionFilters";
import SessionFilter from "./SessionFilter";


const SessionSection = forwardRef(
  ({ sessions, to }, sessionListRef) => {
    const { data: projects, isLoading: loadingProjects, error: projectsError } = useProjects();

    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState(sessions?.length > 0 ? sessions[0].schedule_date_time : new Date());


    const filterOutPastSessions = (sessions = []) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return sessions.filter((session) => {
        const sessionDate = new Date(session.schedule_date_time);
        return sessionDate >= today;
      });
    };

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
      selectedTime,
      setSelectedTime
    } = useSessionFilters(filterOutPastSessions(sessions));


    console.log("Filtered sessions:", filteredSessions);
    console.log("Selected time:", selectedTime);
    console.log("Selected date:", selectedDate);

    const totalPages = getTotalPages(filteredSessions);

    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        const sessionIndex = (currentPage - 2) * 5;
        if (sessionIndex >= 0) {
          setStartDate(filteredSessions[sessionIndex].schedule_date_time);
        }
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        const sessionIndex = currentPage * 5;
        if (sessionIndex < filteredSessions.length) {
          setStartDate(filteredSessions[sessionIndex].schedule_date_time);
        }
      }
    };

    const disablePreviousButton = currentPage === 1;
    const disableNextButton = currentPage === totalPages;


    if (loadingProjects) {
      return <Loader />;
    }

    if (projectsError) {
      return <p>Error loading sessions or projects.</p>;
    }

    const projectMap = projects.reduce((acc, project) => {
      acc[project.id] = project.image_url;
      return acc;
    }, {});

    const enrichedSessions = filteredSessions.map((session) => ({
      ...session,
      projectImageUrl: projectMap[session.project_id] || "/neon2.png",
    }));


    return (
      <div ref={sessionListRef}>
        <section className="w-full grid grid-cols-1 xl:grid-cols-[4fr,5fr] gap-8 xl:gap-20">
          <div>
            <SessionFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedStack={selectedStack}
              setSelectedStack={setSelectedStack}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </div>
          <div>
            <div className="my-4 flex justify-end">
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

            <div className="lg:overflow-y-auto lg:max-h-[800px] scrollbar-thin scrollbar-thumb-primary scrollbar-track-background">
              <SessionList
                sessions={enrichedSessions}
                loading={false}
                error={false}
                startDate={startDate}
                currentPage={currentPage}
                to={to}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
);

SessionSection.displayName = "SessionSection";

export default SessionSection;
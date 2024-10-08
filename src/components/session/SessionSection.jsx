/* eslint-disable react/prop-types */
import { useState, forwardRef } from "react";
import SessionList from "./SessionList";
import { Button } from "../ui/button";
import { getTotalPages } from "@/utils/sessionPagination";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";

// Actualización: usar forwardRef
const SessionSection = forwardRef(
  ({ sessions, loadingSessions, error }, sessionListRef) => {
    const { data: projects, isLoading: loadingProjects, error: projectsError } = useProjects();
    const [startDate, setStartDate] = useState(
      sessions.length > 0 ? sessions[0].schedule_date_time : new Date()
    );
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = getTotalPages(sessions);

    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        const sessionIndex = (currentPage - 2) * 5;
        if (sessionIndex >= 0) {
          setStartDate(sessions[sessionIndex].schedule_date_time);
        }
      }
    };
    
    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        const sessionIndex = currentPage * 5;
        if (sessionIndex < sessions.length) {
          setStartDate(sessions[sessionIndex].schedule_date_time);
        }
      }
    };

    const disablePreviousButton = currentPage === 1;
    const disableNextButton = currentPage === totalPages;

    if (loadingSessions || loadingProjects) {
      return <div>Loading...</div>;
    }

    if (error || projectsError) {
      return <p>Error loading sessions or projects.</p>;
    }

    // Create a project map for quick lookup
    const projectMap = projects.reduce((acc, project) => {
      acc[project.id] = project.image_url;
      return acc;
    }, {});

    // Enrich sessions with their respective project image URLs
    const enrichedSessions = sessions.map((session) => ({
      ...session,
      projectImageUrl: projectMap[session.project_id] || "/neon2.png",
    }));

    return (
      <div ref={sessionListRef}>
        <section className="max-w-6xl mx-auto mt-5 lg:mt-0">
          <h3 className="mb-4 text-4xl font-bold">Sesiones Programadas:</h3>
          <div className="my-4">
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
          <SessionList
            sessions={enrichedSessions}
            loading={false}
            error={false}
            startDate={startDate}
            currentPage={currentPage}
          />
        </section>
      </div>
    );
  }
);

SessionSection.displayName = 'SessionSection';

export default SessionSection;

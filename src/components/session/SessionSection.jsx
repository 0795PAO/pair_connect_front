/* eslint-disable react/prop-types */
import { useState } from "react";
import SessionList from "./SessionList"
import { Button } from "../ui/button";
import { getTotalPages } from "@/utils/sessionPagination";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

const SessionSection = ({ sessions, loadingSessions, error, sessionListRef }) => {
    const [startDate, setStartDate] = useState(sessions.length > 0 ? sessions[0].schedule_date_time : new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = getTotalPages(sessions);



    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            const prevDate = new Date(startDate);
            prevDate.setDate(prevDate.getDate() - 5);
            setStartDate(prevDate);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            const nextDate = new Date(startDate);
            nextDate.setDate(nextDate.getDate() + 5);
            setStartDate(nextDate);
        }
    };


    const disablePreviousButton = currentPage === 1;
    const disableNextButton = currentPage === totalPages;

    return (


        <div ref={sessionListRef}>
            <section className="max-w-6xl mx-auto mt-5 lg:mt-0">
                <h3 className="mb-4 text-4xl font-bold">Sesiones Programadas:</h3>
                <div className="my-4">
                    <Button variant="outline" onClick={handlePrevious} disabled={disablePreviousButton}><CircleChevronLeft /></Button>
                    <Button variant="outline" onClick={handleNext} disables={disableNextButton}><CircleChevronRight /></Button>
                </div>
                <SessionList
                    sessions={sessions}
                    loading={loadingSessions}
                    error={error}
                    startDate={startDate}
                />
            </section>
        </div>

    )
}
export default SessionSection
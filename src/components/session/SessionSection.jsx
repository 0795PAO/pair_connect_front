/* eslint-disable react/prop-types */
import { useState } from "react";
import SessionList from "./SessionList"
import { Button } from "../ui/button";
import { normalizeDate } from "@/utils/formaDateAndTime";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

const SessionSection = ({ sessions, loadingSessions, error, sessionListRef }) => {
    const [startDate, setStartDate] = useState(sessions.length > 0 ? sessions[0].schedule_date_time : new Date());

    const isLastSession = (sessions, startDate) => {
        const lastSessionDate = normalizeDate(sessions[sessions.length - 1]?.schedule_date_time);
        const normalizedStartDate = normalizeDate(startDate);
        console.log(lastSessionDate >= normalizedStartDate);
        return normalizedStartDate >= lastSessionDate;

    };


    const handlePrevious = () => {
        const prevDate = new Date(startDate);
        prevDate.setDate(prevDate.getDate() - 5);
        setStartDate(prevDate);
    };


    const hasPreviousSessions = (sessions, startDate) => {
        const firstSessionDate = new Date(sessions[0]?.schedule_date_time);
        return firstSessionDate < new Date(startDate);
    };

    const handleNext = () => {
        const nextDate = new Date(startDate);
        nextDate.setDate(nextDate.getDate() + 5);
        setStartDate(nextDate);

    };


    const disablePreviousButton = !hasPreviousSessions(sessions, startDate);

    return (


        <div ref={sessionListRef}>
            <section className="max-w-6xl mx-auto mt-5 lg:mt-0">
                <h3 className="mb-4 text-4xl font-bold">Sesiones Programadas:</h3>
                <div className="my-4">
                    <Button variant="outline" onClick={handlePrevious} disabled={disablePreviousButton}><CircleChevronLeft /></Button>
                    <Button variant="outline" onClick={handleNext} disables={isLastSession(sessions, startDate)}><CircleChevronRight /></Button>
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
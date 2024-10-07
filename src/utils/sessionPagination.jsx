export const getTotalPages = (sessions) => {
    const futureSessions = sessions.filter(session => {
        const sessionDate = new Date(session.schedule_date_time);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return sessionDate >= today;
    });

    return Math.ceil(futureSessions.length / 5);
};
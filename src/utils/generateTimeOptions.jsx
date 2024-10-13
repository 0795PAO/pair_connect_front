export const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minutes = 0; minutes < 60; minutes += 15) {
            const time = `${hour.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}`;
            times.push(time);
        }
    }
    return times;
};
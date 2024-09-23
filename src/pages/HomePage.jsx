import { EventCalendar } from "@/components/ui/EventCalendar";
import { useState } from "react";

const HomePage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      HomePage
      <EventCalendar />
    </div>
  );
};

export default HomePage;

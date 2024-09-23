import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const HomePage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      HomePage
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
};

export default HomePage;

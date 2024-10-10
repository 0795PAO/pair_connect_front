/* eslint-disable react/prop-types */
import { useState } from "react";
import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const generateTimeOptions = () => {
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

export const EventCalendar = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) => {
  const defaultDate = format(new Date(), "dd/MM/yyyy");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateInputChange = (e) => {
    const selectedDate = e.target.value;
    if (isValid(parse(selectedDate, "dd/MM/yyyy", new Date()))) {
      setSelectedDate(selectedDate);
      setCurrentMonth(parse(selectedDate, "dd/MM/yyyy", new Date()));
    }
  };

  const handleDateSelect = (date) => {
    if (date) {
      const formattedDate = format(date, "dd/MM/yyyy");
      setSelectedDate(formattedDate);
      setCurrentMonth(date);
    }
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month); 
  };


  return (
    <div className="container mx-auto space-y-2 p-4 flex flex-col items-center">
      <label htmlFor="date">Seleccione una fecha</label>
      <Input
        name="date"
        placeholder="dd/mm/yyyy"
        value={selectedDate || defaultDate}
        onChange={handleDateInputChange}
      />

      <CalendarComponent
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        month={currentMonth}
        onMonthChange={handleMonthChange}
        className="rounded-md border w-[250px] mx-auto"
      />

      <label htmlFor="select"> Seleccione la hora</label>
      <Select value={selectedTime} onValueChange={setSelectedTime} name="time">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccione una hora" />
        </SelectTrigger>
        <SelectContent>
          {generateTimeOptions().map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
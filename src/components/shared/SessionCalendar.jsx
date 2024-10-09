/* eslint-disable react/prop-types */
import { useState } from "react";
import { format, parse } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import CustomInput from "@/components/shared/CustomInput";

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

export const SessionCalendar = ({ selectedDate, onDateChange, form }) => {
  const defaultDate = selectedDate || format(new Date(), "dd/MM/yyyy");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Log form values on every change
  console.log("Form values:", form.watch());

  const handleCalendarSelect = (date) => {
    if (!date) return;
    const formattedDate = format(date, "dd/MM/yyyy");
    console.log("Calendar selected date:", formattedDate); // Log selected date from the calendar

    onDateChange(formattedDate);
    form.setValue("date", formattedDate); // Update form's date field
    setCurrentMonth(date);
  };

  // Handle month navigation
  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  return (
    <div className="container mx-auto space-y-8 p-4">
      <div className="flex justify-between items-start space-x-8">
        {/* Calendar on the Left */}
        <CalendarComponent
          mode="single"
          selected={parse(defaultDate, "dd/MM/yyyy", new Date())}
          onSelect={handleCalendarSelect}
          month={currentMonth}
          onMonthChange={handleMonthChange}
          className="rounded-md border w-[250px]"
        />

        {/* Date and Time Inputs on the Right */}
        <div className="w-[250px] space-y-4">
          <CustomInput
            name="date"
            label="Seleccione la fecha"
            placeholder="dd/mm/yyyy"
            form={form}
          />

          <CustomInput
            name="time"
            label="Seleccione la hora"
            type="select"
            options={generateTimeOptions()}
            form={form}
            onChange={(e) => console.log("Time selected:", e.target.value)} // Log time change
          />

          <CustomInput
            name="duration"
            label="Duración (hh:mm)"
            type="text"
            placeholder="hh:mm"
            form={form}
            onChange={(e) => console.log("Duration entered:", e.target.value)} // Log duration change
          />

        </div>
      </div>
    </div>
  );
};

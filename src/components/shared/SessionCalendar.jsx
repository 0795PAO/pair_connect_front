/* eslint-disable react/prop-types */
import { useState } from "react";
import { format, parse } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import CustomInput from "@/components/shared/CustomInput";
import { generateTimeOptions } from "@/utils/generateTimeOptions";



export const SessionCalendar = ({ selectedDate, onDateChange, form }) => {
  const defaultDate = selectedDate || format(new Date(), "dd/MM/yyyy");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  console.log("Form values:", form.watch());

  const handleCalendarSelect = (date) => {
    if (!date) return;
    const formattedDate = format(date, "dd/MM/yyyy");
    onDateChange(formattedDate);
    form.setValue("date", formattedDate); 
    setCurrentMonth(date);
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  return (
    <div className="container p-4 mx-auto space-y-8">
      <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
        <CalendarComponent
          mode="single"
          selected={parse(defaultDate, "dd/MM/yyyy", new Date())}
          onSelect={handleCalendarSelect}
          month={currentMonth}
          onMonthChange={handleMonthChange}
          className="rounded-md border w-full sm:w-[250px]"
        />

        <div className="w-full sm:w-[250px] space-y-4">
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
            onChange={(e) => console.log("Time selected:", e.target.value)}
          />

          <CustomInput
            name="duration"
            label="Duración (hh:mm)"
            type="text"
            placeholder="hh:mm"
            form={form}
            onChange={(e) => console.log("Duration entered:", e.target.value)}
          />

        </div>
      </div>
    </div>
  );
};

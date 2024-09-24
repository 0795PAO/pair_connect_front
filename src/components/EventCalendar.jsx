import { useState } from "react";
import { format, parse, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";

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

const schema = yup.object({
  date: yup
    .string()
    .required("Seleccione una fecha")
    .test("isValidDate", "Seleccione una fecha válida", (value) =>
      isValid(parse(value, "dd/MM/yyyy", new Date()))
    ),
  time: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "El formato debe ser HH:mm")
    .required("Seleccione un horario"),
});

export const EventCalendar = () => {
  const defaultDate = format(new Date(), "dd/MM/yyyy");
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: defaultDate,
      time: "00:00",
    },
  });

  const handleSubmit = (data) => {
    const parsedDate = parse(data.date, "dd/MM/yyyy", new Date());

    if (!isValid(parsedDate)) {
      toast({
        title: "Error",
        description: "La fecha seleccionada no es válida.",
      });
      return;
    }

    setSelectedDate(format(parsedDate, "dd/MM/yyyy"));
    setCurrentMonth(parsedDate);
    toast({
      title: "Fecha y hora seleccionadas",
      description: `Seleccionaste la fecha: ${data.date} y la hora: ${data.time}`,
    });
  };

  return (
    <div className="container mx-auto space-y-8 p-4 w-[50vw]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
          />

          <Button type="submit">Guardar Fecha y Hora</Button>
        </form>
      </Form>

      <CalendarComponent
        mode="single"
        selected={parse(selectedDate, "dd/MM/yyyy", new Date())}
        onSelect={(date) => {
          const formattedDate = format(date, "dd/MM/yyyy");
          setSelectedDate(formattedDate);
          setCurrentMonth(date);
        }}
        month={currentMonth}
        className="rounded-md border w-[250px]"
      />
    </div>
  );
};

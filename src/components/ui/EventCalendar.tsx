import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Select from "react-select";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      const time = {
        value: `${hour.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`,
        label: `${hour.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`,
      };
      times.push(time);
    }
  }
  return times;
};

const FormSchema = z.object({
  date: z
    .string()
    .min(1, "Es necesario seleccionar una fecha.")
    .refine(
      (date) => {
        const parsedDate = parse(date, "dd/MM/yyyy", new Date());
        return !isNaN(parsedDate.getTime());
      },
      {
        message: "El formato debe ser 'dd/mm/yyyy'.",
      }
    ),
  time: z.string().min(1, "Es necesario seleccionar una hora."),
});

export const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: format(new Date(), "dd/MM/yyyy"),
      time: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const parsedDate = parse(data.date, "dd/MM/yyyy", new Date());
    setSelectedDate(parsedDate);
    setSelectedTime(data.time);

    toast({
      title: "Fecha y hora seleccionadas",
      description: `Seleccionaste la fecha: ${data.date} y la hora: ${data.time}`,
    });
  }

  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  // useEffect para traer eventos de la API cuando se seleccione una nueva fecha
  useEffect(() => {
    if (!selectedDate || !selectedTime) return;

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulación de una llamada a la API, debes reemplazar la URL con la de tu API
        const response = await fetch(
          `/api/events?date=${formattedDate}&time=${selectedTime}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los eventos");
        }
        const data = await response.json();
        setEvents(data.events); // Suponiendo que la API retorna un objeto con un campo "events"
      } catch (err) {
        // Verificación de tipo para asegurarnos que el error tiene un mensaje
        if (err instanceof Error) {
          setError(err.message); // Usar el mensaje del error si es una instancia de Error
        } else {
          setError("Error desconocido"); // Mensaje por defecto si el error no es una instancia de Error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedDate, selectedTime]);

  return (
    <div className="container mx-auto space-y-8 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Seleccionar Fecha</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    {...field}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal border rounded-md",
                      !field.value && "text-muted-foreground"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Seleccionar Hora</FormLabel>
                <FormControl>
                  <Controller
                    name="time"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        value={generateTimeOptions().find(
                          (option) => option.value === value
                        )}
                        onChange={(option) => onChange(option?.value)}
                        options={generateTimeOptions()}
                        placeholder="Selecciona una hora"
                        styles={{
                          menu: (provided) => ({
                            ...provided,
                            maxHeight: 200,
                            overflowY: "auto",
                          }),
                        }}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Guardar Fecha y Hora</Button>
        </form>
      </Form>

      <CalendarComponent
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
      />

      <div className="events mt-8">
        <h2 className="text-xl font-bold">
          {selectedDate && selectedTime
            ? `Eventos para el ${format(selectedDate, "dd/MM/yyyy", {
                locale: es,
              })} a las ${selectedTime}`
            : "Selecciona una fecha y hora para ver los eventos"}
        </h2>
        <div className="mt-4 space-y-4">
          {loading && <p>Cargando eventos...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && events.length === 0 && (
            <p>No hay eventos para esta fecha y hora.</p>
          )}
          {!loading &&
            !error &&
            events.length > 0 &&
            events.map((event, index) => (
              <div
                key={index}
                className="event-item p-4 border rounded-md shadow-sm bg-white"
              >
                <h3 className="font-semibold">{event.title}</h3>
                <p>{event.description}</p>
                <p className="text-sm text-gray-500">{event.time}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

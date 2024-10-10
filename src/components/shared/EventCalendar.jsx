/* eslint-disable react/prop-types */
// import { useState } from "react";
// import { format, parse, isValid } from "date-fns";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { toast } from "@/hooks/useToast";
// import { Button } from "@/components/ui/button";
// import { Calendar as CalendarComponent } from "@/components/ui/calendar";
// import { Form } from "@/components/ui/form";
// import CustomInput from "@/components/shared/CustomInput";

// const generateTimeOptions = () => {
//   const times = [];
//   for (let hour = 0; hour < 24; hour++) {
//     for (let minutes = 0; minutes < 60; minutes += 15) {
//       const time = `${hour.toString().padStart(2, "0")}:${minutes
//         .toString()
//         .padStart(2, "0")}`;
//       times.push(time);
//     }
//   }
//   return times;
// };

// const schema = yup.object({
//   date: yup
//     .string()
//     .required("Seleccione una fecha")
//     .test("isValidDate", "Seleccione una fecha válida", (value) =>
//       isValid(parse(value, "dd/MM/yyyy", new Date()))
//     ),
//   time: yup
//     .string()
//     .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "El formato debe ser HH:mm")
//     .required("Seleccione un horario"),
// });

// export const EventCalendar = ({ selectedDate, setSelectedDate }) => {
//   const defaultDate = format(new Date(), "dd/MM/yyyy");
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   const form = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       date: selectedDate || defaultDate,
//       time: "00:00",
//     },
//   });

//   const handleDateSelect = (date) => {
//     if (date) {
//       const formattedDate = format(date, "dd/MM/yyyy");
//       form.setValue("date", formattedDate);
//       setSelectedDate(formattedDate);
//       setCurrentMonth(date);
//     }
//   };

//   const handleSubmit = (data) => {
//     const parsedDate = parse(data.date, "dd/MM/yyyy", new Date());

//     if (!isValid(parsedDate)) {
//       toast({
//         title: "Error",
//         description: "La fecha seleccionada no es válida.",
//       });
//       return;
//     }

//     setSelectedDate(format(parsedDate, "dd/MM/yyyy"));
//     setCurrentMonth(parsedDate);
//     toast({
//       title: "Fecha y hora seleccionadas",
//       description: `Seleccionaste la fecha: ${data.date} y la hora: ${data.time}`,
//     });
//   };

//   return (
//     <div className="container mx-auto space-y-8 p-4 flex flex-col items-center">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(handleSubmit)}
//           className="space-y-4 w-[250px] mx-auto"
//         >
//           <CustomInput
//             name="date"
//             label="Seleccione la fecha"
//             placeholder="dd/mm/yyyy"
//             form={form}
//             onChange={(e) => {
//               const selectedDate = e.target.value;
//               if (isValid(parse(selectedDate, "dd/MM/yyyy", new Date()))) {
//                 setSelectedDate(selectedDate);
//                 setCurrentMonth(parse(selectedDate, "dd/MM/yyyy", new Date()));
//               }
//             }}
//           />

//           <CustomInput
//             name="time"
//             label="Seleccione la hora"
//             type="select"
//             options={generateTimeOptions()}
//             form={form}
//           />

//           <div className="flex justify-center w-full">
//             <Button type="submit">Guardar Fecha y Hora</Button>
//           </div>
//         </form>
//       </Form>

//       <CalendarComponent
//         mode="single"
//         selected={parse(selectedDate || defaultDate, "dd/MM/yyyy", new Date())}
//         onSelect={handleDateSelect}
//         month={currentMonth}
//         className="rounded-md border w-[250px] mx-auto"
//       />
//     </div>
//   );
// };


import { useState } from "react";
import { format, parse, isValid } from "date-fns";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Form } from "@/components/ui/form";
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

export const EventCalendar = ({ selectedDate, setSelectedDate, seelecyedTime, setSelectedTime }) => {
  const defaultDate = format(new Date(), "dd/MM/yyyy");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: selectedDate || defaultDate,
      time: "00:00",
    },
  });

  const handleDateSelect = (date) => {
    if (date) {
      const formattedDate = format(date, "dd/MM/yyyy");
      form.setValue("date", formattedDate);
      setSelectedDate(formattedDate); 
      setCurrentMonth(date);
    }
  };

  return (
    <div className="container mx-auto space-y-8 p-4 flex flex-col items-center">
      <Form {...form}>
        <form className="space-y-4 w-[250px] mx-auto">
          <CustomInput
            name="date"
            label="Seleccione la fecha"
            placeholder="dd/mm/yyyy"
            form={form}
            onChange={(e) => {
              const selectedDate = e.target.value;
              if (isValid(parse(selectedDate, "dd/MM/yyyy", new Date()))) {
                setSelectedDate(selectedDate); 
                setCurrentMonth(parse(selectedDate, "dd/MM/yyyy", new Date()));
              }
            }}
          />

          <CustomInput
            name="time"
            label="Seleccione la hora"
            type="select"
            options={generateTimeOptions()}
            form={form}
          />
        </form>
      </Form>

      <CalendarComponent
        mode="single"
        selected={parse(selectedDate || defaultDate, "dd/MM/yyyy", new Date())}
        onSelect={handleDateSelect} 
        month={currentMonth}
        className="rounded-md border w-[250px] mx-auto"
      />
    </div>
  );
};

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/shared/CustomInput";
import { EventCalendar } from "../shared/EventCalendar";

const sessionSchema = yup.object().shape({
  date: yup.string().required("Seleccione una fecha"),
  time: yup.string().required("Seleccione una hora"),
  duration: yup
    .number()
    .positive("La duración debe ser positiva")
    .required("Ingrese una duración"),
  stack: yup.string().required("Seleccione el stack"),
  language: yup.string().required("Seleccione un lenguaje"),
  description: yup.string().nullable(),
});

const SessionForm = ({ project, onSessionCreated }) => {
  console.log("Project data in SessionForm:", project);

  const stack = project?.stack_name || "Full-stack";
  const languages = project?.language_names || [];
  console.log("Languages in SessionForm:", languages);

  const [selectedStack, setSelectedStack] = useState(
    stack === "Full-stack" ? "" : stack
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.length === 1 ? languages[0].id : ""
  );

  const form = useForm({
    resolver: yupResolver(sessionSchema),
    defaultValues: {
      date: "",
      time: "",
      duration: "",
      stack: selectedStack,
      language: selectedLanguage,
      description: "",
    },
  });

  // Log form default values for debugging
  useEffect(() => {
    console.log("Form default values:", form.getValues());
  }, [form]);

  const handleSubmit = (data) => {
    console.log("Session form submitted data:", data);
    onSessionCreated(data);
  };

  return (
    <div className="session-form-wrapper">
      {/* Render the EventCalendar component without changes */}
      <EventCalendar />
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-6">
        {/* Stack Selection */}
        {stack === "Full-stack" ? (
          <CustomInput
            name="stack"
            label="Seleccione el stack"
            type="select"
            options={[
              { value: "Frontend", label: "Frontend" },
              { value: "Backend", label: "Backend" },
            ]}
            form={form}
          />
        ) : (
          <CustomInput
            name="stack"
            label="Stack"
            value={stack}
            form={form}
            disabled
          />
        )}

        {/* Language Selection */}
        {languages.length > 1 ? (
          <CustomInput
            name="language"
            label="Seleccione el lenguaje"
            type="select"
            options={languages.map((lang) => ({
              value: lang,
              label: lang,
            }))}
            form={form}
          />
        ) : languages.length === 1 ? (
          <CustomInput
            name="language"
            label="Lenguaje"
            value={languages[0]}
            form={form}
            disabled
          />
        ) : (
          <p>No hay lenguajes especificados para este proyecto.</p>
        )}

        {/* Duration Input */}
        <CustomInput
          name="duration"
          label="Duración (horas)"
          type="number"
          form={form}
        />

        {/* Description Textarea */}
        <CustomInput
          name="description"
          label="Descripción de la sesión"
          type="textarea"
          form={form}
        />

        {/* Submit Button */}
        <Button type="submit" className="mt-4">
          Crear Sesión
        </Button>
      </form>
    </div>
  );
};

export default SessionForm;
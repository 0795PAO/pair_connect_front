/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/button';
import CustomDynamicInput from '../shared/CustomDynamicInput';
import { Form } from '../ui/form';
import { SessionCalendar } from '../shared/SessionCalendar';
import { createSession } from '@/services/sessionService';
import { useToast } from "@/hooks/useToast";

const schema = yup.object({
  name: yup.string().required('El nombre de la sesión es obligatorio'),
  date: yup.string().required('Seleccione una fecha'),
  time: yup.string().required('Seleccione una hora'),
  duration: yup
    .string()
    .matches(/^([0-9]{1,2}):([0-5][0-9])$/, 'El formato debe ser hh:mm')
    .required('Ingrese una duración en formato hh:mm'),
  stack: yup.string().required('El stack es obligatorio'),
  languages: yup.array().min(1, 'Seleccione al menos un lenguaje').of(yup.string().required('Selecciona lenguajes válidos')),
  description: yup.string(),
  participant_limit: yup.number().min(0, 'El límite de participantes debe ser un número positivo').nullable(),
  session_link: yup
    .string()
    .test('is-valid-url', 'Debe ser un enlace válido', (value) => {
      if (!value) return true;
      return /^(http(s)?:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*$/.test(value);
    })
    .nullable(),
  is_private: yup.boolean().nullable(),
});

const SessionForm = ({ handleSubmit, loading, options, onCancel, projectStack, projectLanguages, projectId, projectLevelId, stacks, languages, onSessionCreated }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      date: '',
      time: '',
      duration: '02:00',
      stack: projectStack || '',
      languages: [],
      description: '',
      participant_limit: null,
      session_link: '',
      is_private: false,
    },
  });

  const getStackOptions = () => {
    if (projectStack === 'Fullstack') {
      return [
        { value: 'Frontend', label: 'Frontend' },
        { value: 'Backend', label: 'Backend' },
        { value: 'Fullstack', label: 'Fullstack' },
      ];
    } else {
      return [{ value: projectStack, label: projectStack }];
    }
  };

  const getLanguageOptions = () => {
    return projectLanguages.map(lang => ({ value: lang, label: lang })); 
  };

  const handleFormSubmit = async (formData) => {
    const stackId = stacks?.find(s => s.label === formData.stack)?.value;
    const languageIds = formData.languages.map(langName => {
      const language = languages?.find(l => l.label === langName);
      return language?.value;
    });

    const scheduleDateTime = `${formData.date.split("/").reverse().join("-")}T${formData.time}`;
    const [hours, minutes] = formData.duration.split(":");
    const duration = `${hours}:${minutes}:00`;

    if (formData.session_link && !formData.session_link.startsWith('http')) {
      formData.session_link = `http://${formData.session_link}`;
    }

    const sessionData = {
      ...formData,
      duration,
      project: projectId,
      stack_id: stackId,
      language_ids: languageIds,
      schedule_date_time: scheduleDateTime,
      participant_limit: formData.participant_limit ? parseInt(formData.participant_limit, 10) : 0,
      is_private: formData.is_private,
    };

    try {
      const response = await createSession(sessionData);
      const createdSession = response;

      if (onSessionCreated) {
        onSessionCreated(createdSession);
      }

      toast({
        title: "Éxito",
        description: "La sesión se ha creado correctamente!",
        variant: "success",
      });
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else {
        console.error('Error creating session:', error.message);
        toast({
          title: "Error",
          description: "¡Oops! No se ha podido actualizar los datos de la sesión. Por favor, intentalo de nuevo.",
          variant: "destructive",
      });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} role="form" className="flex flex-col gap-5 w-full">
        <SessionCalendar
          selectedDate={form.watch('date')}
          onDateChange={(date) => form.setValue('date', date)}
          form={form}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <CustomDynamicInput
            form={form}
            placeholder="Titulo de la sesión"
            label="Nombre"
            name="name"
            type="text"
          />

          <CustomDynamicInput
            form={form}
            placeholder="Frontend, Backend o ambos"
            label="Stack"
            name="stack"
            type="select"
            options={getStackOptions()}
          />
          <CustomDynamicInput
            form={form}
            placeholder="Lenguaje de esta sesión"
            label="Lenguajes y frameworks"
            name="languages"
            type="multiselect"
            options={getLanguageOptions()}
          />

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <CustomDynamicInput
            form={form}
            placeholder="Ilimitado por defecto"
            label="Límite de participantes"
            name="participant_limit"
            type="number"
            className="appearance-none background-none" // Removes background styling for arrows
          />
          <div className="flex items-start space-x-2 pt-1">
            <label className="block text-md font-medium text-white mr-2">
              Sesión privada
            </label>
            <CustomDynamicInput
              form={form}
              name="is_private"
              type="checkbox"
              className="w-4 h-4 mt-0" // Ensures checkbox is in line with the label
            />
          </div>
        </div>
        <CustomDynamicInput
          form={form}
          placeholder="Enlace a la sesión"
          label="Enlace a la sesión"
          name="session_link"
          type="text"
          className="w-full"
        />
        <CustomDynamicInput
          form={form}
          placeholder="¿En qué se va a trabajar esta sesión?"
          label="Descripción de sesión"
          name="description"
          type="textarea"
          className="w-full"
        />

        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 space-x-2 col-span-1 sm:col-span-2">
          <Button variant="secondary" className="w-[35%] self-center whitespace-normal break-words" onClick={onCancel}>
            Ahora no
          </Button>
          <Button type="submit" className="w-[50%] self-center whitespace-normal break-words">
            {loading ? 'Cargando...' : 'Crear Sesion'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SessionForm;
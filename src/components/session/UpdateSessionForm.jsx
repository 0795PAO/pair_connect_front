import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomDynamicInput from '../shared/CustomDynamicInput';
import { Form } from '../ui/form';

const schema = yup.object({
    date: yup.string().required('Seleccione una fecha'),
    time: yup.string().required('Seleccione una hora'),
    duration: yup.string().matches(/^([0-9]{1,2}):([0-5][0-9])$/, 'El formato debe ser hh:mm').required(),
    stack: yup.string().required(),
    languages: yup.array().min(1).of(yup.string().required()),
    description: yup.string(),
    participant_limit: yup.number().min(0).nullable(),
    session_link: yup.string().nullable(),
    is_private: yup.boolean().nullable(),
  });
  

  const UpdateSessionForm = ({ sessionData, onSubmit, onCancel }) => {
    // Log sessionData to verify its content
    console.log('sessionData:', sessionData);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
    };

    // Convert UTC time to local time and format the time
    const formatTimeToLocal = (dateString) => {
        const date = new Date(dateString);
        const localHours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${localHours}:${minutes}`;
    };    

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            date: sessionData?.schedule_date_time ? formatDate(sessionData.schedule_date_time) : '',
            time: sessionData?.schedule_date_time ? formatTimeToLocal(sessionData.schedule_date_time) : '',
            duration: sessionData?.duration.split(":").slice(0, 2).join(":") || '02:00',
            stack: sessionData?.stack_name || '',
            languages: sessionData?.language_names || [],
            description: sessionData?.description || '',
            participant_limit: sessionData?.participant_limit || null,
            session_link: sessionData?.session_link || '',
            is_private: sessionData?.is_private || false,
        },
    });

    const handleFormSubmit = (data) => {
        console.log('Submitted data:', data); // Debug log to ensure data is correct

        const [hours, minutes] = data.duration.split(":");
        const duration = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;

        if (data.session_link && !data.session_link.startsWith('http')) {
            data.session_link = `http://${data.session_link}`;
        }

        const scheduleDateTime = `${data.date}T${data.time}`;

        const formattedData = {
            ...data,
            duration,
            schedule_date_time: scheduleDateTime,
            participant_limit: data.participant_limit ? parseInt(data.participant_limit, 10) : null,
            is_private: Boolean(data.is_private),
        };
        onSubmit(formattedData);
    };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">
        {/* Form Inputs */}
        <CustomDynamicInput form={form} label="Fecha" name="date" type="date" />
        <CustomDynamicInput form={form} label="Hora" name="time" type="time" />
        <CustomDynamicInput form={form} label="Duración" name="duration" type="text" />
        <CustomDynamicInput form={form} label="Descripción de la sesión" name="description" type="textarea" />
        <CustomDynamicInput form={form} label="Límite de participantes" name="participant_limit" type="number" />
        <CustomDynamicInput form={form} label="Enlace a la sesión" name="session_link" type="text" />
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                {...form.register("is_private")}
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded-sm"
            />
            <label htmlFor="is_private" className="text-base">
                Sesión privada
            </label>
        </div>
        <div className="flex justify-end gap-2">
            <button type="button" onClick={onCancel} className="bg-gray-200 text-black px-4 py-2 rounded-md">Cancelar</button>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">Guardar</button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateSessionForm;

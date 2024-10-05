/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/button';
import CustomDynamicInput from '../shared/CustomDynamicInput';
import { Form } from '../ui/form';
import { SessionCalendar } from '../shared/SessionCalendar';

const schema = yup.object({
  date: yup.string().required('Seleccione una fecha'),
  time: yup.string().required('Seleccione una hora'),
  duration: yup
    .string()
    .matches(/^([0-9]{1,2}):([0-5][0-9])$/, 'El formato debe ser hh:mm')
    .required('Ingrese una duración en formato hh:mm'),
  stack: yup.string().required('El stack es obligatorio'),
  languages: yup.array().min(1, 'Seleccione al menos un lenguaje').of(yup.string().required('Selecciona lenguajes válidos')),
  description: yup.string(),
});

const SessionForm = ({ handleSubmit, loading, options, onCancel, projectStack, projectLanguages }) => {
  // Form state with shared validation schema
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: '',
      time: '',
      duration: '02:00',
      stack: projectStack || '',
      languages: [],
      description: '',
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
    return projectLanguages.map(lang => ({ value: lang, label: lang }));  // Use projectLanguages array to populate
  };

  const projectInputs = [
    {
        name: 'description',
        type: 'textarea',
        placeholder: '¿En qué se va a trabajar esta sesión?',
        label: 'Descripción de sesión',
    },
    {
        name: 'stack',
        type: 'select',
        placeholder: 'Frontend, Backend o ambos',
        label: 'Stack',
        options: getStackOptions(),  // Use dynamic data
    },
    {
        name: 'languages',
        type: 'multiselect',
        placeholder: 'Lenguaje de esta sesión',
        label: 'Lenguajes y frameworks',
        options: getLanguageOptions(),  // Use dynamic data
    },    
];
 
return (
  <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} role="form" className="flex flex-col gap-5">
        <SessionCalendar
          selectedDate={form.watch('date')}
          onDateChange={(date) => form.setValue('date', date)}
          form={form} // Pass form object to keep fields in sync
        />
          
        {projectInputs.map((input, i) => (
            <CustomDynamicInput
                key={i}
                form={form}
                placeholder={input.placeholder}
                label={input.label}
                name={input.name}
                type={input.type}
                options={input.options} // For select/multiselect
                accept={input.accept}  // For file inputs
            />
        ))}
          
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
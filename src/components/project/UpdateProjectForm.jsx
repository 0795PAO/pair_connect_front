import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/button';
import CustomDynamicInput from '../shared/CustomDynamicInput';
import { Form } from '../ui/form';

const schema = yup.object({
    name: yup.string().required('El título es obligatorio'),
    description: yup.string().required('La descripción es obligatoria'),
    stack: yup.string().required('El stack es obligatorio'),
    languages: yup.array().min(1, 'Seleccione al menos un lenguaje').of(yup.string().required('Selecciona lenguajes válidos')),
    level: yup.string().required('El nivel es obligatorio'),
});

const UpdateProjectForm = ({ handleSubmit, loading, options, defaultValues, onCancel }) => {
  const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
          name: defaultValues?.name || '',
          description: defaultValues?.description || '',
          stack: defaultValues?.stack || '',
          languages: defaultValues?.languages || [],
          level: defaultValues?.level || '',
      },
  });

  const projectInputs = [
    {
        name: 'name',
        type: 'text',
        placeholder: 'Un título molón para tu proyecto',
        label: 'Título',
    },
    {
        name: 'description',
        type: 'textarea',
        placeholder: 'Escribe la esencia de tu proyecto aquí',
        label: 'Descripción',
    },
    {
        name: 'stack',
        type: 'select',
        placeholder: 'Frontend, Backend o ambos',
        label: 'Stack',
        options: options?.stacks || [],  // Use dynamic data
    },
    {
        name: 'languages',
        type: 'multiselect',
        placeholder: '¿En qué idioma habla tu proyecto?',
        label: 'Lenguajes y frameworks',
        options: options?.languages || [],  // Use dynamic data
    },
    {
        name: 'level',
        type: 'select',
        placeholder: 'Grado de maestría',
        label: 'Nivel',
        options: options?.levels || [],  // Use dynamic data
    },
  ];

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} role="form" className="flex flex-col gap-5">
            {projectInputs.map((input, i) => (
                <CustomDynamicInput
                    key={i}
                    form={form}
                    placeholder={input.placeholder}
                    label={input.label}
                    name={input.name}
                    type={input.type}
                    options={input.options} // For select/multiselect
                />
            ))}
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 space-x-2 col-span-1 sm:col-span-2">
              <Button variant="secondary" className="w-[35%] self-center whitespace-normal break-words" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" className="w-[50%] self-center whitespace-normal break-words">
                  {loading ? 'Cargando...' : 'Actualizar Proyecto'}
              </Button>
            </div>
        </form>
    </Form>
  );
};

export default UpdateProjectForm;
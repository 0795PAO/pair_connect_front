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
  image: yup.mixed().nullable().notRequired()
});

const ProjectForm = ({ handleSubmit, loading, options }) => {
  const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
          name: '',
          description: '',
          stack: '',
          languages: [],
          level: '',
          image: null,
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
    {
        name: 'image',
        type: 'file',
        placeholder: 'Clicka y ponle rostro a tu proyecto',
        label: 'Imagen del proyecto',
        onChange: (event) => {
            const file = event.target.files[0];
            console.log("Selected image:", file);
          }
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
                  accept={input.accept}  // For file inputs
              />
          ))}
          <Button type="submit" className="w-[50%] self-center">
              {loading ? 'Cargando...' : 'Crear Proyecto'}
          </Button>
      </form>
  </Form>
);
};

export default ProjectForm;
import api from "@/config/apiInterceptor";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/shared/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
  title: yup.string().required("El título es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  stack: yup.string().required("El stack es obligatorio"),
  languages: yup.array().min(1, "Seleccione al menos un lenguaje"),
  level: yup.string().required("El nivel es obligatorio"),
});

const languageOptions = [
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "php", label: "PHP" },
    { value: "typescript", label: "TypeScript" },
    { value: "bash", label: "Bash" },
    { value: "nodejs", label: "Node.js" },
    { value: "sql", label: "SQL" },
    { value: "r", label: "R" },
    { value: "spring", label: "Spring" },
    { value: "react", label: "React" },
    { value: "vuejs", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "django", label: "Django" },
    { value: "ruby-on-rails", label: "Ruby on Rails" },
    { value: "laravel", label: "Laravel" },
    { value: "jest", label: "Jest" },
    { value: "pytest", label: "PyTest" },
  ]


const ProjectForm = ({ onClose, onProjectCreated }) => {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      stack: "",
      languages: [],
      level: "",
      image: null,
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append form fields
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('stack', data.stack);
      formData.append('level', data.level);
      formData.append('languages', JSON.stringify(data.languages));

      // Append the image file if it exists
      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]);
      }

      // Use the axios instance with interceptors
      const response = await api.post('projects/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onProjectCreated(response.data);
    } catch (error) {
      console.error('Error creating project', error);
      // Handle errors (e.g., display error messages)
    }
  };

  const projectInputs = [
    {
      name: "title",
      label: "Título",
      placeholder: "Título del proyecto",
      type: "text",
    },
    {
      name: "description",
      label: "Descripción",
      placeholder: "Descripción del proyecto",
      type: "textarea",
    },
    {
      name: "stack",
      label: "Stack",
      type: "select",
      options: ["Frontend", "Backend", "Fullstack"],
      placeholder: "Seleccione una opción",
    },
    {
      name: "languages",
      label: "Lenguajes y frameworks",
      type: "multiselect",
      options: languageOptions,
      placeholder: "Seleccione lenguajes y frameworks",
    },
    {
      name: "level",
      label: "Nivel",
      type: "select",
      options: ["Junior", "Mid", "Senior"],
      placeholder: "Seleccione un nivel",
    },
    {
      name: "image",
      label: "Imagen del proyecto",
      type: "file",
      accept: "image/*",
      placeholder: "Seleccione una imagen",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Crear Proyecto</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-5"
        >
          {projectInputs.map((input, index) => (
            <div key={index} className={input.colSpan}>
              <CustomInput
                form={form}
                name={input.name}
                label={input.label}
                placeholder={input.placeholder}
                type={input.type}
                options={input.options}
                accept={input.accept}
                multiple={input.multiple}
              />
            </div>
          ))}
          <div className="flex justify-center space-x-2 col-span-1 sm:col-span-2">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Crear Proyecto</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;
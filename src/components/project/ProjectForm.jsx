import api from "@/config/apiInterceptor";
import { useForm } from "react-hook-form";
import { Dialog } from "@/components/ui/dialog";
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

  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Crear Proyecto</Dialog.Title>
        </Dialog.Header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <CustomInput
              name="image"
              label="Imagen del proyecto"
              type="file"
              accept="image/*"
              form={form}
            />
            <CustomInput
              name="title"
              label="Título"
              placeholder="Título del proyecto"
              form={form}
            />
            <CustomInput
              name="description"
              label="Descripción"
              placeholder="Descripción del proyecto"
              type="textarea"
              form={form}
            />
            <CustomInput
              name="stack"
              label="Stack"
              type="select"
              options={["Frontend", "Backend", "Fullstack"]}
              form={form}
            />
            <CustomInput
              name="languages"
              label="Lenguajes y frameworks"
              type="multiselect"
              options={["JavaScript", "Python", "React", "Django"]} // Fetch from your skills_proglanguage table
              form={form}
            />
            <CustomInput
              name="level"
              label="Nivel"
              type="select"
              options={["Junior", "Mid", "Senior"]}
              form={form}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Crear Proyecto</Button>
            </div>
          </form>
        </Form>
      </Dialog.Content>
    </Dialog>
  );
};

export default ProjectForm;
/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/button';
import CustomInput from '../shared/CustomInput';
import { Form } from '../ui/form';
import { useOptions } from '@/hooks/useOptions';

const schema = yup.object({
    languages: yup.string().required('El campo de lenguajes es obligatorio'),
    stack: yup.string().required('El campo stack es obligatorio'),
    level: yup.string().required('El campo de nivel es obligatorio'),
    about_me: yup.string().optional(),
    image: yup.string().optional(),
    telephone: yup.string().optional(),
    linkedin_link: yup.string().optional(),
    github_link: yup.string().optional(),
    discord_link: yup.string().optional(),
});

const ProfileForm = ({ handleSubmit, loading }) => {
    const { data: options, isLoading, error } = useOptions();

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            languages: '',
            stack: '',
            level: '',
        },
    });

    const profileInputs = [
        {
            name: 'languages',
            type: 'select',
            placeholder: 'Javascript, React',
            label: 'Languaje y Frameworks',
            options: options?.languages || [],
        },
        {
            name: 'stack',
            type: 'select',
            placeholder: 'Frontend',
            label: 'Stack',
            options: options?.stacks || [], 
        },
        {
            name: 'level',
            type: 'select',
            placeholder: 'Junior',
            label: 'Nivel',
            options: options?.levels || [], 
        },
        {
            name: "about_me",
            type: "textarea",
            placeholder: "Sobre mi",
            label: "Sobre mi",
        },
        {
            name: "image",
            type: "text",
            placeholder: "Avatar",
            label: "Avatar",
        },
        {
            name: "telephone",
            type: "text",
            placeholder: "Numero Telefón",
            label: "Numero Telefón",
        },
        {
            name: 'linkedin_link',
            type: 'text',
            placeholder: 'https://www.linkedin.com/in/username',
            label: 'Linkedin',
        },
        {
            name: 'github_link',
            type: 'text',
            placeholder: 'https://github.com/username',
            label: 'Github',
        }, 
        {
            name: 'discord_link',
            type: 'text',
            placeholder: 'https://discord.com/username',
            label: 'Discord',
        }
    ];

    if (isLoading) {
        return <p>Loading options...</p>;
    }

    if (error) {
        return <p>Error loading options</p>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} role="form" className="flex flex-col gap-5">
                {profileInputs.map((input, i) => (
                    <CustomInput
                        key={i}
                        form={form}
                        placeholder={input.placeholder}
                        label={input.label}
                        name={input.name}
                        type={input.type}
                        options={input.options} 
                    />
                ))}
                <Button type="submit" className="w-[50%] self-center">
                    {loading ? 'Cargando...' : 'Enviar'}
                </Button>
            </form>
        </Form>
    );
};

export default ProfileForm;
/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import CustomDynamicInput from '../shared/CustomDynamicInput';

const schema = yup.object({
    languages: yup.string().optional(),
    stack: yup.string().optional(),
    level: yup.string().optional(),
    about_me: yup.string().optional(),
    image: yup.string().optional(),
    telephone: yup.string().optional(),
    linkedin_link: yup.string().optional(),
    github_link: yup.string().optional(),
    discord_link: yup.string().optional(),
});

const ProfileForm = ({ handleSubmit, loading, options }) => {

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            prog_language: [],
            stack: '',
            level: '',
            about_me: '',
            image: null,
            telephone: '',
            linkedin_link: '',
            github_link: '',
            discord_link: '',
        },
    });

    const profileInputs = [
        {
            name: 'prog_language',
            type: 'select',
            placeholder: 'Javascript, React',
            label: 'Languaje y Frameworks',
            options: options?.languages || [],
            multiple: true,
        },
        {
            name: 'stack',
            type: 'select',
            placeholder: 'Frontend, Backend o ambos',
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
            name: "photo",
            type: "file",
            placeholder: "Avatar",
            label: "Avatar",
            onChange: (event) => {
                const file = event.target.files[0];
                console.log("Selected image:", file);
            }
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} role="form" className="flex flex-col gap-5">
                {profileInputs.map((input, i) => (
                    <CustomDynamicInput
                        key={i}
                        form={form}
                        placeholder={input.placeholder}
                        label={input.label}
                        name={input.name}
                        type={input.type}
                        options={input.options} 
                        accept={input.accept}
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
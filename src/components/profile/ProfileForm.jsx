/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import CustomDynamicInput from '../shared/CustomDynamicInput';
import { useEffect } from 'react';

const schema = yup.object({
    prog_language: yup.array().of(yup.number()
        .transform((value, originalValue) => Number(originalValue))
        .typeError('Debe ser un número válido')
        .optional(),),
    stack: yup.number()
        .transform((value, originalValue) => Number(originalValue))
        .typeError('Debe ser un Ì válido'),
    level: yup.number()
        .transform((value, originalValue) => Number(originalValue))
        .typeError('Debe ser un número válido'),
    about_me: yup.string().optional().nullable(),
    image: yup.string().optional().nullable(),
    telephone: yup.string().optional().nullable(),
    linkedin_link: yup.string().optional().nullable(),
    github_link: yup.string().optional().nullable(),
    discord_link: yup.string().optional().nullable(),
});

const ProfileForm = ({ loading, options, handleSubmit, defaultValues }) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    useEffect(() => {
        console.log("Default values:", defaultValues)
        form.reset(defaultValues);  
    }, [defaultValues, form]); 

    const profileInputs = [
        {
            name: 'prog_language',
            type: 'select',
            label: 'Languaje y Frameworks',
            options: options?.languages || [],
            multiple: true,
            defaultValue: defaultValues?.prog_language || [],
        },
        {
            name: 'stack',
            type: 'select',
            placeholder: 'Frontend, Backend o ambos',
            label: 'Stack',
            options: options?.stacks || [],
            multiple: false,
            defaultValue: defaultValues?.stack || '',
        },
        {
            name: 'level',
            type: 'select',
            placeholder: 'Junior',
            label: 'Nivel',
            options: options?.levels || [],
            multiple: false,
            defaultValues: defaultValues?.level || '',
        },
        {
            name: "about_me",
            type: "textarea",
            placeholder: "Sobre mi",
            label: "Sobre mi",
            defaultValue: defaultValues?.about_me || '',
        },
        {
            name: "photo",
            type: "file",
            placeholder: "Avatar",
            label: "Avatar",
            onChange: (event) => {
                const file = event.target.files[0];
                console.log("Selected image:", file);
            },
            defaultValue: defaultValues?.image || '',
        },
        {
            name: "telephone",
            type: "text",
            placeholder: "Numero Telefóno",
            label: "Numero Telefóno",
            defaultValue: defaultValues?.telephone || '',
        },
        {
            name: 'linkedin_link',
            type: 'text',
            placeholder: 'https://www.linkedin.com/in/username',
            label: 'Linkedin',
            defaultValue: defaultValues?.linkedin_link || '',
        },
        {
            name: 'github_link',
            type: 'text',
            placeholder: 'https://github.com/username',
            label: 'Github',
            defaultValue: defaultValues?.github_link || '',
        },
        {
            name: 'discord_link',
            type: 'text',
            placeholder: 'https://discord.com/username',
            label: 'Discord',
            defaultValue: defaultValues?.discord_link || '',
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
                        defaultValue={input.defaultValue}
                    />
                ))}
                <Button type="submit" className="w-[50%] self-center">
                    {loading ? 'Cargando...' : 'Enviar'}
                </Button>
            </form>
        </Form>
    );
};

export default ProfileForm
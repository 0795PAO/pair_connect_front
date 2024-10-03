/* eslint-disable react/prop-types */
import CustomDynamicInput from "../shared/CustomDynamicInput"
import { Form } from "../ui/form"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "../ui/button";


const schema = yup.object({
    github_link: yup.string().nullable(),
    linkedin_link: yup.string().nullable(),
    discord_link: yup.string().nullable(),
});

const ContactForm = ({ handleSubmit, user }) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: user ? {
            github_link: user.github_link || '',
            linkedin_link: user.linkedin_link || '',
            discord_link: user.discord_link || '',
        } : {},
    });


    const inputs = [
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
            <form onSubmit={form.handleSubmit(handleSubmit)} role="form" className="flex flex-col gap-5 my-5">
                {inputs.map((input) => (
                    <CustomDynamicInput
                        key={input.name}
                        type={input.type}

                        label={input.label}
                        placeholder={input.placeholder}
                        name={input.name}
                    />
                ))}
                <Button variant="secondary" type="submit" disabled={form.formState.isSubmitting}>Continuar</Button>
            </form>
        </Form>
    )
}

export default ContactForm
/* eslint-disable react/prop-types */
import CustomDynamicInput from "@/components/shared/CustomDynamicInput"
import { Form } from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@/components/ui/button";


const schema = yup.object({
    about_me: yup.string().nullable(),
    photo: yup.mixed().nullable(),

});

const AboutMeForm = ({ handleSubmit, defaultValues }) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            about_me: defaultValues?.about_me || '',
        },
    });

    const inputs = [
        {
            name: "about_me",
            type: "textarea",
            placeholder: "Sobre mí",
            label: "Sobre mí",
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
    ]

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('about_me', data.about_me || '');
        if (data.photo && data.photo[0]) {
            formData.append('photo', data.photo[0]);
        }

        handleSubmit(formData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}className="flex flex-col gap-5 my-5">
                {inputs.map((input) => (
                    <CustomDynamicInput
                        key={input.name}
                        form={form}
                        type={input.type}

                        label={input.label}
                        placeholder={input.placeholder}
                        name={input.name}
                        accept={input.accept}
                    />
                ))}
                <Button variant="secondary" type="submit" disabled={form.formState.isSubmitting}>Continuar</Button>
            </form>
        </Form>
    )
}

export default AboutMeForm
/* eslint-disable react/prop-types */
import CustomDynamicInput from "../shared/CustomDynamicInput"
import { Form } from "../ui/form"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "../ui/button";


const schema = yup.object({
    about_me: yup.string().nullable(),
    photo: yup.mixed().nullable(),

});

const AboutMeForm = ({ handleSubmit, defaultValues }) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues || '',
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        form.setValue('photo', file); 
        console.log("Selected image:", file);
    };


    const inputs = [
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
            onChange: handleFileChange
        },
    ]

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('about_me', data.about_me || '');
        if (data.photo) {
            formData.append('photo', data.photo);  
        }

        console.log('FormData being sent:', formData.get('about_me'), formData.get('photo')); 
        handleSubmit(formData); 
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} role="form" className="flex flex-col gap-5 my-5">
                {inputs.map((input) => (
                    <CustomDynamicInput key={input.name} {...input} />
                ))}
                <Button variant="secondary" type="submit" disabled={form.formState.isSubmitting}>Continuar</Button>
            </form>
        </Form>
    )
}
export default AboutMeForm
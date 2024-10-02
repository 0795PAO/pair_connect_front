/* eslint-disable react/prop-types */
import CustomDynamicInput from "../shared/CustomDynamicInput"
import { Form } from "../ui/form"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "../ui/button";


const schema = yup.object({
    prog_language: yup.array().min(1, 'Seleccione al menos un lenguaje').of(yup.number()
        .transform((value, originalValue) => Number(originalValue))
        .typeError('Debe ser un número válido')
        .required('Selecciona lenguajes válidos')),
    stack: yup.number()
        .transform((value, originalValue) => Number(originalValue)) 
        .typeError('Debe ser un número válido')  
});

const CompleteProfileForm = ({ options, handleSubmit }) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            prog_language: [],
            stack: '',
        },
    });


    const completeProfileInputs = [
        {
            name: 'prog_language',
            type: 'multiselect',
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
    ]
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} role="form" className="flex flex-col gap-5 my-5">
                {completeProfileInputs.map((input) => (
                    <CustomDynamicInput key={input.name} {...input} />
                ))}
                <Button variant="secondary" type="submit" disabled={form.formState.isSubmitting}>Continuar</Button>
            </form>
        </Form>
    )
}
export default CompleteProfileForm
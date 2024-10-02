/* eslint-disable react/prop-types */
import CustomDynamicInput from "../shared/CustomDynamicInput";
import { Form } from "../ui/form";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "../ui/button";

const CompleteProfileForm = ({ options, handleSubmit, user }) => {
    const schema = yup.object({
        prog_language: yup.array().min(1, 'Seleccione al menos un lenguaje').of(
            yup.number()
                .transform((value, originalValue) => Number(originalValue))
                .typeError('Debe ser un número válido')
        )
        .when([], {
            is: () => !user?.prog_language || user.prog_language.length === 0, 
            then: yup.array().min(1, 'Seleccione al menos un lenguaje').required('Este campo es obligatorio'),
            otherwise: yup.array(),
        }),
        stack: yup.number()
            .transform((value, originalValue) => Number(originalValue))
            .typeError('Debe ser un número válido'),
        level: yup.number()
            .transform((value, originalValue) => Number(originalValue))
            .typeError('Debe ser un número válido')
    });

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: user ? {
            prog_language: user.prog_language || [],
            stack: user.stack || null,
            level: user.level || null,
        } : {}
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
    ];

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} role="form" className="flex flex-col gap-5 my-5">
                {completeProfileInputs.map((input) => (
                    <CustomDynamicInput key={input.name} {...input} />
                ))}


                {options?.levels && options.levels.length > 0 && (
                    <CustomDynamicInput 
                        name="level"
                        type="select"
                        placeholder="Seleccione nivel"
                        label="Level"
                        options={options.levels}
                    />
                )}

                <Button variant="secondary" type="submit" disabled={form.formState.isSubmitting}>Continuar</Button>
            </form>
        </Form>
    );
};

export default CompleteProfileForm;
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import CustomDynamicInput from "../shared/CustomDynamicInput";
import { Button } from "../ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Form } from "../ui/form";

const UpdateLanguageForm =({ options, handleSubmit, defaultValues }) => {
    const schema = yup.object({
        prog_language: yup.array().of(
            yup.number()
                .transform((value, originalValue) => Number(originalValue))
                .typeError('Debe ser un número válido')
        ),
        stack: yup.number()
            .transform((value, originalValue) => Number(originalValue))
            .typeError('Debe ser un número válido'),
        level: yup.number()
            .transform((value, originalValue) => Number(originalValue))
            .typeError('Debe ser un número válido')
    });

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });

    const editProfileInputs = [
        {
            name: 'prog_language',
            type: 'multiselect',
            placeholder: 'Javascript, React',
            label: 'Lenguajes y Frameworks',
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
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5 my-5">
                {editProfileInputs.map((input) => (
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

                <Button variant="secondary" type="submit" disabled={form.formState.isSubmitting}>Guardar</Button>
            </form>
        </Form>
    );
};

export default UpdateLanguageForm
/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/button';
import CustomInput from '../shared/CustomInput';
import { Form } from '../ui/form';

const schema = yup.object({
    email: yup.string().required('El correo electrónico es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria')
});

const LoginForm = ({ handleSubmit}) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const loginInputs = [
        {
            name: "email",
            type: "email",
            placeholder: "cuenta@ejemplo.com",
            label: "Correo electrónico",
        },
        {
            name: "password",
            type: "password",
            placeholder: "Tu contraseña",
            label: "Contraseña",
        },
    ];

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} role="form" className="flex flex-col gap-5">
                {loginInputs.map((input, i) => (
                    <CustomInput
                        key={i}
                        form={form}
                        placeholder={input.placeholder}
                        label={input.label}
                        name={input.name}
                        type={input.type}
                    />
                ))}
                <Button type="submit" className="w-[50%] self-center">Iniciar sesión</Button>
            </form>
        </Form>
    );
};

export default LoginForm;
/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/button';
import CustomInput from '../shared/CustomInput';
import { Form } from '../ui/form';

const schema = yup.object({
    username: yup.string().required('El nombre de usuario es obligatorio'),
    email: yup.string().email('Correo electrónico no válido').required('El correo electrónico es obligatorio'),
    password: yup.string().min(8, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    confirm_password: yup.string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
        .required('La confirmación de la contraseña es obligatoria'),
});

const RegisterForm = ({ handleSubmit}) => {
    const form = useForm({
        resolver: yupResolver(schema),
    });

    const registerInputs = [
        {
            name: "username",
            type: "text",
            placeholder: "Nombre de usuario",
            label: "Nombre de usuario",
        },
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
        {
            name: "confirm_password",
            type: "password",
            placeholder: "Confirma tu contraseña",
            label: "Confirmar contraseña",
        }
    ];

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
                {registerInputs.map((input, i) => (
                    <CustomInput
                        key={i}
                        form={form}
                        placeholder={input.placeholder}
                        label={input.label}
                        name={input.name}
                        type={input.type}
                    />
                ))}
                <Button type="submit" className="w-[50%] self-center">Enviar</Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
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
    password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es obligatoria'),
    re_password: yup.string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
        .required('La confirmación de la contraseña es obligatoria'),
});

const RegisterForm = ({ handleSubmit, loading}) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    });

    const registerInputs = [
        {
            name: 'name',
            type: 'text',
            placeholder: 'Nombre',
            label: 'Nombre',
        },
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
            name: "re_password",
            type: "password",
            placeholder: "Confirma tu contraseña",
            label: "Confirmar contraseña",
        }
    ];

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} role="form" className="flex flex-col gap-5">
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
                <Button type="submit" className="w-[50%] self-center">{loading ? 'Cargando...' : 'Enviar'}</Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
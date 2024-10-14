/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/button';
import CustomInput from '../shared/CustomInput';
import { Form } from '../ui/form';

const schema = yup.object({
    new_password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es obligatoria'),
    re_new_password: yup.string()
        .oneOf([yup.ref('new_password'), null], 'Las contraseñas no coinciden')
        .required('La confirmación de la contraseña es obligatoria'),
});


const PasswordForm = ({ handleSubmit, loading }) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            new_password: '',
            re_new_password: '',
        },
    });


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} role="form" className="flex flex-col gap-5 w-full">
                <CustomInput label="Contraseña" name="new_password" type="password" placeholder="Tu contraseña" form={form} className="w-full text-lg" />
                <CustomInput label="Confirmar contraseña" name="re_new_password" type="password" placeholder="Repite tu contraseña" form={form} className="w-full text-lg" />
                <Button type="submit" className="w-[50%] self-center">{loading ? 'Cargando...' : 'Enviar'}</Button>
            </form>
        </Form>
    );
};

export default PasswordForm
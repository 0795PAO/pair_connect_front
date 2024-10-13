/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/button';
import CustomInput from '../shared/CustomInput';
import { Form } from '../ui/form';

const schema = yup.object({
    email: yup.string().email('Correo electrónico no válido').required('El correo electrónico es obligatorio'),
});

const EmailForm = ({ handleSubmit, loading }) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} role="form" className="flex flex-col gap-5 w-full">
                <CustomInput label="Correo electrónico" name="email" type="email" placeholder="cuenta@ejemplo.com" form={form} className="w-full text-lg"/>
                <Button type="submit" className="w-[50%] self-center">{loading ? 'Cargando...' : 'Enviar'}</Button>
            </form>
        </Form>
    );
};

export default EmailForm
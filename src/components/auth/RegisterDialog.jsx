/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '../ui/dialog';
import RegisterForm from './RegisterForm';

const RegisterDialog = ({ open, onOpenChange, handleSubmit, loading }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="gap-6 w-[90vw] md:w-full rounded-lg">
                <DialogHeader>
                    <DialogTitle className="my-3 text-xl text-center">Registro</DialogTitle>
                    <DialogDescription className="mt-3 mb-5 text-center text-md">
                        Crea tu cuenta rellenando los campos abajo.
                    </DialogDescription>
                    <RegisterForm handleSubmit={handleSubmit} loading={loading}/>
                </DialogHeader>
                <DialogFooter className="flex-col items-center justify-center gap-2 text-center sm:justify-center">
                    <p>¿Ya te has registrado?</p>
                    <Link to="/login" className="font-bold text-secondary">Inicia sesión</Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterDialog
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
                    <DialogTitle className="text-center my-3 text-xl">Registro</DialogTitle>
                    <DialogDescription className="text-center mt-3 mb-5 text-md">
                        Crea tu cuenta rellenando los campos abajo.
                    </DialogDescription>
                    <RegisterForm handleSubmit={handleSubmit} loading={loading}/>
                </DialogHeader>
                <DialogFooter className="text-center sm:justify-center flex-col items-center justify-center gap-2">
                    <p>¿Ya te has registrado?</p>
                    <Link to="/login" className="text-secondary font-bold">Inicia sesión</Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterDialog;
import PasswordForm from "@/components/auth/PasswordForm"
import { useResetPassword } from "@/hooks/useResetPassword";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const { uid } = useParams();
    const { token } = useParams();
    const mutationResetPassword = useResetPassword();
    
    const handleResetPassword = (data) => {
        console.log('click')
        mutationResetPassword.mutate({uid, token, ...data});
    }
    return (
        <div className="flex flex-col gap-10 items-center justify-center w-[90vw] lg:w-[70vw]">
            <h1 className="text-2xl font-bold text-center">¡Estás a un paso de volver al código!</h1>
            <p className="text-center">Introduce una nueva contraseña fuerte y sigue construyendo el futuro. 🚀
            No olvides esta, ¡pero si lo haces, siempre estamos aquí para ayudarte!</p>
            <PasswordForm handleSubmit={handleResetPassword} />
        </div>
    )
}
export default ResetPassword
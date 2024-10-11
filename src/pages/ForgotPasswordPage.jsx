import EmailForm from "@/components/auth/EmailForm"
import { useForgotPassword } from "@/hooks/useForgotPassword";

const ForgotPasswordPage = () => {
    const forgotPasswordMutation = useForgotPassword();

    const handleResetPassword = (email) => {
        forgotPasswordMutation.mutate({ email });
    };
    return (
        <div className="flex flex-col gap-10 items-center justify-center w-[90vw] lg:w-[70vw]">
            <h1 className="text-2xl font-bold text-center">¡Oh no! ¿Olvidaste tu contraseña?</h1>
            <p className="text-center">No te preocupes, hasta los mejores desarrolladores lo olvidan a veces. 🚀
                Déjanos ayudarte a volver al código. Solo ingresa tu correo y te enviaremos un enlace para resetearla en un instante.</p>
            <EmailForm handleSubmit={handleResetPassword} />
        </div>
    )
}
export default ForgotPasswordPage
import { forgotPassword } from "@/services/authService";
import { useToast } from "./useToast";
import { useMutation } from "@tanstack/react-query";

export const useForgotPassword = () => {
    const { toast } = useToast();

    return useMutation({
        mutationFn: (email) => forgotPassword(email),
        onSuccess: () => {
            toast({
                title: "Correo enviado",
                description: "Se ha enviado un correo electrónico para restablecer la contraseña.",
                variant: "success",
            });
        },
        onError: (error) => {
            console.error("Error al restablecer la contrasen��a", error);
            toast({
                title: "Error",
                description: "Hubo un error al restablecer la contraseña. Por favor, intenta de nuevo.",
                variant: "destructive",
            }
            )
        },
    });
}
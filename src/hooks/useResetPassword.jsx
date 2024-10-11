import { resetPassword } from "@/services/authService";
import { useToast } from "./useToast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data) => resetPassword(data),
        onSuccess: () => {
            toast({
                title: "Password restablecida",
                description: "Se ha restablecido la contraseña correctamente.",
                variant: "success",
            });
            navigate('/login');
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
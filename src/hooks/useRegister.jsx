import { useState } from "react";
import { registerUser } from "@/services/authService";
import { useToast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    

    const handleRegister = async (data) => {
        setLoading(true);
        try {
            const response = await registerUser(data);
            if (response.status === 201) {
                setShowSuccessModal(true);
                const timeoutId = setTimeout(() => {
                    navigate("/");
                }, 5000);
                return () => clearTimeout(timeoutId);
            }
        } catch (error) {
            console.error("Error registering user", error);

            let errorMessage = "Ocurrió un error al registrarse";

            if (error.response) {
                const errorData = error.response.data;

                if (errorData.password) {
                    errorMessage = errorData.password.join(" ");
                } else if (errorData.email) {
                    errorMessage = errorData.email.join(" ");
                } else if (errorData.username) {
                    errorMessage = errorData.username.join(" ");
                } else if (errorData.non_field_errors) {
                    errorMessage = errorData.non_field_errors.join(" ");
                }
            }

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return { handleRegister, loading, showSuccessModal, setShowSuccessModal };
};
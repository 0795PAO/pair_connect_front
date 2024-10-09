import { useMutation } from "@tanstack/react-query";
import { confirmParticipant } from "@/services/participantsService";
import { useToast } from "./useToast";


export const useConfirmParticipant = () => {
    const toast = useToast();
    return useMutation({
        mutationFn: confirmParticipant, 
        onSuccess: (data) => {
            console.log("Participant confirmed successfully:", data);
            toast({
                title: "Confirmación exitosa",
                description: "El participante ha sido confirmado correctamente.",
                variant: "success",
            });
        },
        onError: (error) => {
            console.error("Error confirming participant:", error);
            toast({
                title: "Error",
                description: "Hubo un error al confirmar el participante. Por favor, intenta de nuevo.",
                variant: "destructive",
            });
        },
    });
};



import { useMutation } from "@tanstack/react-query";
import { confirmParticipant } from "@/services/participantsService";

export const useConfirmParticipant = () => {
    return useMutation({
        mutationFn: confirmParticipant, 
        onSuccess: (data) => {
            console.log("Participant confirmed successfully:", data);
        },
        onError: (error) => {
            console.error("Error confirming participant:", error);
        },
    });
};


// Implement  in component
// const { mutate: confirmParticipant, isLoading, isError, error } = useConfirmParticipant();

// const handleConfirmParticipant = () => {
//     confirmParticipant({ sessionId, username });
// };

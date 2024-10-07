import { showInterestInSession } from "@/services/participantsService";
import { useMutation } from "@tanstack/react-query";

export const useShowInterestInSession = ({ setShowSignupPopup, setShowSuccessPopup }) => {
    return useMutation({
        mutationFn: showInterestInSession,
        onSuccess: () => {
            setShowSignupPopup(false);
            setShowSuccessPopup(true);
        },
        onError: (error) => {
            console.error("Error creating project:", error);
        },
    });
};
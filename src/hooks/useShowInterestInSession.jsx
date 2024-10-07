import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { showInterestInSession } from '../services/participantsService';

const useShowInterestInSession = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [message, setMessage] = useState('');

    const mutation = useMutation({
        mutationFn: (session) => showInterestInSession(session),

        onSuccess: () => {
            setShowSignupPopup(false);
            setShowPopup(true);
            setMessage("Te has apuntado a la sesión!");
        },

        onError: (error) => {
            console.log("Error:", error);

            let errorMessage;

            if (error.response) {
                if (error.response.status === 409) {
                    console.log(error.response);
                    errorMessage = "Ya has apuntado a esta sesión";
                } else {
                    errorMessage = "Hubo un error al aportar a la sesión: " + error.message;
                }
            } else {
                errorMessage = "Error desconocido: " + error.message;
            }

            setMessage(errorMessage);
            setShowPopup(true);
            setShowSignupPopup(false);
        },
    });

    const closePopup = () => {
        setShowPopup(false);
        setShowSignupPopup(false);
    };

    return {
        showPopup,
        showSignupPopup,
        message,
        setShowSignupPopup,
        mutation,
        closePopup

    };
};

export default useShowInterestInSession;
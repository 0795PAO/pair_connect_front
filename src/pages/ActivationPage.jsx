import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { activateAccount } from "@/services/authService";

const ActivationPage = () => {
    const { uid, token } = useParams();
    const [activationStatus, setActivationStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleActivateAccount = async () => {
            try {
                const response = await activateAccount({ uid, token });
                console.log(response);
                setActivationStatus("Account activated successfully!"); setTimeout(() => {
                    navigate("/login"); 
                }, 4000)

            } catch (error) {
                console.log(error);
                setActivationStatus("Activation failed. Please try again.");
            }
        };

        handleActivateAccount();
    }, [uid, token, navigate]);

    return (
        <div>
            <h1>{activationStatus ? activationStatus : "Activating account..."}</h1>
        </div>
    );
};

export default ActivationPage;
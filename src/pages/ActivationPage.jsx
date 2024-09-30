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
                setActivationStatus("¡Cuenta activado con éxito!"); setTimeout(() => {
                    navigate("/login"); 
                }, 4000)

            } catch (error) {
                console.log(error);
                setActivationStatus("Hubo un fallo en la activación. Por favor, intentalo más tarde.");
            }
        };

        handleActivateAccount();
    }, [uid, token, navigate]);

    return (
        <div>
            <h1 className="text-2xl font-bold">{activationStatus ? activationStatus : "Activando tu cuenta..."}</h1>
        </div>
    );
};

export default ActivationPage
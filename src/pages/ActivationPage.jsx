import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { activateAccount } from "@/services/authService";
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';

const ActivationPage = () => {
    const { uid, token } = useParams();
    const [activationStatus, setActivationStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handleActivateAccount = async () => {
            try {
                const response = await activateAccount({ uid, token });
                console.log(response);
                setActivationStatus("¡Cuenta activada con éxito!");
                setIsError(false); 

                setTimeout(() => {
                    navigate("/login");
                }, 4000);

            } catch (error) {
                console.log(error);
                setActivationStatus("Hubo un fallo en la activación. Por favor, inténtalo más tarde.");
            }
        };

        handleActivateAccount();
    }, [uid, token, navigate]);


    
    return (
        <div className="relative flex flex-col items-center justify-center">
            <div className="max-w-4xl p-5 text-lg cursor-pointer neon-border2 bg-background">
                {!activationStatus && (
                    <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                )}

                <h1 className={`mb-8 text-center text-foreground'}`}>
                    {activationStatus ? activationStatus : "Activando tu cuenta..."}
                </h1>

                {activationStatus && (
                    <div className="flex justify-center items-center mt-4">
                        <Link to="/">
                            <Button
                                variant="specialShadow"
                                size="lg"
                                title={"Regresar al Inicio"}
                            >
                                Regresar al Home
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivationPage;

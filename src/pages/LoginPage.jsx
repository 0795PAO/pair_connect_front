import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useMousePosition } from "@/hooks/useMousePosition";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import { login, registerUser } from "@/services/authService";
import LoginForm from "@/components/auth/LoginForm"
import RegisterDialog from "@/components/auth/RegisterDialog";
import { Button } from "@/components/ui/button";


const LoginPage = () => {
    const { elementRef } = useMousePosition()
    const [isOpen, setIsOpen] = useState(false);
    const { setIsAuthenticated } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (data) => {
        try {
            const response = await login(data);
            if (response.access) {
                console.log('here')
                setIsAuthenticated(true);
                navigate('/')
            }

        } catch (error) {
            if (error.response) {
                console.error('Error status:', error.response.status);
                toast({
                    title: "Error",
                    description: `${error.response.data.detail}`,
                    variant: "destructive",
                })

            } else {
                console.error(error.message)
                toast({
                    title: "Error",
                    description: `Hubo un error inesperado intentalo mas tarde`,
                    variant: "destructive",
                })
            }

        }
    }

    const handleRegisterSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await registerUser(data);
            if (response.status === 201) {
                toast({
                    title: "Registrado",
                    description: "Se ha registrado correctamente, controle su correo para activar su cuenta",
                    variant: "success",
                });
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
    return (
        <>
            <h1 className="mb-4 font-poppins font-bold text-5xl md:text-6xl leading-[120%] text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient)' }}>
                Pair Connect
            </h1>
            <div className="border rounded-lg md:w-[40vw] mouse-light-effect" ref={elementRef}>
                <div className="card-with-light-effect p-5" >
                    <LoginForm handleSubmit={handleSubmit} />
                    <p className="flex text-center sm:justify-center flex-col items-center justify-center gap-2 mt-8">¿Has olvidado tu contraseña?
                        <Link to="/recover-password" className="block text-secondary font-bold">Recupera contraseña</Link>
                    </p>
                </div>
            </div>
            <p className="flex text-center sm:justify-center flex-col items-center justify-center gap-2 mt-12 md:flex-row">¿Aun no estas registrado?
                <Button variant="link" className="block font-bold" onClick={() => setIsOpen(true)}>Regístrate</Button>
            </p>
            <RegisterDialog open={isOpen} onOpenChange={setIsOpen} handleSubmit={handleRegisterSubmit} loading={loading} />
        </>
    )
}
export default LoginPage
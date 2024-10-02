import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import RegisterDialog from "@/components/auth/RegisterDialog";
import { registerUser } from "@/services/authService";
import { useNavigate } from "react-router-dom";

const PairProgrammingPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {
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

    return (
        <div className="px-2 sm:px-4"> 
            <section className="flex flex-col items-center justify-center gap-2 mt-10 mb-10 text-center sm:mt-20 sm:mb-20">
                <h1 className="mb-6 text-3xl sm:text-5xl font-bold text-center text-transparent bg-clip-text gradient2-text">Sobre el Pair Programming</h1>
                <h2 className="mb-8 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-blue-200 drop-shadow-lg animate-pulse-slow">"El código fluye mejor cuando se comparte con un colega"</h2>
                <style jsx>{`@keyframes pulse-slow {0%, 100% {transform: scale(1);}50% {transform: scale(1.05);}}.animate-pulse-slow {animation: pulse-slow 3s ease-in-out infinite;}`}</style>
                <div className="flex flex-col items-center justify-center mx-auto mb-8 w-full sm:w-[90%] md:w-[70%] neon-border bg-background p-4 transition-colors duration-500 hover:bg-neon-hover">
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:space-x-6">
                        <img src="/code1.jpg" alt="navegador" className="w-full sm:w-[80%] md:w-[450px] mb-4 md:mb-0 rounded-lg border-2"/>
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-justify gradient2-text">Navegador</h2>
                            <p className="text-sm sm:text-base md:text-lg text-justify">Los roles cambian continuamente: uno de los programadores crea una prueba y el otro implementa el código para pasarla. Luego, intercambian roles. Esto fomenta el desarrollo orientado a pruebas (TDD) y facilita trabajar en pequeñas tareas.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mx-auto mb-8 w-full sm:w-[90%] md:w-[70%] neon-border bg-background p-4 transition-colors duration-500 hover:bg-neon-hover">
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:space-x-8">
                        <div className="flex flex-col">
                            <h2 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-left gradient2-text">Emparejamiento de Ping Pong:</h2>
                            <p className="text-sm sm:text-base md:text-lg text-justify"> Aquí los roles cambian constantemente. Un programador escribe una prueba para un pequeño fragmento de código, y el otro se encarga de implementar la funcionalidad que hace que esa prueba pase. Después, cambian roles. Este enfoque promueve el desarrollo orientado a pruebas (TDD) y ayuda a los programadores a pensar en pequeñas unidades de trabajo.</p>
                        </div>
                        <img src="/neon3.jpeg" alt="navegador" className="w-full sm:w-[80%] md:w-[500px] mb-4 md:mr-0 rounded-lg border-2 border-neon-blue shadow-neon"/>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mx-auto mb-20 w-full sm:w-[90%] md:w-[70%] neon-border bg-background p-4 transition-colors duration-500 hover:bg-neon-hover">
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:space-x-6">
                        <img src="/neon2.png" alt="navegador" className="w-full sm:w-[80%] md:w-[400px] mb-4 md:mb-0 rounded-lg border-2" />
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-justify gradient2-text">Pomodoro</h2>
                            <p className="text-sm sm:text-base md:text-lg text-justify">Este método divide el trabajo en sesiones de 25 minutos con descansos cortos, mejorando el enfoque, reduciendo distracciones y evitando el agotamiento. Lo bueno de aplicar el método pomodoro en pair programming es que además de aumentar la concentración es intercambiar los roles y lograr así que ambos miembros ocupen 2 veces el rol.</p>
                        </div>
                    </div>
                </div>
                <Button variant="specialShadow" onClick={() => setIsOpen(true)} size="lg" title={"Si quieres hacer match, te toca registrarte =D "}>Regístrarme</Button>
            </section>
            <RegisterDialog open={isOpen} onOpenChange={setIsOpen} handleSubmit={handleSubmit} loading={loading} />
        </div>
    );
};

export default PairProgrammingPage;

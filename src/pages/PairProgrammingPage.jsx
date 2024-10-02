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
        <div className="px-2 sm:px-4"> {/* Ajustado para padding en dispositivos pequeños */}
            <section className="flex flex-col items-center justify-center gap-2 mt-10 mb-10 text-center sm:mt-20 sm:mb-20">
                {/* Título principal */}
                <h1 className="mb-6 text-3xl sm:text-5xl font-bold text-center text-transparent bg-clip-text gradient2-text">
                    Sobre el Pair Programming
                </h1>
                {/* Subtítulo */}
                <h2 className="mb-8 text-lg sm:text-xl md:text-2xl">
                    "El código fluye mejor cuando se comparte con un colega"
                </h2>

                {/* Sección 1 */}
                <div className="flex flex-col items-center justify-center mx-auto mb-8 w-full sm:w-[90%] md:w-[70%] neon-border bg-background p-4 transition-colors duration-500 hover:bg-neon-hover">
                    <div className="flex flex-col md:flex-row items-center justify-center w-full">
                        <img src="/neon1.png" alt="navegador" className="w-full sm:w-[80%] md:w-[600px] mb-4 md:mr-8 border-4 neon-border shadow-neon" />
                        <div className="flex flex-col">
                            {/* Título de sección */}
                            <h2 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-justify gradient2-text">Navegador:</h2>
                            <p className="text-sm sm:text-base md:text-lg text-justify">
                                Uno de los programadores (el driver) escribe el código, mientras que el otro (el navigator) observa y revisa en busca de errores o sugerencias. El navigator también se encarga de guiar y asegurar que el enfoque general del proyecto esté alineado con los objetivos. Esta técnica permite una codificación más precisa y mejora la calidad del código.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sección 2 */}
                <div className="flex flex-col items-center justify-center mx-auto mb-8 w-full sm:w-[90%] md:w-[70%] neon-border bg-background p-4 transition-colors duration-500 hover:bg-neon-hover">
                    <div className="flex flex-col md:flex-row items-center justify-center w-full">
                        <div className="flex flex-col">
                            {/* Título de sección */}
                            <h2 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-left gradient2-text">Emparejamiento de Ping Pong:</h2>
                            <p className="text-sm sm:text-base md:text-lg text-justify">
                                Aquí los roles cambian constantemente. Un programador escribe una prueba para un pequeño fragmento de código, y el otro se encarga de implementar la funcionalidad que hace que esa prueba pase. Después, cambian roles. Este enfoque promueve el desarrollo orientado a pruebas (TDD) y ayuda a los programadores a pensar en pequeñas unidades de trabajo.
                            </p>
                        </div>
                        <img src="/imagenneon2.jpg" alt="navegador" className="w-full sm:w-[80%] md:w-[600px] mb-4 md:ml-8 border-4 neon-border shadow-neon" />
                    </div>
                </div>

                {/* Sección 3 */}
                <div className="flex flex-col items-center justify-center mx-auto mb-12 w-full sm:w-[90%] md:w-[70%] neon-border bg-background p-4 transition-colors duration-500 hover:bg-neon-hover">
                    <div className="flex flex-col md:flex-row items-center justify-center w-full">
                        <img src="/" alt="navegador" className="w-full sm:w-[80%] md:w-[600px] mb-4 md:mr-8" />
                        <div className="flex flex-col">
                            {/* Título de sección */}
                            <h2 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-justify gradient2-text">Pomodoro:</h2>
                            <p className="text-sm sm:text-base md:text-lg text-justify">
                                Mediante este estilo los programadores trabajan sesiones de 25 minutos, descansando 5 minutos entre sesión y sesión hasta completar 4 sesiones para conseguir una pausa más larga de 15 minutos. Mejorar la productividad, ya que ayuda a mantener el enfoque en tareas concretas, reducir distracciones y prevenir el agotamiento mental al distribuir el esfuerzo en intervalos medidos y descansar de manera planificada.
                            </p>
                        </div>
                    </div>
                </div>
                <Button
                    variant="specialShadow"
                    onClick={() => setIsOpen(true)}
                    size="lg"
                    title={"Si quieres hacer match, te toca registrarte =D "}
                >
                    Regístrarme
                </Button>
            </section>

            <RegisterDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                handleSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    );
};

export default PairProgrammingPage;

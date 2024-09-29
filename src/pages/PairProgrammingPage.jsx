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
        <div>
            <section className="flex flex-col items-center justify-center gap-2 mt-20 mb-20 text-center">
                <h1 className="mb-4 text-4xl font-bold">Sobre el Pair Programming</h1>
                <h2 className="mb-6 text-xl ">"El código fluye mejor cuando se comparte con un colega"</h2>
                <h2 className="mb-4 text-3xl font-bold">Navegador</h2>
                <img src="/Pair-Programming1.1.jpg" alt="navegador" class="w-[300px] mb-6 block mx-auto" />
                <p className="mb-6 text-xl text-justify">
                    El programador más experimentado puede asumir los roles tácticos de desarrollo mientras que el programador menos experimentado recibe las indicaciones y progresa con velocidad en el despliegue de cada proyecto, al mismo tiempo que incrementa su nivel de programación y experiencia.
                </p>
                <h2 className="mb-4 text-3xl font-bold">Emparejamiento de Ping Pong</h2>
                <img src="/Pair-Programming1.1.jpg" alt="navegador" class="w-[300px] mb-6 block mx-auto" />
                <p className="mb-6 text-xl text-justify">
                Driver/navigator son intercambiados constantemente como la pelota de ping pong. Mediante este tipo de pair programming los programadores pueden familiarizarse con el desarrollo dirigido por test o TDD y obtener una sinergia grupal que focaliza la atención para que ambos mejoren su desempeño.
                </p>
                <h2 className="mb-4 text-3xl font-bold">Pomodoro</h2>
                <img src="/Pair-Programming1.1.jpg" alt="navegador" class="w-[300px] mb-6 block mx-auto" />
                <p className="mb-6 text-xl text-justify">
                    El método pomodoro se utiliza para focalizar la atención. Mediante este estilo los programadores trabajan sesiones de 25 minutos, descansando 5 minutos entre sesión y sesión hasta completar 4 sesiones para conseguir una pausa más larga de 15 minutos.
                    Lo bueno de aplicar el método pomodoro en pair programming es que además de aumentar la concentración cada equipo puede utilizar los tiempos de sesión para intercambiar los roles y lograr así que ambos miembros ocupen 2 veces el rol de conductor y 2 veces el rol de navegador durante cada ciclo pomodoro completado.
                </p>
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
}
export default PairProgrammingPage
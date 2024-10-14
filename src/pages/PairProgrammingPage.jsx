import { useState } from "react";
import { Button } from "@/components/ui/button";
import RegisterDialog from "@/components/auth/RegisterDialog";
import { useRegister } from "@/hooks/useRegister";

const PairProgrammingPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { handleRegister, showSuccessModal, setShowSuccessModal, loading } = useRegister();



    return (
        <div className="px-2 sm:px-4">
            <section className="flex flex-col items-center justify-center gap-2 mt-10 mb-10 text-center sm:mt-20 sm:mb-20">
                <h1 className="mb-4 text-3xl font-bold leading-none text-center text-transparent sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text gradient2-text" style={{ lineHeight: '1.2', paddingBottom: '0.5rem' }}>
                    Sobre el Pair Programming
                </h1>

                <h2 className="mb-10 text-lg font-bold text-center text-transparent sm:text-xl md:text-2xl lg:text-1xl bg-clip-text bg-gradient-to-r from-pink-100 via-purple-300 to-blue-500 drop-shadow-lg animate-pulse-slow">"El código fluye mejor cuando se comparte con un colega"</h2>

                <div className="flex flex-col items-center justify-center mx-auto mb-8 w-full sm:w-[90%] md:w-[70%] neon-border bg-background p-4 transition-colors duration-500 hover:bg-neon-hover">
                    <div className="flex flex-col items-center justify-center w-full md:flex-row md:space-x-6">
                        <img src="/code1.jpg" alt="navegador" className="w-full sm:w-[80%] md:w-[450px] mb-4 md:mb-0 rounded-lg border-2" />
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-xl font-bold text-justify sm:text-2xl md:text-3xl gradient2-text">Navegador</h2>
                            <p className="text-sm text-justify sm:text-base md:text-lg">Un programador sera el guía dando instrucciones mientras el otro programador escribe. Funciona mejor cuando un principiante escribe y un experto lo guía, permitiendo que el primero aprenda al practicar.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mx-auto mb-8 w-full sm:w-[90%] md:w-[70%] neon-border bg-background p-4 transition-colors duration-500 hover:bg-neon-hover">
                    <div className="flex flex-col items-center justify-center w-full md:flex-row md:space-x-8">
                        <div className="flex flex-col">
                            <h2 className="mb-2 text-xl font-bold text-left sm:text-2xl md:text-3xl gradient2-text">Emparejamiento de Ping Pong:</h2>
                            <p className="text-sm text-justify sm:text-base md:text-lg"> Aquí los roles cambian constantemente. Un programador escribe una prueba para un pequeño fragmento de código, y el otro se encarga de implementar la funcionalidad que hace que esa prueba pase. Después, cambian roles. Este enfoque promueve el desarrollo orientado a pruebas (TDD) y ayuda a los programadores a pensar en pequeñas unidades de trabajo.</p>
                        </div>
                        <img src="/neon3.jpeg" alt="navegador" className="w-full sm:w-[80%] md:w-[500px] mb-4 md:mr-0 rounded-lg border-2 border-neon-blue shadow-neon" />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mx-auto mb-20 w-full sm:w-[90%] md:w-[70%] neon-border bg-background p-4 transition-colors duration-500 hover:bg-neon-hover">
                    <div className="flex flex-col items-center justify-center w-full md:flex-row md:space-x-6">
                        <img src="/neon2.png" alt="navegador" className="w-full sm:w-[80%] md:w-[400px] mb-4 md:mb-0 rounded-lg border-2" />
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-xl font-bold text-justify sm:text-2xl md:text-3xl gradient2-text">Pomodoro</h2>
                            <p className="text-sm text-justify sm:text-base md:text-lg">Este método divide el trabajo en sesiones de 25 minutos con descansos cortos, mejorando el enfoque, reduciendo distracciones y evitando el agotamiento. Lo bueno de aplicar el método pomodoro en pair programming es que además de aumentar la concentración es intercambiar los roles y lograr así que ambos miembros ocupen 2 veces el rol.</p>
                        </div>
                    </div>
                </div>
                <Button variant="specialShadow" onClick={() => setIsOpen(true)} size="lg" title={"Si quieres hacer match, te toca registrarte =D "}>Regístrate</Button>
            </section>
            <RegisterDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                handleSubmit={handleRegister}
                loading={loading}
                showModal={showSuccessModal}
                setShowModal={setShowSuccessModal}
            />
        </div>
    );
};

export default PairProgrammingPage;

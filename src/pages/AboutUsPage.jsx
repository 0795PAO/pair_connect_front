import '@/styles/cosmic-background.css';
import CosmicBackground from '@/components/shared/CosmicBackground';
import AboutUsContent from '@/components/about/AboutUsContent';
import { Button } from '@/components/ui/button';
import { useRegister } from '@/hooks/useRegister';
import RegisterDialog from "@/components/auth/RegisterDialog";
import { useState, useRef } from "react";
import TeamList from '@/components/team/TeamList';

const AboutUsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { handleRegister, loading } = useRegister();

    const registerButtonRef = useRef(null);
    const teamSectionRef = useRef(null); // Ref para la sección del equipo

    // Función para desplazarse hacia la sección del equipo
    const scrollToTeamSection = () => {
        if (teamSectionRef.current) {
            teamSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative min-h-screen">
            <CosmicBackground />

            {/* Este onClick ahora desplaza hacia la sección del equipo */}
            <AboutUsContent onClick={scrollToTeamSection} />

            <div className="flex flex-col items-center justify-center gap-5 mt-20 mb-20 text-center">

                {/* Ref para la sección del equipo */}
                <div ref={teamSectionRef}>
                    <TeamList />
                </div>

                <h3 className="mb-6 text-xl font-bold">¡Únete a Pair Connect!</h3>

                {/* Botón de registro */}
                <Button
                    variant="doubleColorButton"
                    onClick={() => setIsOpen(true)}
                    size="lg"
                    title="Regístrate y forma parte de nuestra comunidad"
                    ref={registerButtonRef}
                >
                    Regístrate
                </Button>
            </div>

            {/* Modal de registro */}
            <RegisterDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                handleSubmit={handleRegister}
                loading={loading}
            />
        </section>
    );
};

export default AboutUsPage
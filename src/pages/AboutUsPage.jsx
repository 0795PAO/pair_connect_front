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
    const teamSectionRef = useRef(null); 

    const scrollToTeamSection = () => {
        if (teamSectionRef.current) {
            teamSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative min-h-screen">
            <CosmicBackground />
            <AboutUsContent onClick={scrollToTeamSection} />

            <div className="flex flex-col items-center gap-5 mt-20 mb-20 text-center">
                <div ref={teamSectionRef}>
                    <TeamList />
                </div>
                <h3 className="mb-6 text-xl font-bold">¡Únete a Pair Connect!</h3>
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
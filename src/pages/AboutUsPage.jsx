import "@/styles/cosmic-background.css";
import CosmicBackground from "@/components/shared/CosmicBackground";
import AboutUsContent from "@/components/about/AboutUsContent";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useRegister";
import RegisterDialog from "@/components/auth/RegisterDialog";
import { useState, useRef } from "react";
import TeamList from "@/components/about/TeamList";
import Loader from "@/components/shared/Loader";

const AboutUsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleRegister, loading, showSuccessModal, setShowSuccessModal } =
    useRegister();

  const registerButtonRef = useRef(null);
  const teamSectionRef = useRef(null);

  const scrollToTeamSection = () => {
    if (teamSectionRef.current) {
      teamSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="relative min-h-screen">
      <div className="relative z-0">
        <CosmicBackground />
        <AboutUsContent onClick={scrollToTeamSection} />

        <div className="flex flex-col items-center gap-5 mt-20 mb-10 text-center">
          <div ref={teamSectionRef}>
            <TeamList />
          </div>
          <h3 className="mt-20 mb-2 text-xl font-bold">
            ¡Únete a Pair Connect!
          </h3>
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
          setModal={setShowSuccessModal}
          showModal={showSuccessModal}
        />
      </div>
    </section>
  );
};

export default AboutUsPage;

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import RegisterDialog from "@/components/auth/RegisterDialog";
import HeroSection from "@/components/landing/HeroSection";
import { useRegister } from "@/hooks/useRegister";
import { useAllSessions } from "@/hooks/useAllSessions";
import SessionSection from "@/components/session/SessionSection";
import Loader from "@/components/shared/Loader";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: sessions, error, loading: loadingSessions } = useAllSessions();
  const { handleRegister, loading, showSuccessModal, setShowSuccessModal } =
    useRegister();
  const sessionListRef = useRef(null);


  const scrollToSessions = () => {
    if (sessionListRef.current) {
      sessionListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div data-testid="home-page">
      <HeroSection
        handleRegisterClick={setIsOpen}
        onArrowClick={scrollToSessions}
      />


      <h2 className="mt-12 mb-16 text-4xl font-bold text-center">
        Sesiones programadas:
      </h2>
      {
        loadingSessions ? (
          <Loader />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : sessions && sessions.length === 0 ? (
          <p>No hay sesiones programadas.</p>
        ) : (
          <SessionSection sessions={sessions} ref={sessionListRef} to="/public-sessions/"/>
        )
      }
      <section className="flex w-full flex-col items-center justify-center gap-5 mt-20 mb-20 text-center">
        <h3 className="mb-6 text-xl font-bold">¡No te lo pienses más!</h3>
        <Button
          variant="specialShadow"
          onClick={() => setIsOpen(true)}
          size="lg"
          title={"Si quieres hacer match, te toca registrarte =D "}
        >
          Regístrate
        </Button>
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

export default HomePage;

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import RegisterDialog from "@/components/auth/RegisterDialog";
import HeroSection from "@/components/landing/HeroSection";
import { useRegister } from "@/hooks/useRegister";
import { useAllSessions } from "@/hooks/useAllSessions";
import SessionFilter from "@/components/session/SessionFilter";
import { useSessionFilter } from "@/hooks/useSessionFilter";
import SessionSection from "@/components/session/SessionSection";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: sessions, error, loading: loadingSessions } = useAllSessions();
  const { handleRegister, loading, showSuccessModal, setShowSuccessModal } =
    useRegister();
  const sessionListRef = useRef(null);


  const {
    filteredSessions,
    searchTerm,
    setSearchTerm,
    selectedStack,
    setSelectedStack,
    selectedLevel,
    setSelectedLevel,
  } = useSessionFilter(sessions);

  const scrollToSessions = () => {
    if (sessionListRef.current) {
      sessionListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loadingSessions) {
    return <div>Loading...</div>;
  }

  return (
    <div data-testid="home-page">
      <HeroSection
        handleRegisterClick={setIsOpen}
        onArrowClick={scrollToSessions}
      />

      <section>
      <h3 className="mb-10 text-3xl font-bold">Sesiones Programadas:</h3>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] md:gap-5">

          <SessionFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedStack={selectedStack}
            setSelectedStack={setSelectedStack}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />

          <SessionSection
            sessions={filteredSessions}
            loading={loadingSessions}
            error={error}
            ref={sessionListRef}
            to={`/public-sessions/`}
          />
        </div>
      </section>
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

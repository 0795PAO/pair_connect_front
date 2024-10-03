import { useState, useRef, useEffect  } from "react";
import { Button } from "@/components/ui/button";
import RegisterDialog from "@/components/auth/RegisterDialog";
import HeroSection from "@/components/landing/HeroSection";
import SessionList from "@/components/session/SessionList";
import { useRegister } from "@/hooks/useRegister";  
import api from "@/config/apiInterceptor";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleRegister, loading } = useRegister();

  const sessionListRef = useRef(null);

  const scrollToSessions = () => {
    if (sessionListRef.current) {
      sessionListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  
  useEffect(() => {
    getSessions()
  }, [])

  return (
    <div data-testid="home-page">
      <HeroSection handleRegisterClick={setIsOpen} onArrowClick={scrollToSessions} />
      <div ref={sessionListRef}>
      
      </div>
    

      <section className="flex flex-col items-center justify-center gap-5 mt-20 mb-20 text-center">
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
      />
    </div>
  );
};

export default HomePage;

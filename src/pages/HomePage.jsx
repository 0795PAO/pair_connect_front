import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import RegisterDialog from "@/components/auth/RegisterDialog";
import HeroSection from "@/components/landing/HeroSection";
import { registerUser } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import SessionList from "@/components/session/SessionList";

const HomePage = () => {
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
    <div data-testid="home-page">
      <HeroSection handleRegisterClick={setIsOpen} />
      <SessionList />

      <section className="flex flex-col items-center justify-center gap-5 text-center">
        <h3 className="text-xl font-bold">No te lo pienses más</h3>
        <Button
          variant="specialShadow"
          onClick={() => setIsOpen(true)}
          size="lg"
        >
          Regístrate
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

export default HomePage;

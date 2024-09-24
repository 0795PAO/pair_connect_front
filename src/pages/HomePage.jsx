import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import RegisterDialog from "@/components/auth/RegisterDialog";
import HeroSection from "@/components/landing/HeroSection";
import { registerUser } from "@/services/authService";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();


    const handleSubmit = async (data) => {

        try {
            const response = await registerUser(data);
            if (response.status === 'success') {
                toast({
                    title: "Registrado",
                    description: "Se ha registrado correctamente",
                    variant: "success",
                })
                const timeoutId = setTimeout(() => { navigate('/login') }, 4000)
                return () => clearTimeout(timeoutId); 
            }

        } catch (error) {
            console.error('Error registering user', error);
            toast({
                title: "Error",
                description: `${error.message}`,
                variant: "destructive",
            })
        }
    }

    return (
        <div data-testid="home-page">
            <HeroSection handleRegisterClick={setIsOpen} />
            <section className="flex flex-col items-center justify-center gap-5 text-center">
                <h3 className="text-xl font-bold">No te lo pienses mas</h3>
                <Button variant="specialShadow" onClick={() => setIsOpen(true)} size="lg">Regístrate</Button>
            </section>
            <RegisterDialog open={isOpen} onOpenChange={setIsOpen} handleSubmit={handleSubmit} />
        </div>
    )
}
export default HomePage
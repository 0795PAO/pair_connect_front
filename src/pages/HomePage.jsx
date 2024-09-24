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


    const handleSubmit = (data) => {
        console.log(data);
        toast({
            title: "Registrado",
            description: "Se ha registrado correctamente",
            variant: "destructive",
        })


    }

    return (
        <>
            <HeroSection />
            <section className="flex flex-col items-center justify-center gap-5 text-center">
                <h3 className="text-xl font-bold">No te lo pienses más</h3>
                <Button variant="specialShadow" onClick={() => setIsOpen(true)} size="lg">Regístrate</Button>
            </section>
            <RegisterDialog open={isOpen} onOpenChange={setIsOpen} handleSubmit={handleSubmit} />
        </div>
    )
}
export default HomePage
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import RegisterDialog from "@/components/auth/RegisterDialog";

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();


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
            
            <section className="flex flex-col items-center justify-center gap-5 text-center">
                <h3 className="text-xl font-bold">No te lo pienses mas</h3>
                <Button onClick={() => setIsOpen(true)} size="lg">Regístrate</Button>
            </section>
            <RegisterDialog open={isOpen} onOpenChange={setIsOpen} handleSubmit={handleSubmit}/>
        </>
    )
}
export default HomePage
import { Button } from "../ui/button"
import ModeToggle from "./ModeToggle"
import { logout } from "@/services/authService";
import { useToast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";




const Navbar = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await logout();
            if (response.status === 201){
                toast({
                    title: "Logout",
                    description: "Se ha cerrado la sesión correctamente",
                    variant: "Success",
                })
                setTimeout(() => navigate('/login'), 4000);
            }

        } catch (err) {
            toast({
                title: "Error",
                description: `${err.message}`,
                variant: "destructive",
            })
        }
    }

    return (
        <div><ModeToggle />
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
        </div>
    )
}
export default Navbar
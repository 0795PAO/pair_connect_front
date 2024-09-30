import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout as logoutService } from '@/services/authService';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await logoutService();
            if (response.status === 200) {
                console.log(response.status)
                console.log('Logout successful');
                queryClient.invalidateQueries(['profile']);
                logout();
                toast({
                    title: "Logout",
                    description: "Se ha cerrado la sesión correctamente",
                    variant: "success",
                });
                navigate('/');
            }
        } catch (err) {
            console.log(err)
            toast({
                title: "Error",
                description: `${err.message}`,
                variant: "destructive",
            });
        }
    };

    return { handleLogout };
};

export default useLogout;
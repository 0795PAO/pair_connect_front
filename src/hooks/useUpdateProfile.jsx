import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/services/profileService';
import { useToast } from '@/hooks/useToast';

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    queryClient.refetchQueries(['profile']);
    const { toast } = useToast();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['profile']);  
            toast({
                title: 'Perfil completado',
                description: 'Tu perfil ha sido actualizado con éxito.',
                variant: 'success',
            });
        },
        onError: (error) => {
            console.error('Error during profile update', error);
            toast({
                title: 'Error',
                description: 'Hubo un error al completar tu perfil. Por favor, intenta de nuevo.',
                variant: 'destructive',
            });
        }
    });
};
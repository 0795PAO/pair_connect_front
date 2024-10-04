import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProgLanguages } from '@/services/profileService';
import { useToast } from '@/hooks/useToast';

export const useUpdateProgLanguages = () => {
    const queryClient = useQueryClient();
    queryClient.refetchQueries(['profile']);
    const { toast } = useToast();

    return useMutation({
        mutationFn: updateProgLanguages.bind(this),
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
                description: 'Hubo un error al actualizar tu perfil. Por favor, intenta de nuevo.',
                variant: 'destructive',
            });
        }
    });
};
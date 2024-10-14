import { useMutation } from '@tanstack/react-query';
import { useToast } from './useToast';
import { sendInvitation } from '@/services/participantsService';

export const useSendInvitation = () => {
    const { toast } = useToast();
    return useMutation({
        mutationFn: (sessionId, userId) => sendInvitation(sessionId, userId),
        onSuccess: () => {
            toast({
                title: 'Invitación enviada',
                description: 'La invitación ha sido enviada correctamente.',
                variant: 'success',
            });
        },
        onError: (error) => {
            console.error('Error al enviar invitación', error);
            toast({
                title: 'Error',
                description: 'Hubo un error al enviar la invitación. Por favor, intenta de nuevo.',
                variant: 'destructive',
            });
        },
    });
};


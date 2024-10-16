/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '../ui/dialog';
import CompleteProfileForm from './CompleteProfileForm';
import { useLanguages } from '@/hooks/useLanguages';
import { Loader } from 'lucide-react';
import { useStacks } from '@/hooks/useStacks';
import Logo from '../shared/Logo';
import { useUpdateProgLanguages } from '@/hooks/useUpdateProgLanguages';


const CompleteProfileModal = ({ open, onOpenChange }) => {
    const { data: languages, isLoading: isLanguagesLoading } = useLanguages();
    const { data: stacks, isLoading: isStacksLoading } = useStacks();
    const updateProfileLanguageMutation = useUpdateProgLanguages()



    const handleSubmit = (data) => {
        updateProfileLanguageMutation.mutate(data, {
            onSuccess: () => onOpenChange(false),

        });
    };

    if (isLanguagesLoading || isStacksLoading) {
        return <Loader />
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="gap-6 w-[90vw] md:w-full rounded-lg"
                onInteractOutside={(event) => event.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="my-3 text-xl text-center">
                        <Logo /></DialogTitle>
                    <p className="text-xl font-bold text-center"> ¡Un último paso para empezar a conectar!</p>
                    <DialogDescription className="text-base text-center text-foreground">
                        Completa tu perfil con tu lenguaje de programación o framework favorito y tu stack. ¡Así podremos ofrecerte mejores conexiones!
                    </DialogDescription>
                    <CompleteProfileForm handleSubmit={handleSubmit} options={{ languages, stacks }} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default CompleteProfileModal
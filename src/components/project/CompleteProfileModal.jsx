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
import { useUpdateProfile } from '@/hooks/useUpdateProfile';


const CompleteProfileModal = ({ open, onOpenChange }) => {
    const { data: languages, isLoading: isLanguagesLoading } = useLanguages();
    const { data: stacks, isLoading: isStacksLoading } = useStacks();
    const updateProfileMutation = useUpdateProfile()



    const handleSubmit = (data) => {
        updateProfileMutation.mutate(data, {
            onSuccess: () => onOpenChange(false), 
            
        });
    };

    if (isLanguagesLoading || isStacksLoading) {
        return <Loader />
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="gap-6 w-[90vw] md:w-full rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-center my-3 text-xl">
                        <Logo /></DialogTitle>
                    <p className="text-center font-bold text-xl"> ¡Un último paso para empezar a conectar!</p>
                    <DialogDescription className="text-center text-foreground text-base">
                        Completa tu perfil con tu lenguaje de programación o framework favorito y tu stack. ¡Así podremos ofrecerte mejores conexiones!.
                    </DialogDescription>
                    <CompleteProfileForm handleSubmit={handleSubmit} options={{ languages, stacks }} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default CompleteProfileModal
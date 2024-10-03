/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '../ui/dialog';
import { useLanguages } from '@/hooks/useLanguages';
import { Loader } from 'lucide-react';
import { useStacks } from '@/hooks/useStacks';
import Logo from '../shared/Logo';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import AboutMeForm from './AboutMeForm';
import { useProfile } from '@/hooks/useProfile';
import { useLevels } from '@/hooks/useLevels';
import ContactForm from './ContactForm';
import UpdateLanguageForm from './UpdateLanguageForm';


const UpdateProfileModal = ({ open, onOpenChange, type }) => {
    const { data: user, isLoading: isUserLoading } = useProfile();
    const { data: languages, isLoading: isLanguagesLoading } = useLanguages();
    const { data: stacks, isLoading: isStacksLoading } = useStacks();
    const { data: levels, isLoading: isLevelsLoading } = useLevels();
    const updateProfileMutation = useUpdateProfile()



    const handleSubmit = (data) => {
        console.log('Data being sent:', data);
        updateProfileMutation.mutate(data, {
            onSuccess: () => onOpenChange(false),

        });
    };

    if (isLanguagesLoading || isStacksLoading || isUserLoading || isLevelsLoading) {
        return <Loader />
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="gap-6 w-[90vw] md:w-full rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-center my-3 text-xl">
                        <Logo /></DialogTitle>
                    <p className="text-center font-bold text-xl"> ¡Aqui puedes editar tus datos!</p>
                    <DialogDescription className="text-center text-foreground text-base">
                        Rellena solo los campos que te interesa actualizar!.
                    </DialogDescription>
                    {
                        type === 'about_avatar' ?
                            <AboutMeForm  handleSubmit={handleSubmit} defaultValues={{ photo: user?.photo, about_me: user?.about_me}}/>
                        : type === 'contact' ?
                            <ContactForm  handleSubmit={handleSubmit} user={user}/>
                        : <UpdateLanguageForm handleSubmit={handleSubmit} options={{ languages, stacks, levels }} user={user} />
                    }
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default UpdateProfileModal
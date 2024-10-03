// import ProfileForm from "@/components/profile/ProfileForm"
// import { useMousePosition } from "@/hooks/useMousePosition"
// import { useToast } from "@/hooks/useToast"
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateUser } from "@/services/profileService";
// import { Loader } from "lucide-react";
// import { useProfile } from "@/hooks/useProfile";
// import { useStacks } from "@/hooks/useStacks";
// import { useLevels } from "@/hooks/useLevels";
// import { useLanguages } from "@/hooks/useLanguages";

// const MyProfileFormPage = () => {
//     const { elementRef } = useMousePosition()
//     const { data: user, isLoading, error } = useProfile();
//     const { data: stacks, isLoading: isStacksLoading } = useStacks();
//     const { data: levels, isLoading: isLevelsLoading } = useLevels();
//     const { data: languages, isLoading: isLanguagesLoading } = useLanguages();

//     const {toast} = useToast()
//     const queryClient = useQueryClient();

//     const mutation = useMutation({
//         mutationFn: updateUser,
//         onSuccess: (data) => {

//             queryClient.invalidateQueries(['profile']);
//             console.log('Profilo aggiornato:', data);
//         },
//         onError: (error) => {
//             console.error('Error during profile update', error);
//             toast({
//                 title: 'Error',
//                 description: 'An error occurred while updating your profile. Please try again later.',
//                 variant: 'destructive',
//             })
//         }
//     });

//     const handleFormSubmit = (updatedData) => {
//         console.log(updatedData);
//         mutation.mutate(updatedData);
//     }

//     if (isLoading || isStacksLoading || isLevelsLoading || isLanguagesLoading) {
//         return <Loader/>;
//     }

//     if (error) {
//         console.error(error);
//         return <p>Error: {error.message}</p>
//     }

//     return (
//         <>
//             <section className="my-8 flex flex-col items-center justify-center gap-5 text-center">
//                 <img src={user.photo} alt={user.name} className="w-[9.375rem]" />
//                 <h1 className="text-3xl font-bold">Hola, {user.username}</h1>
//                 <p className="text-lg font-bold">Cuentanos un poco mas sobre ti</p>
//                 <p>¡Esto nos ayudará a encontrar el match perfecto para ti!</p>
//             </section>

//             <section className="flex flex-col items-center justify-center gap-5 text-center w-[80vw] md:w-[60vw]">
//                 <div className="border rounded-lg  w-[80vw] mouse-light-effect md:w-[60vw] " ref={elementRef}>
//                     <div className="card-with-light-effect p-5" >
//                         <ProfileForm 
//                             options={{ stacks, levels, languages }} 
//                             handleSubmit={handleFormSubmit}
//                             defaultValues={user}
//                             />
//                     </div>
//                 </div>
//             </section>

//         </>
//     )
// }
// export default MyProfileFormPage
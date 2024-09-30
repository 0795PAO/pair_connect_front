import ProfileForm from "@/components/profile/ProfileForm"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import Loader from "@/components/shared/Loader";
import { useProfile } from "@/hooks/useProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MyProfilePage = () => {
    const { elementRef } = useMousePosition()
    const { data: user, isLoading, error } = useProfile();
    const [showForm, setShowForm] = useState(false);
    const queryClient = useQueryClient();

    const mutation = useMutation(updateUser, {
        onSuccess: (data) => {

            queryClient.invalidateQueries(['profile']);
            console.log('Perfil actualizado:', data);
        },
        onError: (error) => {
            console.error('Error durante la actualización del perfil', error);
        }
    });

    const handleFormSubmit = (updatedData) => {
        mutation.mutate(updatedData);
        setShowForm(false);
    }

    useEffect(() => {
        console.log("User data:", user);
        if (user && (!user.prog_language || !user.stack || !user.level)) {
            setShowForm(true);
        }
    }, [user]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error(error);
        return <p>Error: {error.message}</p>
    }

    if (showForm) {
        return (
            <>
                <section className="flex flex-col items-center justify-center gap-5 my-8 text-center">
                    <img src={user.photo} alt={user.name} className="w-[9.375rem]" />
                    <h1 className="text-3xl font-bold">Hola, {user.username}</h1>
                    <p className="text-lg font-bold">Cuéntanos un poco más sobre ti</p>
                    <p>¡Esto nos ayudará a encontrar el match perfecto para ti!</p>
                </section>

                <section className="flex flex-col items-center justify-center gap-5 text-center w-[80vw] md:w-[60vw]">
                    <div className="border rounded-lg  w-[80vw] mouse-light-effect md:w-[60vw] " ref={elementRef}>
                        <div className="p-5 card-with-light-effect" >
                            <ProfileForm handleSubmit={handleFormSubmit} />
                        </div>
                    </div>
                </section>

                <p className="flex flex-col items-center justify-center gap-2 mt-12 text-center sm:justify-center md:flex-row">Lo haré mas tarde
                    <Link to="/" className="bold text-secondary">Saltar</Link>
                </p>

            </>
        )
    }

    return (
        <div>MyProfilePage</div>
    )
}

export default MyProfilePage
import UpdateProfileModal from "@/components/profile/UpdateProfileModal";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { Edit } from "lucide-react";
import { useState } from "react";
import MyProfileNav from "@/components/profile/MyProfileNav";
import { Outlet } from 'react-router-dom';


const MyProfilePage = () => {
    const { data: user, isLoading, error } = useProfile();
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formType, setFormType] = useState("");

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error(error);
        return <p>Error: {error.message}</p>
    }

    const handleEditClick = () => {
        setOpen(true);
        setFormType("about_avatar");
    };

    return (
        <>
            <section className="container mx-auto p-6 max-w-[100rem]">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-10">
                    <div className="relative flex flex-col items-center p-6 py-24 rounded-lg bg-card">
                        <p 
                            className="mb-2 text-2xl font-bold text-center sm:text-3xl md:text-3xl" 
                            style={{ fontFamily: "Source Code Pro" }} 
                            title="Saludo al usuario"
                            aria-label={`Hola, ${user?.username || 'usuario'}`}
                        >
                            Hola,
                        </p>
                        <h1 
                            className="mb-8 text-4xl font-bold text-center font-poppins sm:text-5xl md:text-5xl gradient4-text" 
                            title="Nombre del usuario"
                            aria-label={`Nombre del usuario: ${user?.username}`}
                        >
                            {user?.username}
                        </h1>
                        <div className="absolute flex gap-2 top-6 right-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="transition-transform duration-200 transform hover:text-primary text-foreground hover:scale-110"
                                onClick={handleEditClick}
                                aria-label="Editar perfil"
                                title="Editar perfil"
                            >
                                <Edit aria-hidden="true" />
                            </Button>
                        </div>
                        <img
                            src={user?.photo}
                            alt={`Foto de perfil de ${user?.username}`}
                            className="object-cover mb-8 transition-shadow duration-300 rounded-full shadow-md w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-60 xl:h-60 hover:shadow-lg"
                            title="Foto de perfil del usuario"
                        />
                        <div className="flex flex-col gap-4 mt-6 text-left">
                            <p 
                                className="text-2xl font-semibold text-left sm:text-3xl md:text-3xl" 
                                title="Nombre completo del usuario"
                                aria-label={`Nombre completo: ${user?.name}`}
                            >
                                {user?.name}
                            </p>
                            <p 
                                className="text-base cursor-pointer md:text-md lg:text-lg line-clamp-5" 
                                title="Descripción del usuario" 
                                onClick={() => setIsModalOpen(true)}
                                aria-label={`Descripción del usuario: ${user?.about_me}`}
                            >
                                {user?.about_me ? user.about_me : "¡Todavía no se ha escrito una historia, pero seguro que está creando algo genial! 🎉🚀"}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <MyProfileNav />
                        <div className="mt-6">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={() => setIsModalOpen(false)}
                    aria-modal="true"
                    role="dialog"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <div
                        className="max-w-lg p-6 bg-white rounded-lg dark:bg-gray-800 dark:text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 
                            id="modal-title" 
                            className="mb-4 font-bold text-center"
                            aria-label={`Nombre del usuario: ${user?.name}`}
                        >
                            {user?.name}
                        </h3>
                        <p 
                            id="modal-description" 
                            className="text-sm text-left sm:text-base"
                        >
                            {user?.about_me ? user.about_me : "¡Todavía no se ha escrito una historia, pero seguro que está creando algo genial! 🎉🚀"}
                        </p>
                    </div>
                </div>
            )}

            <UpdateProfileModal open={open} onOpenChange={setOpen} type={formType} />
        </>
    );
};

export default MyProfilePage


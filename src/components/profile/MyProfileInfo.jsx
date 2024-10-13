import { useProfile } from "@/hooks/useProfile";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import UpdateProfileModal from "@/components/profile/UpdateProfileModal";
import SectionCard from "@/components/profile/SectionCard";
import ItemList from "@/components/shared/ItemList";

const MyProfileInfo = () => {
    const { data: user, isLoading } = useProfile();
    const [open, setOpen] = useState(false);
    const [formType, setType] = useState("");

    if (isLoading) {
        return <Loader />
    }

    const handleEditClick = (formType) => {
        setOpen(true);
        setType(formType)
    }


    return (
        <div className="container mx-auto max-w-[100rem]">
            <div className="flex justify-end mb-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary text-foreground"
                    onClick={() => handleEditClick("languages")}
                    aria-label="Editar lenguajes y frameworks"
                    title="Editar lenguajes y frameworks"
                >
                    <Edit aria-hidden="true" />
                </Button>
            </div>

            <section className="relative mt-6 rounded-lg bg-card" aria-labelledby="languages-title">
                <div className="p-6 mt-6 shadow-lg lg:col-span-2">
                    <h2 id="languages-title" className="text-2xl font-semibold transition duration-300 hover:text-secondary text-textPrimary">
                        Lenguajes y Frameworks
                    </h2>
                    <ul className="flex flex-wrap gap-4 ">
                        {user?.language_names?.length > 0 ? (
                            <ItemList items={user.language_names} />
                        ) : (
                            <li>No hay lenguajes o frameworks definidos.</li>
                        )}
                    </ul>
                </div>
            </section>

            <section className="relative" aria-labelledby="stack-nivel-title">
                <h2 id="stack-nivel-title" className="sr-only">Stack y Nivel</h2>
                <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-2">
                    {/* Stack */}
                    <SectionCard
                        title="Stack"
                        content={user?.stack_name
                            ? user.stack_name
                            : "Stack no definido 🚀"}
                    />

                    {/* Nivel */}
                    <SectionCard
                        title="Nivel"
                        content={user?.level_name
                            ? user.level_name
                            : "Nivel no definido 🧑‍💻"}
                    />
                </div>
            </section>

            <section className="relative mt-5" aria-labelledby="contact-title">
                <div className="flex justify-end mt-4 mb-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary text-foreground"
                        onClick={() => handleEditClick("contact")}
                        aria-label="Editar información de contacto"
                        title="Editar contacto"
                    >
                        <Edit aria-hidden="true" />
                    </Button>
                </div>
                <SectionCard
                    title="Contactos"
                    content={(
                        <ul className="space-y-2 text-lg font-medium">
                            <li>
                                <span className="font-bold">Email: </span>
                                <span className="break-all">
                                    {user?.email ? user.email : " ¿Dónde está ese @? ¡Aún sin configurar! 📧"}
                                </span>
                            </li>
                            <li>
                                <span className="font-bold">GitHub: </span>
                                <span className="break-all">
                                    {user?.github_link ? user.github_link : " Tu repositorio social necesita un push! 🛠️"}
                                </span>
                            </li>
                            <li>
                                <span className="font-bold">LinkedIn: </span>
                                <span className="break-all">
                                    {user?.linkedin_link ? user.linkedin_link : " El perfil está desconectado, ¿dónde está tu red? 🌐"}
                                </span>
                            </li>
                            <li>
                                <span className="font-bold">Discord: </span>
                                <span className="break-all">
                                    {user?.discord_link ? user.discord_link : " Aquí falta tu enlace de Discord, ¡no seas tímido/a!"}
                                </span>
                            </li>
                        </ul>
                    )}
                />
            </section>

            <UpdateProfileModal open={open} onOpenChange={setOpen} type={formType} />
        </div>
    );
};

export default MyProfileInfo
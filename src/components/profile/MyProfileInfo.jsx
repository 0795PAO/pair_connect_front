import { useProfile } from "@/hooks/useProfile";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import UpdateProfileModal from "@/components/profile/UpdateProfileModal";

const MyProfileInfo = () => {
    const { data: user, isLoading } = useProfile();
    const [open, setOpen] = useState(false);
    const [formType, setType] = useState("");
    console.log('Estoy aquí', user)

    if (isLoading) {
        return <Loader />
    }

    const handleEditClick = (formType) => {
        setOpen(true);
        setType(formType)
    }


    return (
        <div className="container mx-auto p-6 max-w-[100rem]">

            <div className="flex justify-end mb-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary text-foreground"
                    onClick={() => handleEditClick("general")}
                >
                    <Edit />
                </Button>
            </div>
            <section className="relative mt-6 rounded-lg bg-card">
            <div className="p-6 mt-6 shadow-lg lg:col-span-2">
                    <h2 className="mb-5 text-2xl font-semibold transition duration-300 text-primary hover:text-secondary">
                        Lenguajes de programación
                    </h2>
                    <ul className="flex flex-wrap gap-4 mt-6">
                        {user?.language_names?.length > 0 && user.language_names.map((language, index) => (
                            <li
                                key={index}
                                className="py-2 px-4 rounded-full text-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] font-semibold shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
                            >
                                {language}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="relative">
                <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-2 ">
                    <div className="p-6 rounded-lg shadow-lg lg:col-span-1 bg-card" >
                        <h2 className="mt-4 mb-5 text-2xl font-semibold transition duration-300 text-textPrimary hover:text-secondary text-primary">
                            Stack
                        </h2>
                        <p className="text-lg font-medium">
                            {user?.stack_name || "Aún no has seleccionado un stack"}
                        </p>
                    </div>
                    <div className="p-6 rounded-lg shadow-lg lg:col-span-1 bg-card ">
                        <h2 className="mb-5 text-2xl font-semibold transition duration-300 text-textPrimary hover:text-secondary text-primary">
                            Nivel
                        </h2>
                        <p className="text-lg font-medium">
                            {user?.level_name || "Aún no has seleccionado tu nivel"}
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative mt-5">
                <div className="flex justify-end mt-4 mb-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary text-foreground"
                        onClick={() => handleEditClick("languages")}
                    >
                        <Edit />
                    </Button>
                </div>
                <div className="p-6 rounded-lg shadow-lg lg:col-span-2" style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}>
                    <h2 className="mb-5 text-2xl font-semibold transition duration-300 text-textPrimary hover:text-secondary text-primary">
                        Contactos
                    </h2>
                    <ul className="space-y-2 text-lg font-medium">
                        {user?.email && <li><span className="font-bold">Email:</span> {user.email}</li>}
                        {user?.github_link && <li><span className="font-bold">Github:</span> {user.github_link}</li>}
                        {user?.linkedin_link && <li><span className="font-bold">LinkedIn:</span> {user.linkedin_link}</li>}
                        {user?.discord_link && <li><span className="font-bold">Discord:</span> {user.discord_link}</li>}
                    </ul>
                </div>
            </section>

            <UpdateProfileModal open={open} onOpenChange={setOpen} type={formType} />
        </div>
    );
};

export default MyProfileInfo
import { useProfile } from "@/hooks/useProfile";
import Loader from "../shared/Loader";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import "@/styles/box-profile.css"

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
        <div className="container mx-auto p-6 max-w-[59.375rem] ">
            <div className="grid gap-10 py-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className="relative text-left box-profile">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute text-gray-600 top-4 right-4 dark:text-gray-300 hover:text-primary"
                        onClick={() => handleEditClick("languages")}
                    >
                        <Edit className="" />
                    </Button>
                    <h2 className="mb-5 text-2xl font-semibold text-left">
                        Lenguajes de programación
                    </h2>
                    <ul className="space-y-2 ">
                        {user?.language_names && user.language_names.map((language, index) => (
                            <li key={index} className="text-lg font-medium text-left">
                                {language}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative box-profile">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute text-gray-600 top-4 right-4 dark:text-gray-300 hover:text-primary"
                        onClick={() => handleEditClick("stack")}
                    >
                        <Edit className="text-dark" />
                    </Button>
                    <h2 className="mb-5 text-2xl font-semibold ">
                        Stack
                    </h2>
                    <p className="text-lg font-medium ">
                        {user?.stack_name || "Aún no has seleccionado un stack"}
                    </p>
                </div>

                <div className="relative text-left box-profile">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute text-gray-600 top-4 right-4 dark:text-gray-300 hover:text-primary"
                        onClick={() => handleEditClick("level")}
                    >
                        <Edit className="text-dark" />
                    </Button>
                    <h2 className="mb-5 text-2xl font-semibold ">
                        Nivel
                    </h2>
                    <p className="text-lg font-medium text-dark">
                        {user?.level_name || "Aún no has seleccionado tu nivel"}
                    </p>
                </div>

                <div className="relative box-profile">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute text-gray-600 top-4 right-4 dark:text-gray-300 hover:text-primary"
                        onClick={() => handleEditClick("contact")}
                    >
                        <Edit className="text-dark" />
                    </Button>
                    <h2 className="mb-5 text-2xl font-semibold ">
                        Contactos
                    </h2>
                    <ul className="space-y-2 text-lg font-medium text-left ">
                        {user?.email && <li><span className="font-bold text-left">Email:</span> {user.email}</li>}
                        {user?.github_link && <li><span className="font-bold text-left">Github:</span> {user.github_link}</li>}
                        {user?.linkedin_link && <li><span className="font-bold text-left">LinkedIn:</span> {user.linkedin_link}</li>}
                        {user?.discord_link && <li><span className="font-bold text-left">Discord:</span> {user.discord_link}</li>}
                    </ul>
                </div>
            </div>

            <UpdateProfileModal open={open} onOpenChange={setOpen} type={formType} />
        </div>
    );
};

export default MyProfileInfo
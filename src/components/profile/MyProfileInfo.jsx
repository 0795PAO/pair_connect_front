import { useProfile } from "@/hooks/useProfile";
import Loader from "../shared/Loader";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";

const MyProfileInfo = () => {
    const { data: user, isLoading } = useProfile();
    const [open, setOpen] = useState(false);
    const [formType, setType] = useState("");
    console.log('estoy aqui')

    if (isLoading) {
        return <Loader />
    }

    const handleEditClick = (formType) => {
        setOpen(true);
        setType(formType)
    }


    return (
        <div className="grid items-center justify-center gap-5 py-5 text-center grid-col">
            <div className="self-end w-full px-8 font-light text-right">
                <Button variant="ghost" size="icon" className="font-light hover:text-primary" onClick={() => handleEditClick("languages")}><Edit /></Button>
            </div>
            <div className="flex flex-col w-full gap-8 p-5">
                <h2 className="my-4 mb-5 text-3xl font-semibold text-left text-primary">
                    Lenguajes de programmación
                </h2>
                <ul className="text-center">
                    {user?.language_names && user.language_names.map((language, index) => (
                        <li key={index}>
                            {language}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col w-full gap-8 p-5 ">
                <h2 className="my-4 mb-5 text-3xl font-semibold text-left text-primary">
                    Stack
                </h2>
                <p>
                    {user?.stack_name}
                </p>
            </div>
            <div className="flex flex-col w-full gap-8 p-5 ">
                <h2 className="my-4 mb-5 text-3xl font-semibold text-left text-primary">
                    Nivel
                </h2>
                <p>
                    {
                        user.level_name ? user?.level_name : "Aun no has puesto tu nivel"
                    }
                </p>
            </div>
            <div className="grid items-center justify-center gap-5 py-5 text-center grid-col">
                <div className="self-end w-full px-8 font-light text-right">
                    <Button variant="ghost" size="icon" className="font-light hover:text-primary" onClick={() => handleEditClick("contact")}><Edit /></Button>
                </div>
                <div className="flex flex-col w-full gap-8 p-5">
                    <h2 className="my-4 mb-5 text-3xl font-semibold text-left text-primary">
                        Contactos
                    </h2>
                    <ul className="text-center">
                        {user?.email && <li><span className="font-semibold">Email: </span>{user.email}</li>}
                        {user?.github_link && <li><span className="font-semibold">Github </span>{user.github_link}</li>}
                        {user?.linkedin_link && <li><span className="font-semibold">Linkedin </span>{user.linkedin_link}</li>}
                        {user?.discord_link && <li><span className="font-semibold">Discord </span>{user.discord_link}</li>}

                    </ul>
                </div>
                <UpdateProfileModal open={open} onOpenChange={setOpen} type={formType} />
            </div>
        </div>
        
    )
}
export default MyProfileInfo
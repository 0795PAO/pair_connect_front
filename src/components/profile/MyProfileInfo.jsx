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

    if (isLoading) {
        return <Loader />
    }

    const handleEditClick = (formType) => {
        setOpen(true);
        setType(formType)
    }


    return (
        <div className="py-5 grid grid-col gap-5 items-center justify-center text-center">
            <div className="self-end text-right w-full font-light px-8">
                <Button variant="ghost" size="icon" className="hover:text-primary font-light" onClick={() => handleEditClick("languages")}><Edit /></Button>
            </div>
            <div className="flex flex-col gap-8 p-5 w-full">
                <h2 className="text-3xl font-semibold my-4 text-primary text-left mb-5">
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
            <div className=" flex flex-col gap-8 p-5 w-full">
                <h2 className="text-3xl font-semibold my-4 text-primary text-left mb-5">
                    Stack
                </h2>
                <p>
                    {user?.stack_name}
                </p>
            </div>
            <div className=" flex flex-col gap-8 p-5 w-full">
                <h2 className="text-3xl font-semibold my-4 text-primary text-left mb-5">
                    Nivel
                </h2>
                <p>
                    {
                        user.level_name ? user?.level_name : "Aun no has puesto tu nivel"
                    }
                </p>
            </div>
            <div className="py-5 grid grid-col gap-5 items-center justify-center text-center">
                <div className="self-end text-right w-full font-light px-8">
                    <Button variant="ghost" size="icon" className="hover:text-primary font-light" onClick={() => handleEditClick("contacts")}><Edit /></Button>
                </div>
                <div className="flex flex-col gap-8 p-5 w-full">
                    <h2 className="text-3xl font-semibold my-4 text-primary text-left mb-5">
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
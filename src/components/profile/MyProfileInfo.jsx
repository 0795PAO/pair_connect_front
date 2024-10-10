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
    console.log('Estoy aquí', user)

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
                >
                    <Edit />
                </Button>
            </div>
            <section className="relative mt-6 rounded-lg bg-card">
                <div className="p-6 mt-6 shadow-lg lg:col-span-2">
                    <h2 className="mb-5 text-2xl font-semibold transition duration-300 hover:text-secondary text-textPrimary">
                        Lenguajes de programación
                    </h2>
                    <ul className="flex flex-wrap gap-4 mt-6">
                        {user?.language_names?.length > 0 && <ItemList items={user.language_names} />}
                    </ul>
                </div>
            </section>

            <section className="relative">
                <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-2">
                    <SectionCard title="Stack" content={user?.stack_name || "Fullstack"} />
                    <SectionCard title="Nivel" content={user?.level_name || "Junior"} />
                </div>
            </section>

            <section className="relative mt-5">
                <div className="flex justify-end mt-4 mb-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary text-foreground"
                        onClick={() => handleEditClick("contact")}
                    >
                        <Edit />
                    </Button>
                </div>
                <SectionCard
                    title="Contactos"
                    content={(
                        <ul className="space-y-2 text-lg font-medium">
                            {user?.email && <li><span className="font-bold">Email:</span> {user.email}</li>}
                            {user?.github_link && <li><span className="font-bold">Github:</span> {user.github_link}</li>}
                            {user?.linkedin_link && <li><span className="font-bold">LinkedIn:</span> {user.linkedin_link}</li>}
                            {user?.discord_link && <li><span className="font-bold">Discord:</span> {user.discord_link}</li>}
                        </ul>
                    )}
                />
            </section>
            <UpdateProfileModal open={open} onOpenChange={setOpen} type={formType} />
        </div>
    );
};

export default MyProfileInfo
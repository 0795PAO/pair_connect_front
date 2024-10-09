import MyProfileNav from "@/components/profile/MyProfileNav";
import UpdateProfileModal from "@/components/profile/UpdateProfileModal";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";


const MyProfilePage = () => {
    const { data: user, isLoading, error } = useProfile();
    const [open, setOpen] = useState(false);
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
        setFormType("about_avatar")
    }

    return (
        <>
            <div className="flex items-center justify-center gap-2 px-6 lg:justify-start">
                <p className="text-4xl font-bold sm:text-3xl md:text-4xl" style={{ fontFamily: "Source Code Pro, monospace" }}>
                    Hola,
                </p>
                <h1 className="text-4xl font-bold font-poppins sm:text-5xl md:text-6xl gradient4-text">
                    {user?.username}
                </h1>
            </div>
            <div className="grid w-full grid-cols-1x" >

                <div className="flex flex-col items-center w-full gap-8 px-6 text-left" >
                    <div className="self-end w-full font-light text-right">
                        <Button variant="ghost" size="icon" className="font-light hover:text-primary" onClick={handleEditClick}><Edit /></Button>
                        <Button variant="ghost" size="icon" className="font-light hover:text-primary"><Trash /></Button>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full gap-6 mb-10 text-left">
                        <img
                            src={user?.photo}
                            alt="Profile"
                            className="mb-8 rounded-full w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-60 xl:h-60"
                        />
                        <div className="flex flex-col gap-2">
                            <p className="text-3xl font-semibold">{user?.name}</p>
                            <p>  {
                                user.about_me ?
                                    user.about_me
                                    :
                                    "¡Este desarrollador aún no ha escrito su historia, pero seguro que está creando algo genial! 🎉🚀"
                            }
                            </p>
                        </div>
                    </div>
                </div>
                    <MyProfileNav />
                    <UpdateProfileModal open={open} onOpenChange={setOpen} type={formType} />
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default MyProfilePage
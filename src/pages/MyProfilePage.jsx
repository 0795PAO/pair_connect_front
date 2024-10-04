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
    const [formType, setType] = useState("");
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error(error);
        return <p>Error: {error.message}</p>
    }

    const handleEditClick = () => {
        setOpen(true);
        setType("about_avatar")
    }

    return (
        <>
            <div className="flex items-center justify-center gap-2 lg:justify-start">
                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                    Hola,
                </h1>
                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl gradient2-text">
                    {user?.username}
                </h1>
            </div>
            <div className="grid w-full h-full grid-cols-1x lg:grid-cols-2" >

                <div className="flex flex-col gap-8 justify-start items-center text-left w-[100%] p-5" >
                    <div className="self-end w-full px-8 font-light text-right">
                        <Button variant="ghost" size="icon" className="font-light hover:text-primary" onClick={handleEditClick}><Edit /></Button>
                        <Button variant="ghost" size="icon" className="font-light hover:text-primary"><Trash /></Button>
                    </div>
                    <div className="flex items-center justify-center w-full gap-6 text-left">
                        <img src={user?.photo} alt="Profile" className="w-24 h-24 rounded-full md:w-30 md:h-30" />
                        <div className="flex flex-col gap-2">
                            <p className="text-xl font-semibold">{user?.name}</p>
                            <p>  {
                                user.about_me ?
                                    user.about_me
                                    :
                                    "¡Este desarrollador aún no ha escrito su historia, pero seguro que está creando algo genial! 🎉🚀"
                            }
                            </p>
                        </div>
                    </div>
                    <MyProfileNav />
                    <UpdateProfileModal open={open} onOpenChange={setOpen} type={formType} />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default MyProfilePage
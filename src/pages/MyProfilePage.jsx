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
            <h1 className="p-5 text-5xl font-bold mt-4 text-transparent bg-clip-text gradient2-text text-center md:text-left">Mi perfil</h1>
            <div className="grid grid-cols-1x w-full h-full lg:grid-cols-2" >

                <div className="flex flex-col gap-8 justify-start items-center text-left w-[100%] p-5" >
                    <div className="self-end text-right w-full font-light px-8">
                        <Button variant="ghost" size="icon" className="hover:text-primary font-light" onClick={handleEditClick}><Edit /></Button>
                        <Button variant="ghost" size="icon" className="hover:text-primary font-light"><Trash /></Button>
                    </div>
                    <div className="flex justify-center items-center w-full text-left gap-6">
                        <img src={user?.photo} alt="Profile" className="w-24 h-24 md:w-30 md:h-30 rounded-full" />
                        <div className="flex flex-col gap-2">
                            <h3 className="text-3xl font-semibold">{user?.username}</h3>
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
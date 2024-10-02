
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { Edit, Trash } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";


const MyProfilePage = () => {
    const { data: user, isLoading, error } = useProfile();
    const location = useLocation();

    console.log(user)
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error(error);
        return <p>Error: {error.message}</p>
    }


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                <div className="flex-col gap-8 justify-start items-center text-left w-[100%] p-5" style={{ boxShadow: "var(--shadow-custom)" }}>
                    <h1 className="text-5xl font-bold mb-8 mt-4 text-transparent bg-clip-text gradient2-text text-center md:text-left">Mi perfil</h1>
                    <div className="self-end text-right w-full font-light">
                        <Button variant="ghost" size="icon" className="hover:text-primary font-light"><Edit /></Button>
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
                    <nav className="mt-8">
                        <ul className="flex justify-evenly items-center">
                            <li className={`${location.pathname === "/my-profile" ? "text-secondary" : ""} hover:text-secondary font-semibold`}>
                                <Link to="/my-profile">Info</Link>
                            </li>
                            <li className={`${location.pathname === "/my-profile/sessions" ? "text-secondary" : ""} hover:text-secondary font-semibold`}>
                                <Link to="/my-profile/sessions">Mi sesiones</Link>
                            </li>
                            <li className={`${location.pathname === "/my-profile/badges" ? "text-secondary" : ""} hover:text-secondary font-semibold`}>
                                <Link to="/my-profile/badges">Badges</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default MyProfilePage
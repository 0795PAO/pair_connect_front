
import Loader from "@/components/shared/Loader";
import { useProfile } from "@/hooks/useProfile";
import { Link } from "react-router-dom";


const MyProfilePage = () => {
    const { data: user, isLoading, error } = useProfile();

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
        <div className="flex flex-col justify-start items-start w-[80%] text-left gap-6">
        <h1 className="text-6xl font-bold">Mi perfil</h1>
        <p className="text-3xl font-semibold">{user?.username}</p>
        <img src={user?.photo} alt="Profile" className="w-96 h-96 rounded-full"/>
        </div>
        <Link to="/my-profile/edit">Edit Profile</Link>
        </>
    )
}

export default MyProfilePage
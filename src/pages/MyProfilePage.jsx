
import Loader from "@/components/shared/Loader";
import { useProfile } from "@/hooks/useProfile";
import { Link } from "react-router-dom";


const MyProfilePage = () => {
    const { data: user, isLoading, error } = useProfile();


    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error(error);
        return <p>Error: {error.message}</p>
    }


    return (
        <>
        <div>MyProfilePage {user?.username}</div>
        <Link to="/my-profile/edit">Edit Profile</Link>
        </>
    )
}

export default MyProfilePage
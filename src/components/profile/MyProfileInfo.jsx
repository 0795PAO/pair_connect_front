import { useProfile } from "@/hooks/useProfile";
import Loader from "../shared/Loader";

const MyProfileInfo = () => {
    const { data: user, isLoading } = useProfile();

    if (isLoading) {
        return <Loader />
    }


    return (
        <div className="py-5 grid grid-col gap-5 items-center justify-center text-center">
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
        </div>
    )
}
export default MyProfileInfo
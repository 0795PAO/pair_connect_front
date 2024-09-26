import ProfileForm from "@/components/profile/ProfileForm"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

const MyProfilePage = () => {
    const { elementRef } = useMousePosition()

    const [userInfo, setUserInfo] = useState({
        id: 1,
        name: "Lynn",
        username: "DeadPoetess",
        languages: [],
        stack: "",
        level: "",
        imageUrl: "/photo_fire.svg",
        about_me: "",
        linkedin_link: "",
        github_link: "",
        discord_link: "",
    });

    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        const checkUserInfoCompletion = () => {
            const incompleteFields = [
                'languages',
                'stack',
                'level',
                'about_me',
                'linkedin_link',
                'github_link',
                'discord_link'
            ].some(field => !userInfo[field] || userInfo[field].length === 0);

            return incompleteFields;
        }
        const hasIncompleteInfo = checkUserInfoCompletion();
        setShowForm(hasIncompleteInfo);
    }, [userInfo]);

    const handleFormSubmit = (updatedData) => {
        console.log("Dati aggiornati:", updatedData);
        setUserInfo(updatedData);
        setShowForm(false);
    }

    if (showForm) {
        return (
            <>
                <section className="my-8 flex flex-col items-center justify-center gap-5 text-center">
                    <img src={userInfo.imageUrl} alt={userInfo.name} className="w-[9.375rem]"/>
                    <h1 className="text-3xl font-bold">Hola, {userInfo.username}</h1>
                    <p className="text-lg font-bold">Cuentanos un poco mas sobre ti</p>
                    <p>¡Esto nos ayudará a encontrar el match perfecto para ti!</p>
                </section>

                <section className="flex flex-col items-center justify-center gap-5 text-center w-[80vw] md:w-[60vw]">
                    <div className="border rounded-lg  w-[80vw] mouse-light-effect md:w-[60vw] " ref={elementRef}>
                        <div className="card-with-light-effect p-5" >
                            <ProfileForm handleSubmit={handleFormSubmit} />
                        </div>
                    </div>
                </section>

                <p className="flex text-center sm:justify-center flex-col items-center justify-center gap-2 mt-12 md:flex-row">Lo haré mas tarde
                    <Link to="/" className="bold text-secondary">Saltar</Link>
                </p>

            </>
        )
    }

    return (
        <div>MyProfilePage</div>
    )
}




export default MyProfilePage
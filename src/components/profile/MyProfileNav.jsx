import { Link, useLocation } from "react-router-dom"
import "@/styles/navbar-profile.css"

const MyProfileNav = () => {
    const location = useLocation();

    return (
        <nav className="relative p-1 ">
            <ul className="flex items-center list-none">
                <li className={`${location.pathname === "/my-profile" ? "active-glass" : ""} flex-1 text-center`}>
                    <Link to="/my-profile" className="px-4 py-3 text-sm font-bold lg:text-lg ">
                        Info
                    </Link>
                </li>
                <li className={`${location.pathname === "/my-profile/sessions" ? "active-glass" : ""} flex-1 text-center`}>
                    <Link to="/my-profile/sessions" className="px-4 py-3 text-sm font-bold lg:text-lg whitespace-nowrap">
                        Mis Sesiones
                    </Link>
                </li>
                <li className={`${location.pathname === "/my-profile/badges" ? "active-glass" : ""} flex-1 text-center`}>
                    <Link to="/my-profile/badges" className="px-4 py-3 text-sm font-bold lg:text-lg ">
                        Badges
                    </Link>
                </li>
            </ul>
            <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 rounded animate-gradientShift"></div>
        </nav>
    );
};


export default MyProfileNav
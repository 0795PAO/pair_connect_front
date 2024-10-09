import { Link, useLocation } from "react-router-dom"
import "@/styles/navbar-profile.css"

const MyProfileNav = () => {
    const location = useLocation();

    return (
        <nav className="relative p-1 profile-nav ">
            <ul className="flex-nav">
                <li className={`${location.pathname === "/my-profile" ? "active-glass" : ""}`}>
                    <Link to="/my-profile" className="px-4 py-3 text-sm font-bold nav-link lg:text-lg">
                        Info
                    </Link>
                </li>
                <li className={`${location.pathname === "/my-profile/sessions" ? "active-glass" : ""} `}>
                    <Link to="/my-profile/sessions" className="px-4 py-3 text-sm font-bold nav-link lg:text-lg whitespace-nowrap">
                        Mis Sesiones
                    </Link>
                </li>
                <li className={`${location.pathname === "/my-profile/badges" ? "active-glass" : ""}`}>
                    <Link to="/my-profile/badges" className="px-4 py-3 text-sm font-bold nav-link lg:text-lg">
                        Badges
                    </Link>
                </li>
            </ul>
            <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 rounded animate-gradientShift"></div>
        </nav>
    );
};


export default MyProfileNav
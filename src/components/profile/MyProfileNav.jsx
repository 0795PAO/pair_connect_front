import { Link, useLocation } from "react-router-dom"
import "@/styles/navbar-profile.css"

const MyProfileNav = () => {
    const location = useLocation();

    return (
        <nav className="relative p-1 profile-nav">
            <ul className="flex flex-row items-center justify-around">
                <li className={`${location.pathname === "/my-profile" ? "active-glass" : ""}`}>
                    <Link 
                        to="/my-profile" 
                        className="py-3 text-sm font-bold nav-link lg:text-lg" 
                        title="Info"
                        aria-label="Info"
                    >
                        Info
                    </Link>
                </li>
                <li className={`${location.pathname === "/my-profile/sessions" ? "active-glass" : ""}`}>
                    <Link 
                        to="/my-profile/sessions" 
                        className="py-3 text-sm font-bold nav-link lg:text-lg whitespace-nowrap"
                        title="Sesiones"
                        aria-label="Sesiones"
                    >
                        Mis Sesiones
                    </Link>
                </li>
                <li className={`${location.pathname === "/my-profile/badges" ? "active-glass" : ""}`}>
                    <Link 
                        to="/my-profile/badges" 
                        className="py-3 text-sm font-bold nav-link lg:text-lg" 
                        title="Badges"
                        aria-label="Badges"
                    >
                        Badges
                    </Link>
                </li>
            </ul>
            <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 rounded animate-gradientShift navbar-gradient-line"></div>
        </nav>
    );
};

export default MyProfileNav
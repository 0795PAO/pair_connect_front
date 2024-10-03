import { Link, useLocation } from "react-router-dom"

const MyProfileNav = () => {
    const location = useLocation();

    return (
        <nav className="mt-8 p-5 mx-[-20px] w-full" style={{ boxShadow: "var(--shadow-custom)" }}>
            <ul className="flex justify-evenly items-center w-full">
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
    )
}
export default MyProfileNav
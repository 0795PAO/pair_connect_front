import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"
import { Toaster } from "@/components/ui/toaster"
import CosmicBackground from "@/components/shared/CosmicBackground";
import { Outlet, useLocation  } from "react-router-dom"

const PublicLayout = () => {
    const location = useLocation();
    const isAboutUsPage = location.pathname === '/about-us';

    return (
        <>
            <Navbar />
            <main className={isAboutUsPage ? "relative min-h-screen" :"min-h-[90vh] flex flex-col justify-center gap-10 items-center p-6 sm:p-6"}>
            {isAboutUsPage && <CosmicBackground />}
                <div className="relative z-10 w-full">
                    <Outlet />
                </div>
            </main>
            <Footer />
            <Toaster />
        </>
    )
}
export default PublicLayout
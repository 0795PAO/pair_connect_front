import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"
import { Toaster } from "@/components/ui/toaster"

import { Outlet } from "react-router-dom"

const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-[90vh] flex flex-col justify-center gap-10 items-center p-6 sm:p-6">
                <Outlet />
            </main>
            <Footer />
            <Toaster />
        </>
    )
}
export default PublicLayout
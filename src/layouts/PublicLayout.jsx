import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"
import { Toaster } from "@/components/ui/toaster"

import { Outlet } from "react-router-dom"

const PublicLayout= () => {
    return (
        <>
            <Navbar/>
            <main className="min-h-[90vh] flex flex-col justify-center items-center">
                <Outlet/>
                <Toaster/>
            </main>
            <Footer/>
        </>
    )
}
export default PublicLayout
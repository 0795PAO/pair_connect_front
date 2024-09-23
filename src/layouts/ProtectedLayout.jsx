import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"

import { Outlet } from "react-router-dom"

const ProtectedLayout = () => {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}
export default ProtectedLayout
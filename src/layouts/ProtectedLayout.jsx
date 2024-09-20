import Navbar from "@/components/Navbar"

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
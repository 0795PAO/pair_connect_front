import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";


const ProtectedLayout = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);


    useTokenRefresh(isAuthenticated, setIsAuthenticated);


    useEffect(() => {
        if (isAuthenticated !== null) {
            setLoading(false);
        }
    }, [isAuthenticated]);


    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? (
        <>
            <Navbar />
            <main className="min-h-[90vh] flex flex-col justify-center gap-10 items-center my-10">
                <Outlet />
            </main>
            <Footer />
            <Toaster />

        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedLayout;

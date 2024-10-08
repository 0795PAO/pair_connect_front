import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Loader } from "lucide-react";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated !== null) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) { 
    return <Loader />;
  }

  return isAuthenticated ? (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col gap-10 items-center justify-center mt-36">
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

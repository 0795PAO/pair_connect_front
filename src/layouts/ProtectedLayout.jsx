import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log(isAuthenticated);

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

export default ProtectedLayout

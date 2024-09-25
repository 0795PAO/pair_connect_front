import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const ProtectedLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </>
  );
};
export default ProtectedLayout;

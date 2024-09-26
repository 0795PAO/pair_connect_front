import { useState } from "react";
import ModeToggle from "./ModeToggle";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { logout } from "@/services/authService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isBreaking, setIsBreaking] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 201) {
        toast({
          title: "Logout",
          description: "Se ha cerrado la sesión correctamente",
          variant: "Success",
        });
        setTimeout(() => navigate("/login"), 4000);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `${err.message}`,
        variant: "destructive",
      });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsBreaking(true);
    setTimeout(() => {
      setIsBreaking(false);
      setIsRestoring(true);
      navigate("/");
    }, 500);
  };

  const handleAnimationEnd = () => {
    if (isRestoring) {
      setIsRestoring(false);
    }
  };

  const navlinks = [
    { name: "Home", to: "/" },
    { name: "Sobre nosotros", to: "/about-us" },
    { name: "Pair programming", to: "/pair-programming" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="shadow-lg px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <a href="/" onClick={handleLogoClick} className="h-10">
            <img
              src="/logo.svg"
              alt="logo"
              className={`w-[35px] ${isBreaking ? "break" : ""} ${
                isRestoring ? "restore" : ""
              }`}
              onAnimationEnd={handleAnimationEnd}
            />
          </a>
          <span
            className="font-poppins font-bold text-[36px] leading-[120%] hidden md:block text-transparent bg-clip-text"
            style={{ backgroundImage: "var(--gradient)" }}
          >
            Pair Connect
          </span>
        </div>

        <div className="hidden lg:flex space-x-8">
          {navlinks.map((item) => (
            <NavLink key={item.name} to={item.to}>
              {item.name}
            </NavLink>
          ))}
          {isAuthenticated && (
            <>
              <NavLink to="/profile">Mi perfil</NavLink>
              <NavLink to="/projects">Mis proyectos</NavLink>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          {isAuthenticated ? (
            <Button onClick={handleLogout}>Log Out</Button>
          ) : (
            <Button>Login</Button>
          )}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none hover:text-primary"
            >
              <Menu size={40} />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden flex flex-col items-left space-y-2 py-5">
          {navlinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className="hover:text-primary"
            >
              {item.name}
            </NavLink>
          ))}
          {isAuthenticated && (
            <>
              <NavLink to="/my-profile">Mi perfil</NavLink>
              <NavLink to="/projects">Mis proyectos</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

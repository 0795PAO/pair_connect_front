import { useState, useEffect, useRef } from "react";
import ModeToggle from "./ModeToggle";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { handleLogout } = useLogout();
  const [isBreaking, setIsBreaking] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const logoRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const handleAnimationEnd = (event) => {
      if (event.animationName === "breakEffect") {
        setIsBreaking(false);
        setIsRestoring(true);
        navigate("/");
      }
    };

    const logo = logoRef.current;
    if (logo) {
      logo.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (logo) {
        logo.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, [navigate]);

  const handleLogoClick = () => {
    setIsBreaking(true);
    setIsRestoring(false);
  };

  const handleNavLinkClick = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1300);
  };

  const navlinks = [
    { name: "Home", to: "/" },
    { name: "Sobre el equipo", to: "/about-us" },
    { name: "Pair programming", to: "/pair-programming" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className="px-6 py-4 fixed top-0 left-0 right-0 z-50 bg-background"
      style={{ boxShadow: "var(--shadow-custom)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="#" onClick={handleLogoClick} className="h-10">
            <img
              ref={logoRef}
              src="/logo.svg"
              alt="logo"
              className={`w-[35px] ${isBreaking ? "break" : ""} ${
                isRestoring ? "restore" : ""
              }`}
            />
          </Link>
          <span
            className="font-poppins font-bold text-[36px] leading-[120%] hidden md:block text-transparent bg-clip-text"
            style={{ backgroundImage: "var(--gradient)" }}
          >
            Pair Connect
          </span>
        </div>

        <div className="hidden space-x-8 lg:flex">
          {navlinks.map((item) => (
            <NavLink key={item.name} to={item.to}>
              {item.name}
            </NavLink>
          ))}
          {isAuthenticated && (
            <>
              <NavLink to="/my-profile" onClick={handleNavLinkClick}>
                Mi perfil
              </NavLink>
              <NavLink to="/projects" onClick={handleNavLinkClick}>
                Mis proyectos
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          {isAuthenticated ? (
            <Button onClick={handleLogout}>Log Out</Button>
          ) : (
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          )}
          <div className="lg:hidden" ref={menuRef}>
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
        <div
          className="flex flex-col py-5 space-y-2 lg:hidden items-left"
          ref={menuRef}
        >
          {navlinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className="hover:text-primary"
              onClick={handleNavLinkClick}
            >
              {item.name}
            </NavLink>
          ))}
          {isAuthenticated && (
            <>
              <NavLink to="/my-profile" onClick={handleNavLinkClick}>
                Mi perfil
              </NavLink>
              <NavLink to="/projects" onClick={handleNavLinkClick}>
                Mis proyectos
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

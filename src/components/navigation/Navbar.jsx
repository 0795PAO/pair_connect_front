import React, { useState, useEffect } from 'react';
import ModeToggle from './ModeToggle';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const navlinks = [
        { name: "Home", to: "/" },
        { name: "Sobre nosotros", to: "/about-us" },
        { name: "Pair programming", to: "/pair-programming" },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    // Detectar si el modo oscuro está activado
    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
    }, []);

    return (
        <nav className={`shadow-lg px-6 py-4`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className=" h-10">
                        <img src='/logo.svg' alt='logo' className='w-[40px]'></img>
                    </div>
                    <span className="font-poppins font-bold text-[36px] leading-[120%] hidden md:block text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient)' }}>Pair Connect</span>
                </div>

                {/* Links para escritorio */}
                <div className="hidden lg:flex space-x-8">
                    {navlinks.map((item) => (
                        <NavLink key={item.name} to={item.to} className="">{item.name}</NavLink>
                    ))}
                    {/* Mostrar "Mi perfil" si el usuario está autenticado */}
                    {isAuthenticated && (
                        <NavLink to="/profile" className="">Mi perfil</NavLink>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    {/* Botón para alternar el tema */}
                    <ModeToggle />
                    {/* Botón de Login */}
                    <Button>login</Button>
                </div>

                {/* Botón de menú móvil */}
                <div className="md:hidden">
                    <button 
                        onClick={toggleMenu} 
                        className={`${isDarkMode ? 'text-white' : 'text-black'} focus:outline-none`}
                    >
                        <Menu />
                    </button>
                </div>
            </div >

            {/* Menú móvil */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-left space-y-2 py-5">
                    {navlinks.map((item) => (
                        <NavLink key={item.name} to={item.to} className="">{item.name}</NavLink>
                    ))}
                    {/* Mostrar "Mi perfil" si el usuario está autenticado en el menú móvil */}
                    {isAuthenticated && (
                        <NavLink to="/profile" className="">Mi perfil</NavLink>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

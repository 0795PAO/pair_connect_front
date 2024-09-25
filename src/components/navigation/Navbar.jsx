import React, { useState } from 'react';
import ModeToggle from './ModeToggle';
import { NavLink } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navlinks = [
        {name:"Home",to:"/"},
        {name:"Sobre nosotros",to:"/about-us"},
        {name:"Pair programming",to:"/pair-programming"},
    ]

    // Asegurarnos que la función toggleMenu esté dentro del componente Navbar
    const toggleMenu = () => setIsOpen(!isOpen);


    return (
        <nav className={`shadow-lg px-6 py-4`}>
            <div className="container mx-auto flex justify-between items-center">
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
                </div>

                <div className="flex items-center space-x-4">
                    {/* Botón para alternar el tema */}
                    <ModeToggle/>
                    {/* Botón de Login */}
                    <Button>login</Button>
                </div>

                {/* Botón de menú móvil */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                         <Menu></Menu>
                    </button>
                </div>
            </div >

            {/* Menú móvil */}
            {
                isOpen && (
                    <div className="md:hidden flex flex-col items-left space-y-2 py-5">
                        {['Home', 'Sobre nosotros', 'Pair programming'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-gray-800 hover:text-blue-600"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                )
            }
        </nav >
    );
};

export default Navbar;

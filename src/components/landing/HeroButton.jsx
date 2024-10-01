/* eslint-disable react/prop-types */
import { Button } from "../ui/button"

const HeroButton = ({ text, onClick }) => {
    return (
        <div
            className="relative w-40 h-12 p-1 transition-transform duration-700 rounded-md md:w-56 md:h-14 lg:w-64 lg:h-16 bg-gradient-to-l from-secondary to-primary hover:scale-110 hover:bg-gradient-to-r" 
            onClick={onClick}
        >
            <Button 
                variant="gradient" 
                aria-label="hero-gradient-register-button"
                className="w-full h-full px-8 py-2 text-sm border-2 md:px-10 md:py-3 lg:px-12 lg:py-4 md:text-lg lg:text-xl bg-background text-foreground hover:bg-background hover:text-foreground border-primary"
                title={"Sí, sí, aquí! Tendrás acceso a conectar con la comunidad de devs."} 
            >
                {text}
            </Button>
        </div>
    );
};

export default HeroButton

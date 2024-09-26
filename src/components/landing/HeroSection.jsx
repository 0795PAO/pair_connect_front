/* eslint-disable react/prop-types */
import HeroButton from "./HeroButton";
import 'animate.css';

const HeroSection = ({handleRegisterClick}) => {
    return (
        <section className="flex flex-col items-center justify-center pt-2 mt-40 mb-40 text-center bg-background"> 
            <h1 className="mb-10 font-poppins font-bold text-6xl md:text-7xl lg:text-9xl leading-[120%] text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient)' }}>
                Pair Connect
            </h1>
            <p className="text-xl mb-28 md:text-2xl lg:text-3xl text-foreground">
                Conecta, programa y crece en equipo
            </p>
            <HeroButton text="Regístrate aquí" onClick={handleRegisterClick} />
        </section>
    );
};

export default HeroSection

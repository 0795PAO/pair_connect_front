import HeroButton from "./HeroButton";

const HeroSection = () => {
    const handleRegisterClick = () => {
        console.log('Botón de "Registrarme" clicado');
    };

    return (
        <section className="flex flex-col items-center justify-center pt-2 mt-16 text-center bg-background"> 
            <h1 className="mb-4 font-poppins font-bold text-6xl leading-[120%] text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient)' }}>
                Pair Connect
            </h1>
            <p className="mb-6 text-lg text-foreground">
                Encuentra tu colega para aprender y codificar.
            </p>
            <HeroButton text="Registrarme" onClick={handleRegisterClick} />
        </section>
    );
};

export default HeroSection

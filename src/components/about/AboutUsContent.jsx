/* eslint-disable react/prop-types */
const AboutUsContent = ({ onClick }) => {
    return (
        <div className="relative flex flex-col items-center justify-center p-4 m-0 mt-10"
            onClick={onClick}
        >
            <div className="max-w-4xl cursor-pointer neon-border bg-background">
                <h1 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text gradient2-text">
                    Sobre el equipo
                </h1>
                <p className="mb-4 text-base text-center text-foreground">
                    Somos seis chicas llenas de energía que, tras enfrentarnos al intenso bootcamp de Factoría F5 en el programa FemCoders Promoción5 (Barcelona y Norte), hemos unido nuestras fuerzas para crear este proyecto grupal pedagógico final.
                </p>
                <p className="mb-4 text-base text-center text-foreground">
                    Entre líneas de código y risas, hemos dado vida a <strong>Pair Connect</strong>, moldeando la idea inicial para reflejar nuestra pasión, creatividad y todo lo que hemos aprendido en este increíble viaje.
                </p>
                <p className="mb-8 text-base text-center text-foreground">
                    ¡Innovadoras, dinámicas y listas para conquistar el mundo tech!
                </p>
                <p className="text-2xl text-center text-foreground">
                    🌟🚀👩‍💻💡
                </p>
            </div>
        </div>
    );
};

export default AboutUsContent
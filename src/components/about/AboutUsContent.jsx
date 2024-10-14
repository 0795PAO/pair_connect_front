/* eslint-disable react/prop-types */
const AboutUsContent = ({ onClick }) => {
    return (
        <section className="relative flex flex-col items-center justify-center" onClick={onClick}>
            <h1 className="mt-10 mb-16 text-3xl font-bold text-center text-transparent cursor-pointer sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text gradient3-text">
                Sobre el equipo
            </h1>

            <article className="w-full max-w-6xl p-4 text-base cursor-pointer sm:p-6 lg:p-8 sm:text-lg lg:text-xl neon-border2 bg-background">
                <p className="mb-4 text-center text-foreground">
                    Somos seis chicas llenas de energía que, tras enfrentarnos al intenso bootcamp de Factoría F5 en el programa FemCoders Promoción5 (Barcelona y Norte), hemos unido nuestras fuerzas para crear este proyecto grupal pedagógico final.
                </p>

                <p className="mb-4 text-center text-foreground">
                    Entre líneas de código y risas, hemos dado vida a <strong>Pair Connect</strong>, moldeando la idea inicial para reflejar nuestra pasión, creatividad y todo lo que hemos aprendido en este increíble viaje.
                </p>

                <p className="mb-8 text-center text-foreground">
                    ¡Innovadoras, dinámicas y listas para conquistar el mundo tech!
                </p>

                <p className="text-xl text-center sm:text-2xl text-foreground">
                    🌟🚀👩‍💻💡
                </p>
            </article>
        </section>

    );
};

export default AboutUsContent
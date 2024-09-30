const AboutUsContent = () => {
    return (
        <div className="relative flex flex-col items-center justify-center p-4 m-0 mt-10">
            <div className="max-w-4xl cursor-pointer neon-border bg-background">
                <h4 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#f05cba] via-[#18e0ea] to-[#ef40b5] dark:from-[#db3eb4] dark:via-[#eed5e0] dark:to-[#db3eb4]">
                    Sobre el equipo
                </h4>
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
import { Button } from "@/components/ui/button";

const UnderConstruction = () => {
    return (
        <div>
            <div className="flex flex-col items-center px-6 py-16 rounded-lg sm:px-6 sm:py-24 bg-card lg:py-32">
                <h1 className="mb-16 text-3xl font-bold text-center sm:text-5xl sm:mb-36 bg-secondary">
                    🚧 Under Construction 🚧
                </h1>
                <p className="px-4 mb-16 text-xl text-center sm:px-10 sm:mb-32 sm:text-xl text-primary-text-color dark:text-primary">
                    ¡Oops! Aún estamos ensamblando esta página...<br />
                    ¡Prometemos que tendrá menos bugs que un picnic en el bosque! <br />
                    🐛🚫
                </p>
                <Button
                    className="text-base sm:text-xl p-3 sm:p-4 bg-primary hover:bg-[hsl(var(--button-hover))] text-black rounded-lg transition-all duration-300 shadow-[var(--shadow-custom)]"
                    onClick={() => window.location.href = '/my-profile'}
                    title="Estamos poniendo todo nuestro amor en este proyecto ❤️ ¡Ten paciencia!"
                >
                    Volver a una página acabada
                </Button>
            </div>
        </div>
    );
};

export default UnderConstruction
/* eslint-disable react/prop-types */
import { ReactSVG } from 'react-svg';

const SessionCardActions = ({ session }) => {
    return (
        <div className="flex gap-1 sm:gap-2">
            <button
                onClick={() => console.log(`Editar sesión: ${session.id}`)}
                className="p-1 rounded sm:p-2 bg-card text-card-foreground hover:bg-primary hover:text-primary-foreground"
                aria-label="Editar sesión"
                title="Editar sesión" 
            >
                <ReactSVG
                    src="/icon_edit.svg"
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    beforeInjection={(svg) => {
                        svg.setAttribute('stroke', 'currentColor');
                        svg.setAttribute('width', '100%');
                        svg.setAttribute('height', '100%');
                    }}
                />
            </button>

            <button
                onClick={() => console.log(`Eliminar sesión: ${session.id}`)}
                className="p-1 rounded sm:p-2 bg-card text-card-foreground hover:bg-secondary hover:text-secondary-foreground"
                aria-label="Eliminar sesión"
                title="Eliminar sesión"
            >
                <ReactSVG
                    src="/icon_delete.svg"
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    beforeInjection={(svg) => {
                        svg.setAttribute('stroke', 'currentColor');
                        svg.setAttribute('width', '100%');
                        svg.setAttribute('height', '100%');
                    }}
                />
            </button>
        </div>
    );
};

export default SessionCardActions

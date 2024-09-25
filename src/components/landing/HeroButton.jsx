/* eslint-disable react/prop-types */
import { Button } from "../ui/button"

const HeroButton = ({ text, onClick }) => {
    return (
        <div
            className="relative p-1 transition-transform duration-700 rounded-md bg-gradient-to-l from-secondary to-primary hover:scale-110 hover:bg-gradient-to-r"
            onClick={onClick}
        >
            <Button variant="ghost" className="bg-background text-foreground hover:bg-background hover:text-foreground" size="lg">
                {text}
            </Button>
        </div>
    );
};


export default HeroButton

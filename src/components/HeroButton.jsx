/* eslint-disable react/prop-types */
import { Button } from "./ui/button"

const HeroButton = ({ text, onClick }) => {
    return (
        <div
            className="relative p-1 transition-transform duration-700 rounded-md bg-gradient-to-r from-secondary to-primary hover:bg-gradient-to-l hover:scale-110 transition-background-image"
            onClick={onClick}
        >
            <Button className="bg-background text-foreground hover:bg-background hover:text-foreground">
                {text}
            </Button>
        </div>
    );
};


export default HeroButton

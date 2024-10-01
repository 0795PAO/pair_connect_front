import { useState, useEffect } from 'react';
import '@/styles/cosmic-background.css';

const CosmicBackground = () => {
    const [sparkles, setSparkles] = useState([]);

    useEffect(() => {
        const generateSparkle = () => {
            const sparkle = {
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 5,
            };
            setSparkles((prevSparkles) => [...prevSparkles, sparkle]);
        };

        const intervalId = setInterval(() => {
            generateSparkle();
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="cosmic-background">
    {sparkles.map((sparkle, index) => (
        <div
            key={index}
            className={`absolute rounded-full bg-cyan-400 animate-pulse opacity-50 ${Math.random() < 0.5 ? 'bg-pink-400' : ''}`}
            style={{
                top: `${sparkle.y}%`,
                left: `${sparkle.x}%`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
            }}
        />
    ))}
</div>
    );
};

export default CosmicBackground
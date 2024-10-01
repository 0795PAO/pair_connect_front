/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import '@/styles/cosmic-background.css';

const CosmicBackground = ({ maxSparkles = 100 }) => {
    const [sparkles, setSparkles] = useState([]);

    useEffect(() => {
        const generateSparkle = () => {
            const sparkle = {
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 5,
            };
            setSparkles((prevSparkles) => {
                if (prevSparkles.length >= maxSparkles) {
                    return [...prevSparkles.slice(1), sparkle];
                } else {
                    return [...prevSparkles, sparkle];
                }
            });
        };

        const intervalId = setInterval(() => {
            generateSparkle();
        }, 100);

        return () => clearInterval(intervalId);
    }, [maxSparkles]);

    return (
        <div className="cosmic-background">
            {sparkles.map((sparkle, index) => (
                <div
                    key={index}
                    className="sparkle bg-secondary dark:bg-primary"
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

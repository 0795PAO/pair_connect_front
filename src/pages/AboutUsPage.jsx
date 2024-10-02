import '@/styles/cosmic-background.css';
import CosmicBackground from '@/components/shared/CosmicBackground';
import AboutUsContent from '@/components/about/AboutUsContent';

const AboutUsPage = () => {
    return (
        <section className="relative min-h-screen" >
            <CosmicBackground />
            <AboutUsContent />
        </section>
    );
};

export default AboutUsPage
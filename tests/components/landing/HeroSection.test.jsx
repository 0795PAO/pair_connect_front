import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroSection from '@/components/landing/HeroSection';

describe('HeroSection', () => {
    it('renders HeroSection with title and button', () => {
        render(<HeroSection />);

        expect(screen.getByText(/Pair Connect/i)).toBeInTheDocument();

        expect(screen.getByText(/Conecta, programa y crece en equipo/i)).toBeInTheDocument();

        expect(screen.getByText(/Regístrate aquí/i)).toBeInTheDocument();
    });
});

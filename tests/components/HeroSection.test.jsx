import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroSection from '@/components/HeroSection';

describe('HeroSection', () => {
    it('renders HeroSection with title and button', () => {
        render(<HeroSection />);

        expect(screen.getByText(/Pair Connect/i)).toBeInTheDocument();

        expect(screen.getByText(/Encuentra tu colega para aprender y codificar/i)).toBeInTheDocument();

        expect(screen.getByText(/Registrarme/i)).toBeInTheDocument();
    });
});

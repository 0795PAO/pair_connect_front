import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroButton from '@/components/landing/HeroButton';

describe('HeroButton', () => {
    it('renders HeroButton with correct text', () => {
        render(<HeroButton text="Regístrate aquí" />);
        expect(screen.getByText(/Regístrate aquí/i)).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<HeroButton text="Regístrate aquí" onClick={handleClick} />);
        const button = screen.getByText(/Regístrate aquí/i);
        button.click();
        expect(handleClick).toHaveBeenCalled();
    });
});


import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroButton from '@/components/HeroButton';

describe('HeroButton', () => {
    it('renders HeroButton with correct text', () => {
        render(<HeroButton text="Registrarme" />);
        expect(screen.getByText(/Registrarme/i)).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<HeroButton text="Registrarme" onClick={handleClick} />);
        const button = screen.getByText(/Registrarme/i);
        button.click();
        expect(handleClick).toHaveBeenCalled();
    });
});


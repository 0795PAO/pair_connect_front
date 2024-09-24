import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import { useToast } from '@/hooks/useToast';

// Mock del hook useToast
vi.mock('@/hooks/useToast', () => ({
    useToast: vi.fn(),
}));

describe('LoginPage', () => {
    const mockToast = vi.fn();

    beforeEach(() => {
        useToast.mockReturnValue({
            toast: mockToast,
        });
    });

    it('renders the login page content', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        expect(screen.getByText(/Pair Connect/i)).toBeInTheDocument();

        expect(screen.getByRole('form')).toBeInTheDocument();

        const recoverLink = screen.getByRole('link', { name: /Recupera contraseña/i });
        expect(recoverLink).toBeInTheDocument();
        expect(recoverLink.getAttribute('href')).toBe('/recover-password');

        const registerLink = screen.getByRole('link', { name: /Regístrate/i });
        expect(registerLink).toBeInTheDocument();
        expect(registerLink.getAttribute('href')).toBe('/register'); 
    });

    it('calls handleSubmit and shows toast on form submission', async () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });

        await act(async () => {
            fireEvent.click(submitButton);
            expect(mockToast).toHaveBeenCalled();
        });

        
    });
});
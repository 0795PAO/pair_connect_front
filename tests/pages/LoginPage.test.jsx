import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import { useToast } from '@/hooks/useToast';

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

        const registerLink = screen.getByRole('button', { name: /Regístrate/i });
        expect(registerLink).toBeInTheDocument();
    });

    it('calls handleSubmit and shows toast on form submission', async () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });

        const emailInput = screen.getByLabelText(/correo/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);

        fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    

        await act(async () => {
            fireEvent.click(submitButton);
        });

        await act(async () => {
            expect(mockToast).toHaveBeenCalled();
        });

        
    });
});
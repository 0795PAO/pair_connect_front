import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import HomePage from '@/pages/HomePage'; // aggiorna il percorso secondo la tua struttura
import { registerUser } from '@/services/authService';
import { BrowserRouter } from 'react-router-dom'
import { useToast } from '@/hooks/useToast';

vi.mock('@/services/authService', () => ({
    registerUser: vi.fn(),
}));

const toastMock = vi.fn();
vi.mock('@/hooks/useToast', () => ({
    useToast: () => ({
        toasts: [],
        toast: toastMock,
        dismiss: vi.fn(),
    }),
}));


describe('HomePage', () => {
    beforeEach(() => {
        toastMock.mockClear();
        vi.clearAllMocks();
    });

    it('should render the homepage correctly', () => {
        render(<BrowserRouter><HomePage /></BrowserRouter>);

        const homePageElement = screen.getByTestId('home-page');
        expect(homePageElement).toBeInTheDocument();

        const registerButton = screen.getByRole('button', { name: /Regístrate/i });
        expect(registerButton).toBeInTheDocument();
    });

    it('should open the RegisterDialog when clicking the register button', async () => {
        render(<BrowserRouter><HomePage /></BrowserRouter>);

        const registerButton = screen.getByRole('button', { name: /Regístrate/i });

        fireEvent.click(registerButton);

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toBeInTheDocument();
    });

    it('should display a success toast after successful registration', async () => {
        registerUser.mockResolvedValueOnce({ status: 201 });

        render(<BrowserRouter><HomePage /></BrowserRouter>);

        const registerButton = screen.getByRole('button', { name: /Regístrate/i });
        fireEvent.click(registerButton);

        const emailInput = screen.getByLabelText(/Correo/i);
        const passwordInput = screen.getByLabelText(/ Contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Enviar/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Registrado/i)).toBeInTheDocument();
        });

    });

    it.skip('should display an error toast if registration fails', async () => {
        const errorResponse = {
            response: {
                data: {
                    email: ['El correo ya está registrado.'],
                },
            },
        };
        registerUser.mockRejectedValueOnce(errorResponse);

        render(<BrowserRouter><HomePage /></BrowserRouter>);

        const registerButton = screen.getByRole('button', { name: /Regístrate/i });
        fireEvent.click(registerButton);

        const emailInput = screen.getByLabelText(/correo/i);
        const passwordInput = screen.getByLabelText(/ contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Enviar/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(toastMock).toHaveBeenCalledOnce();
        });
    });
});
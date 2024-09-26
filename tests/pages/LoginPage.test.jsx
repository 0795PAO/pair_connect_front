import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/pages/LoginPage';
import { vi, expect, describe, it, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { login } from '@/services/authService';
import { useAuth } from '@/hooks/useAuth';

describe('LoginPage', () => {
    beforeEach(async () => {
        vi.mock('@/hooks/useMousePosition', () => ({
            useMousePosition: vi.fn(() => ({ elementRef: null })),
        }));

        vi.mock('@/hooks/useToast', () => ({
            useToast: vi.fn(() => ({ toast: vi.fn() })),
        }));

        vi.mock('@/hooks/useAuth', () => ({
            useAuth: vi.fn(() => ({ setIsAuthenticated: vi.fn() })),
        }));

        vi.mock('@/services/authService', () => ({
            login: vi.fn(),
        }))
    });
    it('renders the login form and register button', () => {
        render(<BrowserRouter> <LoginPage /> </BrowserRouter>);

        expect(screen.getByText('Pair Connect')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /regístrate/i })).toBeInTheDocument();
    });


    it('should submit form and authenticate user on success', async () => {
        const mockData = { email: 'test@example.com', password: 'password' };
        const mockResponse = { access: 'token' };
        const setIsAuthenticated = vi.fn();

        login.mockResolvedValueOnce(mockResponse);

        vi.mocked(useAuth).mockReturnValue({ setIsAuthenticated });

        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/correo/i), {
            target: { value: mockData.email },
        });
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: mockData.password },
        });

        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        await waitFor(() => {
            expect(setIsAuthenticated).toHaveBeenCalledWith(true);
        });
    });

});
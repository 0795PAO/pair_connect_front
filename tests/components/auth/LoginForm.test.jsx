import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from '@/components/auth/LoginForm';


describe('LoginForm', () => {
    const mockSubit = vi.fn();

    it('renders the form fields correctly', () => {
        render(<LoginForm handleSubmit={mockSubit} />);
        expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/)).toBeInTheDocument();
    })

    it('shows validation errors for empty form submission', async () => {
        render(<LoginForm handleSubmit={mockSubit} />);
        fireEvent.submit(screen.getByRole('button', { name: /Iniciar sesión/i }));
        expect(await screen.findByText(/El correo electrónico es obligatorio/i)).toBeInTheDocument();
        expect(screen.getByText(/La contraseña es obligatoria/i)).toBeInTheDocument();
    })

    it('calls handleSubmit when form is valid', async () => {
        render(<LoginForm handleSubmit={mockSubit} />);
        fireEvent.input(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'usuario@ejemplo.com' } });
        fireEvent.input(screen.getByLabelText(/Contraseña/), { target: { value: 'password123' } });

        fireEvent.submit(screen.getByRole('button', { name: /Iniciar sesión/i }));

        await screen.findByText('Iniciar sesión');

        expect(mockSubit).toHaveBeenCalled();
    })
})
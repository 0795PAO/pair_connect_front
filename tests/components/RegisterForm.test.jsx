import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterForm from '@/components/auth/RegisterForm';

describe('RegisterForm', () => {
    const mockSubmit = vi.fn();

    it('renders the form fields correctly', () => {
        render(<RegisterForm handleSubmit={mockSubmit} />);

        expect(screen.getByLabelText(/Nombre de usuario/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirmar contraseña/i)).toBeInTheDocument();
    });

    it('shows validation errors for empty form submission', async () => {
        render(<RegisterForm handleSubmit={mockSubmit} />);

        fireEvent.submit(screen.getByRole('button', { name: /Enviar/i }));

        expect(await screen.findByText(/El nombre de usuario es obligatorio/i)).toBeInTheDocument();
        expect(screen.getByText(/El correo electrónico es obligatorio/i)).toBeInTheDocument();
        expect(screen.getByText(/La contraseña debe tener al menos 8 caracteres/)).toBeInTheDocument();
        expect(screen.getByText(/La confirmación de la contraseña es obligatoria/i)).toBeInTheDocument();
    });

    it('calls handleSubmit when form is valid', async () => {
        render(<RegisterForm handleSubmit={mockSubmit} />);

        fireEvent.input(screen.getByLabelText(/Nombre de usuario/i), { target: { value: 'usuario123' } });
        fireEvent.input(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'usuario@ejemplo.com' } });
        fireEvent.input(screen.getByLabelText(/Contraseña/), { target: { value: 'password123' } });
        fireEvent.input(screen.getByLabelText(/Confirmar contraseña/i), { target: { value: 'password123' } });

        fireEvent.submit(screen.getByRole('button', { name: /Enviar/i }));

        await screen.findByText(/Enviar/i);

        expect(mockSubmit).toHaveBeenCalled();
    });
});
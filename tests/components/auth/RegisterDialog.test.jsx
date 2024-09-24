import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RegisterDialog from '@/components/auth/RegisterDialog';

describe('RegisterDialog', () => {
    const mockHandleSubmit = vi.fn();
    const mockOnOpenChange = vi.fn();

    it('renders the dialog content when open is true', () => {
        render(
            <MemoryRouter>
                <RegisterDialog open={true} onOpenChange={mockOnOpenChange} handleSubmit={mockHandleSubmit} />
            </MemoryRouter>
        );

        expect(screen.getByText(/Registro/i)).toBeInTheDocument();

        expect(screen.getByText(/Crea tu cuenta rellenando los campos abajo/i)).toBeInTheDocument();

        expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('does not render the dialog content when open is false', () => {
        render(
            <MemoryRouter>
                <RegisterDialog open={false} onOpenChange={mockOnOpenChange} handleSubmit={mockHandleSubmit} />
            </MemoryRouter>
        );

        expect(screen.queryByText(/Registro/i)).not.toBeInTheDocument();
    });

    it('calls onOpenChange when dialog open state changes', () => {
        render(
            <MemoryRouter>
                <RegisterDialog open={true} onOpenChange={mockOnOpenChange} handleSubmit={mockHandleSubmit} />
            </MemoryRouter>
        );

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: /close/i }));
        })

        expect(mockOnOpenChange).toHaveBeenCalled();
    });

    it('renders a link to login page', () => {
        render(
            <MemoryRouter>
                <RegisterDialog open={true} onOpenChange={mockOnOpenChange} handleSubmit={mockHandleSubmit} />
            </MemoryRouter>
        );

        const loginLink = screen.getByRole('link', { name: /Inicia sesión/i });
        expect(loginLink).toBeInTheDocument();
        expect(loginLink.getAttribute('href')).toBe('/login');
    });

});
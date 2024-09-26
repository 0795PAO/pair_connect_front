import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SessionCardActions from '@/components/session/SessionCardActions';

describe('SessionCardActions', () => {
    const mockSession = { id: '123' };

    it('renders edit and delete buttons', () => {
        render(<SessionCardActions session={mockSession} />);

        expect(screen.getByLabelText('Editar sesión')).toBeInTheDocument();
        expect(screen.getByLabelText('Eliminar sesión')).toBeInTheDocument();
    });

    it('calls console.log when edit button is clicked', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        render(<SessionCardActions session={mockSession} />);

        fireEvent.click(screen.getByLabelText('Editar sesión'));

        expect(consoleSpy).toHaveBeenCalledWith('Editar sesión: 123');
    });

    it('calls console.log when delete button is clicked', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        render(<SessionCardActions session={mockSession} />);

        fireEvent.click(screen.getByLabelText('Eliminar sesión'));

        expect(consoleSpy).toHaveBeenCalledWith('Eliminar sesión: 123');
    });

    it('renders correct titles for buttons', () => {
        render(<SessionCardActions session={mockSession} />);

        expect(screen.getByLabelText('Editar sesión')).toHaveAttribute('title', 'Editar sesión');
        expect(screen.getByLabelText('Eliminar sesión')).toHaveAttribute('title', 'Eliminar sesión');
    });
});

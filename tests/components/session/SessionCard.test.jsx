import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SessionCard from '@/components/session/SessionCard';

describe('SessionCard', () => {
    const mockSession = {
        title: 'Test Session',
        date: '2024-09-30',
        status: 'enrolled',
        owner: {
            username: 'test_user',
            avatar: '/test_avatar.jpg',
        },
        technologies: ['React', 'Vitest'],
        description: 'This is a test session description.',
        projectImage: '/test_project.jpg',
    };

    it('renders the session data correctly', () => {
        render(<SessionCard session={mockSession} />);

        expect(screen.getByText('Test Session')).toBeInTheDocument();
        expect(screen.getByText('2024-09-30')).toBeInTheDocument();
        expect(screen.getByText('test_user')).toBeInTheDocument();
        expect(screen.getByText('React, Vitest')).toBeInTheDocument();
        expect(screen.getByText('This is a test session description.')).toBeInTheDocument();
    });

    it('shows the enrolled status icon', () => {
        render(<SessionCard session={mockSession} />);

        const statusIcon = screen.getByAltText('Estado Inscrito');
        expect(statusIcon).toBeInTheDocument();
        expect(statusIcon).toHaveAttribute('src', '/icon_green.svg');
    });

    it('renders fallback avatar and project image if not provided', () => {
        const sessionWithoutImages = {
            ...mockSession,
            owner: { username: 'test_user', avatar: null },
            projectImage: null,
        };

        render(<SessionCard session={sessionWithoutImages} />);

        const fallbackAvatar = screen.getByAltText("test_user's avatar");
        expect(fallbackAvatar).toHaveAttribute('src', '/photo_default_user.svg');

        const fallbackProjectImage = screen.getByAltText('Imagen del proyecto');
        expect(fallbackProjectImage).toHaveAttribute('src', '/photo_default_project.svg');
    });

    it('calls the onClick event when clicked', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        render(<SessionCard session={mockSession} />);

        fireEvent.click(screen.getByText('Test Session'));

        expect(consoleSpy).toHaveBeenCalledWith('Ir a la sesión: Test Session');
    });
});

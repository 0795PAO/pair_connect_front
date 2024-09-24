import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePageWrapper from '@/wrappers/HomePageWrapper';
import { useAuth } from '@/hooks/useAuth';


vi.mock('@/hooks/useAuth');

describe('HomePageWrapper', () => {
    it('renders UserHomePage when authenticated', () => {
        useAuth.mockReturnValue({ isAuthenticated: true });

        render(<HomePageWrapper />);

        expect(screen.getByTestId('user-home-page')).toBeInTheDocument();

    });

    it('renders HomePage when not authenticated', () => {
        useAuth.mockReturnValue({ isAuthenticated: false });

        render(<HomePageWrapper />);

        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
});
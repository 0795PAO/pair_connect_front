import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePageWrapper from '@/wrappers/HomePageWrapper';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

vi.mock('@/hooks/useAuth');

describe('HomePageWrapper', () => {
    it('renders UserHomePage when authenticated', () => {

        const setIsAuthenticated = vi.fn();
        useAuth.mockReturnValue({
            isAuthenticated: true,
            setIsAuthenticated
        });
        
        render(
            <BrowserRouter>
                <HomePageWrapper />
            </BrowserRouter>
        );

        expect(screen.getByTestId('user-home-page')).toBeInTheDocument();
    });

    it('renders HomePage when not authenticated', () => {
        const setIsAuthenticated = vi.fn();
        useAuth.mockReturnValue({
            isAuthenticated: false,
            setIsAuthenticated
        });
        
        render(
            <BrowserRouter>
                <HomePageWrapper />
            </BrowserRouter>
        );

        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    })
})
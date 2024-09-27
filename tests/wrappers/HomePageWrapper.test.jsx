import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePageWrapper from '@/wrappers/HomePageWrapper';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


vi.mock('@/hooks/useAuth');

describe('HomePageWrapper', () => {
    it('renders UserHomePage when authenticated', () => {
        const queryClient = new QueryClient();

        const setIsAuthenticated = vi.fn();
        useAuth.mockReturnValue({
            isAuthenticated: true,
            setIsAuthenticated
        });

        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <HomePageWrapper />
                </BrowserRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId('user-home-page')).toBeInTheDocument();
    });

    it('renders HomePage when not authenticated', () => {
        const queryClient = new QueryClient();
        const setIsAuthenticated = vi.fn();
        useAuth.mockReturnValue({
            isAuthenticated: false,
            setIsAuthenticated
        });

        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <HomePageWrapper />
                </BrowserRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    })
})
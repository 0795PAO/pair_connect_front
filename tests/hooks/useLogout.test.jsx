import { renderHook, act } from '@testing-library/react';
import useLogout from '@/hooks/useLogout';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/services/authService';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@tanstack/react-query', () => ({
    useQueryClient: vi.fn(),
}));
vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));
vi.mock('@/services/authService', () => ({
    logout: vi.fn(),
}));
vi.mock('@/hooks/useAuth', () => ({
    useAuth: vi.fn(),
}));
vi.mock('@/hooks/useToast', () => ({
    useToast: vi.fn(),
}));

describe('useLogout hook', () => {
    const mockNavigate = vi.fn();
    const mockInvalidateQueries = vi.fn();
    const mockLogoutService = vi.fn();
    const mockLogout = vi.fn();
    const mockToast = vi.fn();

    beforeEach(() => {
        useQueryClient.mockReturnValue({
            invalidateQueries: mockInvalidateQueries,
        });
        useNavigate.mockReturnValue(mockNavigate);
        logout.mockImplementation(mockLogoutService);
        useAuth.mockReturnValue({
            logout: mockLogout,
        });
        useToast.mockReturnValue({
            toast: mockToast,
        });
    });

    it('should handle successful logout', async () => {
        mockLogoutService.mockResolvedValue({ status: 200 });

        const { result } = renderHook(() => useLogout());

        await act(async () => {
            await result.current.handleLogout();
        });

        expect(mockInvalidateQueries).toHaveBeenCalledWith(['profile']);
        expect(mockLogout).toHaveBeenCalled();
        expect(mockToast).toHaveBeenCalledWith({
            title: 'Logout',
            description: 'Se ha cerrado la sesión correctamente',
            variant: 'success',
        });
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should handle logout error', async () => {
        const errorMessage = 'Network error';
        logout.mockRejectedValue(new Error(errorMessage));


        console.log('Logout service:', logout.mock.calls);
        const { result } = renderHook(() => useLogout());

        await act(async () => {
            await result.current.handleLogout();
        });

        expect(mockToast).toHaveBeenCalledWith({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
        });

    });
});
import { renderHook, act } from '@testing-library/react';
import { useRegister } from '@/hooks/useRegister';
import { registerUser } from '@/services/authService';
import { useToast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@/services/authService', () => ({
    registerUser: vi.fn(),
}));

vi.mock('@/hooks/useToast', () => ({
    useToast: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));

describe('useRegister hook', () => {
    const mockToast = vi.fn();
    const mockNavigate = vi.fn();

    beforeEach(() => {
        useToast.mockReturnValue({
            toast: mockToast,
        });
        useNavigate.mockReturnValue(mockNavigate);
        vi.clearAllMocks();
    });

    it('should handle successful registration', async () => {
        registerUser.mockResolvedValue({
            status: 201,
        });

        const { result } = renderHook(() => useRegister());

        const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };

        await act(async () => {
            await result.current.handleRegister(userData);
        });

        expect(mockToast).toHaveBeenCalledWith({
            title: 'Registrado',
            description: 'Se ha registrado correctamente, controle su correo para activar su cuenta',
            variant: 'success',
        });
    });

    it('should handle registration error', async () => {
        const errorMessage = { email: ['Email already taken'] };
        registerUser.mockRejectedValue({
            response: { data: errorMessage },
        });

        const { result } = renderHook(() => useRegister());

        const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };

        await act(async () => {
            await result.current.handleRegister(userData);
        });

        expect(mockToast).toHaveBeenCalledWith({
            title: 'Error',
            description: 'Email already taken',
            variant: 'destructive',
        });
    });
});
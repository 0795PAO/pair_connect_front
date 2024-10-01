import { renderHook, act } from '@testing-library/react';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { updateUser } from '@/services/profileService';
import { useToast } from '@/hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vi, describe, it, expect } from 'vitest';
import { beforeEach } from 'vitest';

vi.mock('@/services/profileService', () => ({
    updateUser: vi.fn(),
}));

vi.mock('@/hooks/useToast', () => ({
    useToast: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
    useQueryClient: vi.fn(),
    useMutation: vi.fn(),
}));

describe('useUpdateProfile hook', () => {
    const mockToast = vi.fn();
    const mockInvalidateQueries = vi.fn();
    const mockMutateAsync = vi.fn();

    beforeEach(() => {
        useToast.mockReturnValue({
            toast: mockToast,
        });
        useQueryClient.mockReturnValue({
            invalidateQueries: mockInvalidateQueries,
        });
        useMutation.mockReturnValue({
            mutateAsync: mockMutateAsync,
        });

        vi.clearAllMocks();
    });

    it('should handle profile update success', async () => {
        useMutation.mockImplementation(({ onSuccess }) => ({
            mutateAsync: async () => {
                await updateUser();
                onSuccess(); 
            },
        }));

        const { result } = renderHook(() => useUpdateProfile());

        const userData = { username: 'newusername', email: 'newemail@example.com' };

        await act(async () => {
            await result.current.mutateAsync(userData);
        });

        expect(mockInvalidateQueries).toHaveBeenCalledWith(['profile']);

        expect(mockToast).toHaveBeenCalledWith({
            title: 'Perfil completado',
            description: 'Tu perfil ha sido actualizado con éxito.',
            variant: 'success',
        });
    });

    it('should handle profile update error', async () => {
        useMutation.mockImplementation(({ onError }) => ({
            mutateAsync: async () => {
                try {
                    throw new Error('Error durante el perfil');
                } catch (error) {
                    onError(error);
                }
            },
        }));

        const { result } = renderHook(() => useUpdateProfile());

        const userData = { username: 'newusername', email: 'newemail@example.com' };

        await act(async () => {
            await result.current.mutateAsync(userData);
        });

        expect(mockToast).toHaveBeenCalledWith({
            title: 'Error',
            description: 'Hubo un error al completar tu perfil. Por favor, intenta de nuevo.',
            variant: 'destructive',
        });

        expect(mockInvalidateQueries).not.toHaveBeenCalled();
    });
});
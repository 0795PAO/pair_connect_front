/* eslint-disable no-unused-vars */
import { renderHook, waitFor } from '@testing-library/react';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';
import { refreshToken } from '@/services/authService';
import { ACCESS_TOKEN } from '@/config/constants';
import { jwtDecode } from 'jwt-decode';
import { vi, describe, it, beforeEach, expect } from 'vitest';

vi.mock('@/services/authService', () => ({
    refreshToken: vi.fn(),
}));
vi.mock('jwt-decode', () => ({
    jwtDecode: vi.fn(),
}));

describe('useTokenRefresh', () => {
    let setIsAuthenticated;

    beforeEach(() => {
        setIsAuthenticated = vi.fn();
        localStorage.clear();
        vi.clearAllMocks();
    });


    it('should set isAuthenticated to true if token is valid', async () => {
        const mockToken = 'valid_token';
        const mockDecodedToken = { exp: Date.now() / 1000 + 3600 };
        localStorage.setItem(ACCESS_TOKEN, mockToken);

        jwtDecode.mockReturnValue(mockDecodedToken);

        const { result } = renderHook(() => useTokenRefresh(true, setIsAuthenticated));

        await waitFor(() => {
            expect(setIsAuthenticated).toHaveBeenCalledWith(true);
        });
    });

    it('should refresh token if token is expired and set isAuthenticated to true', async () => {
        const mockToken = 'expired_token';
        const mockDecodedToken = { exp: Date.now() / 1000 - 3600 };
        localStorage.setItem(ACCESS_TOKEN, mockToken);

        jwtDecode.mockReturnValue(mockDecodedToken);
        refreshToken.mockResolvedValueOnce('new_token');

        const { result } = renderHook(() => useTokenRefresh(true, setIsAuthenticated));
        await waitFor(() => {
            expect(refreshToken).toHaveBeenCalled();
            expect(setIsAuthenticated).toHaveBeenCalledWith(true);
        });
    });

    it('should set isAuthenticated to false if token is expired and refresh fails', async () => {
        const mockToken = 'expired_token';
        const mockDecodedToken = { exp: Date.now() / 1000 - 3600 };
        localStorage.setItem(ACCESS_TOKEN, mockToken);
        jwtDecode.mockReturnValue(mockDecodedToken);
        refreshToken.mockRejectedValueOnce(new Error('Refresh failed'));

        const { result } = renderHook(() => useTokenRefresh(true, setIsAuthenticated));
        await waitFor(() => {
            expect(refreshToken).toHaveBeenCalled();
            expect(setIsAuthenticated).toHaveBeenCalledWith(false);
        });
    });
});
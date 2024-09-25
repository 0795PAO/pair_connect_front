import { login, logout, refreshToken, registerUser } from '@/services/authService';
import { AUTH_URLS } from '@/config/apiUrls';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/constants';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import api from '@/config/apiInterceptor';

vi.mock('@/config/apiInterceptor', () => ({
    default: {
        post: vi.fn(), 
    }
}));

describe('authService - login', () => {
    beforeEach(() => {
        vi.clearAllMocks();  
    });
    beforeEach(() => {
        vi.spyOn(Storage.prototype, 'setItem');
        vi.spyOn(Storage.prototype, 'getItem');
    });

    it('should login successfully and store tokens', async () => {
        const mockResponse = { data: { access: 'access_token', refresh: 'refresh_token' } };
        const mockUser = { username: 'test', password: 'password' };

        api.post.mockResolvedValueOnce(mockResponse);

        const result = await login(mockUser);

        expect(localStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN, 'access_token');
        expect(localStorage.setItem).toHaveBeenCalledWith(REFRESH_TOKEN, 'refresh_token');

        expect(result).toEqual(mockResponse.data);
        expect(api.post).toHaveBeenCalledWith(AUTH_URLS.LOGIN, mockUser);
    });

    it('should throw error on failed login', async () => {
        const mockError = new Error('Login failed');
        const mockUser = { username: 'test', password: 'password' };

        api.post.mockRejectedValueOnce(mockError);

        await expect(login(mockUser)).rejects.toThrow('Login failed');
    });
});


describe('authService - logout', () => {
    beforeEach(() => {
        vi.clearAllMocks();  
    });
    beforeEach(() => {
        vi.spyOn(Storage.prototype, 'removeItem');
    });

    it('should logout successfully and remove tokens', async () => {
        const mockResponse = { data: {} };

        api.post.mockResolvedValueOnce(mockResponse);

        const result = await logout();

        expect(localStorage.removeItem).toHaveBeenCalledWith(ACCESS_TOKEN);
        expect(localStorage.removeItem).toHaveBeenCalledWith(REFRESH_TOKEN);

        expect(result).toEqual(mockResponse.data);
        expect(api.post).toHaveBeenCalledWith(AUTH_URLS.LOGOUT, undefined);
    });

    it.skip('should throw error on failed logout', async () => {
        const mockError = new Error('Logout failed');

        api.post.mockRejectedValueOnce(mockError);

        await expect(logout()).rejects.toThrow('Logout failed');
    });

    it('should refresh token successfully and store new access token', async () => {
        const mockResponse = { data: { access: 'new_access_token' } };
    
        localStorage.getItem.mockReturnValue('refresh_token_value');
        api.post.mockResolvedValueOnce({ status: 200, data: mockResponse.data });
        const result = await refreshToken();
        expect(localStorage.getItem).toHaveBeenCalledWith(REFRESH_TOKEN);
        expect(api.post).toHaveBeenCalledWith(AUTH_URLS.REFRESH, { refresh: 'refresh_token_value' });
        expect(localStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN, 'new_access_token');
        expect(result).toEqual('new_access_token');
    });
    
    it('should return null when API response status is not 200', async () => {
        const mockResponse = { status: 400, data: {} };
    
        localStorage.getItem.mockReturnValue('refresh_token_value');
        api.post.mockResolvedValueOnce(mockResponse);
    
        const result = await refreshToken();
    
        expect(result).toBeNull();
    });
    
    it('should refresh token successfully and store new access token', async () => {
        const mockResponse = { data: { access: 'new_access_token' } };
    
        localStorage.getItem.mockReturnValue('refresh_token_value');
        api.post.mockResolvedValueOnce({ status: 200, data: mockResponse.data });
        const result = await refreshToken();
        expect(localStorage.getItem).toHaveBeenCalledWith(REFRESH_TOKEN);
        expect(api.post).toHaveBeenCalledWith(AUTH_URLS.REFRESH, { refresh: 'refresh_token_value' });
        expect(localStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN, 'new_access_token');
        expect(result).toEqual('new_access_token');
    });
    
    it('should return null when API response status is not 200', async () => {
        const mockResponse = { status: 400, data: {} };
    
        localStorage.getItem.mockReturnValue('refresh_token_value');
        api.post.mockResolvedValueOnce(mockResponse);
    
        const result = await refreshToken();
    
        expect(result).toBeNull();
    });
    
    it('should throw an error on failed token refresh', async () => {
        api.post.mockRejectedValueOnce(new Error('Failed to refresh token'));
    
        await expect(refreshToken()).rejects.toThrow('Failed to refresh token');
    });
});




describe('authService - registerUser', () => {
    beforeEach(() => {
        vi.clearAllMocks();  
    });

    it('should register user successfully and return response', async () => {
        const mockResponse = { data: { id: 1, username: 'newuser' } };
        const mockUser = { username: 'newuser', password: 'password123' };

        api.post.mockResolvedValueOnce(mockResponse);

        const result = await registerUser(mockUser);

        expect(api.post).toHaveBeenCalledWith(AUTH_URLS.REGISTER, mockUser);

        expect(result).toEqual(mockResponse);
    });

    it('should throw an error on failed registration', async () => {
        const mockError = new Error('Registration failed');
        const mockUser = { username: 'newuser', password: 'password123' };

        api.post.mockRejectedValueOnce(mockError);

        await expect(registerUser(mockUser)).rejects.toThrow('Registration failed');
    });
});





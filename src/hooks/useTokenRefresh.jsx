import { useEffect } from 'react';
import { refreshToken } from '@/services/authService';
import { ACCESS_TOKEN } from '@/config/constants';
import { jwtDecode } from 'jwt-decode';

export const useTokenRefresh = (setIsAuthenticated) => {
    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            console.log(token)
            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            const decoded = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration && tokenExpiration < now) {
                try {
                    await refreshToken();
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Error refreshing token', error);
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(true);
            }
        };

        auth();
    }, [setIsAuthenticated]);
};
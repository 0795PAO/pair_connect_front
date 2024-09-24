import { useContext } from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthProvider } from '@/context/AuthContext';
import { AuthContext } from '@/context/AuthContext';


describe('AuthProvider', () => {
    it('renders AuthProvider and children', () => {
        render(
            <AuthProvider>
                <div>Test Child</div>
            </AuthProvider>
        );

        expect(screen.getByText(/Test Child/i)).toBeInTheDocument();
    });

    it('should update isAuthenticated when setIsAuthenticated is called', () => {
        const TestComponent = () => {
            const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
            return (
                <div>
                    <p>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
                    <button onClick={() => setIsAuthenticated(true)}>Log In</button>
                </div>
            );
        };

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByText(/Not Authenticated/i)).toBeInTheDocument();

        act(() => {
            fireEvent.click(screen.getByText(/Log In/i));
        });

        expect(screen.getByText(/Authenticated/i)).toBeInTheDocument();
    });

    it('should have initial isAuthenticated state as false', () => {
        let contextValue;
        const TestComponent = () => {
            contextValue = useContext(AuthContext);
            return null;
        };
    
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
    
        expect(contextValue.isAuthenticated).toBe(false);
    });
});

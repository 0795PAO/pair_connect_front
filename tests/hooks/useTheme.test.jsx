import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { ThemeProvider } from '@/context/ThemeContext';
import { useTheme } from '@/hooks/useTheme';



beforeAll(() => {
    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false,
            addListener: () => { },
            removeListener: () => { }
        };
    };
});

describe('useTheme', () => {
    it('should toggle theme between light and dark', () => {
        const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current.theme).toBe('system');

        act(() => {
            result.current.setTheme('dark');
        });


        expect(result.current.theme).toBe('dark');

        act(() => {
            result.current.setTheme('light');
        });

        expect(result.current.theme).toBe('light');
    });
});
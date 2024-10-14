import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { ThemeProvider } from '@/context/ThemeContext';

beforeAll(() => {
    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false,
            addListener: () => { },
            removeListener: () => { }
        };
    };
});


describe('ThemeProvider', () => {
    it('renders ThemeProvider and children', () => {
        render(
            <ThemeProvider>
                <div>Test Child</div>
            </ThemeProvider>
        );

        expect(screen.getByText(/Test Child/i)).toBeInTheDocument();
    });
});

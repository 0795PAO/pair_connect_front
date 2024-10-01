import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SessionList, { simulatedSessions } from '@/components/session/SessionList';

describe('SessionList', () => {
    it('renders session list with correct dates', async () => {
        render(<SessionList />);

        const uniqueDates = Array.from(new Set(simulatedSessions.map((session) => {
            const date = new Date(session.date);
            return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        })));

        for (const date of uniqueDates) {
            expect(await screen.findByText(date)).toBeInTheDocument();
        }
    });

    it('renders correct number of session cards', async () => {
        render(<SessionList />);

        const sessionCards = await screen.findAllByTestId('session-card');
        expect(sessionCards).toHaveLength(simulatedSessions.length);
    });

    it('renders session details correctly', async () => {
        render(<SessionList />);
    
        const sessionCards = await screen.findAllByText((content) => content.includes('Kamakura Food'));
        expect(sessionCards.length).toBeGreaterThan(0);
    });
});

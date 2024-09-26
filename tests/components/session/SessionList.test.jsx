import { render, screen, within } from '@testing-library/react';
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

        const sessionCards = screen.getAllByText('Desarrollar App de Pair Programming');
        expect(sessionCards).toHaveLength(2);

        sessionCards.forEach((card) => {
            const sessionCard = card.closest('.card-session');
            const sessionCardContent = within(sessionCard);

            const session = simulatedSessions.find(
                s => s.title === 'Desarrollar App de Pair Programming' && 
                s.owner.username === sessionCardContent.getByText(/italianCookieMonster|Dpoetess/).textContent
            );

            expect(sessionCardContent.getByText(session.owner.username)).toBeInTheDocument();
            expect(sessionCardContent.getByText(session.technologies.join(', '))).toBeInTheDocument();
            expect(sessionCardContent.getByText(session.description)).toBeInTheDocument();
        });
    });
});

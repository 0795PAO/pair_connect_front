import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SessionList from "@/components/session/SessionList";
import { formatDate } from "@/utils/formaDateAndTime";

describe("SessionList", () => {
  const mockSessions = [
    {
      id: 1,
      schedule_date_time: "2024-12-25T10:00:00Z",
      title: "Kamakura Food",
    },
    {
      id: 2,
      schedule_date_time: "2024-12-25T12:00:00Z",
      title: "Osaka Cooking",
    },
    {
      id: 3,
      schedule_date_time: "2024-12-26T14:00:00Z",
      title: "Tokyo Sushi",
    },
  ];

  const mockProjectImageUrl = "https://example.com/project.jpg";
  const currentPage = 1;

  it("renders session list with correct dates", async () => {
    render(
      <MemoryRouter>
        {" "}
        <SessionList
          sessions={mockSessions}
          loading={false}
          error={null}
          projectImageUrl={mockProjectImageUrl}
          currentPage={currentPage}
          to="/sessions/"
        />
      </MemoryRouter>
    );

    const uniqueDates = Array.from(
      new Set(
        mockSessions.map((session) => {
          return formatDate(session.schedule_date_time);
        })
      )
    );

    for (const date of uniqueDates) {
      expect(await screen.findByText(date)).toBeInTheDocument();
    }
  });

  it("renders correct number of session cards based on the page", async () => {
    render(
      <MemoryRouter>
        {" "}
        <SessionList
          sessions={mockSessions}
          loading={false}
          error={null}
          projectImageUrl={mockProjectImageUrl}
          currentPage={currentPage}
          to="/sessions/"
        />
      </MemoryRouter>
    );

    const filteredSessions = mockSessions.slice(0, 5);

    const sessionCards = await screen.findAllByTestId("session-card");
    expect(sessionCards).toHaveLength(filteredSessions.length);
  });

  it("renders session details correctly", async () => {
    render(
      <MemoryRouter>
        <SessionList
          sessions={mockSessions}
          loading={false}
          error={null}
          projectImageUrl={mockProjectImageUrl}
          currentPage={currentPage}
          to="/sessions/"
        />
      </MemoryRouter>
    );

    const sessionCards = await screen.findAllByText((content, element) => {
      return element?.textContent.includes("Kamakura Food");
    });

    expect(sessionCards.length).toBeGreaterThan(0);
  });
});

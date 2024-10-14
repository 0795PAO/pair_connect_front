import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomePage from "@/pages/HomePage";
import { useRegister } from "@/hooks/useRegister";
import { useAllSessions } from "@/hooks/useAllSessions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HeroSection from "@/components/landing/HeroSection";

vi.mock("@/hooks/useRegister", () => ({
  useRegister: vi.fn(),
}));

vi.mock("@/hooks/useAllSessions", () => ({
  useAllSessions: vi.fn(),
}));

vi.mock("@/components/landing/HeroSection", () => ({
  __esModule: true,
  default: vi.fn(),
}));


const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("HomePage", () => {
  const mockSessions = [
    {
      id: 1,
      project_name: "Project 1",
      schedule_date_time: "2024-10-14T15:30:00",
    },
    {
      id: 2,
      project_name: "Project 2",
      schedule_date_time: "2024-10-15T16:30:00",
    },
  ];

  const mockHandleRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useRegister.mockReturnValue({
      handleRegister: mockHandleRegister,
      loading: false,
      showSuccessModal: false,
      setShowSuccessModal: vi.fn(),
    });

    useAllSessions.mockReturnValue({
      data: mockSessions,
      error: null,
      loading: false,
    });

    HeroSection.mockImplementation(({ handleRegisterClick, onArrowClick }) => (
      <div data-testid="hero-section">
        <button onClick={handleRegisterClick}>Open Register Dialog</button>
        <button onClick={onArrowClick}>Scroll to Sessions</button>
      </div>
    ));
  });

  const renderHomePage = () =>
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <HomePage />
      </QueryClientProvider>
    );

  it("renders the HomePage correctly", () => {
    renderHomePage();

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByText(/Sesiones programadas:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Regístrate/i })
    ).toBeInTheDocument();
  });

});

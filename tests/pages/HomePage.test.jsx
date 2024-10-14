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

// Crear un cliente para las pruebas
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Evita reintentos en caso de error
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

  it.skip("renders session list when data is available", async () => {
    renderHomePage();

    // Verificamos si el texto del primer proyecto está presente usando una expresión regular
    const sessionCard = await screen.findByText(/project 1/i, { exact: false });
    expect(sessionCard).toBeInTheDocument();
  });
  it("opens the registration dialog when the register button is clicked", async () => {
    renderHomePage();

    // Encontrar el botón de registro y hacer clic en él
    const registerButton = screen.getByRole("button", { name: /Regístrate/i });
    fireEvent.click(registerButton);

    // Esperar a que el diálogo esté en el documento
    await waitFor(() => {
      // Verificar si el diálogo está en el DOM
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it.skip("scrolls to the session list when the arrow button is clicked", () => {
    const scrollIntoViewMock = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    renderHomePage();

    const scrollButton = screen.getByText(/Scroll to Sessions/i);
    fireEvent.click(scrollButton);

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  it.skip("calls handleRegister when submitting the register dialog", async () => {
    renderHomePage();

    const registerButton = screen.getByRole("button", { name: /Regístrate/i });
    fireEvent.click(registerButton);

    fireEvent.click(screen.getByText(/Open Register Dialog/i));

    await waitFor(() => {
      expect(mockHandleRegister).toHaveBeenCalled();
    });
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EventCalendar } from "@/components/shared/EventCalendar";
import { parse } from "date-fns";

vi.mock("@/utils/generateTimeOptions", () => ({
  generateTimeOptions: vi.fn(() => ["08:00", "09:00", "15:30"]),
}));

describe("EventCalendar Component", () => {
  const mockSetSelectedDate = vi.fn();
  const mockSetSelectedTime = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the calendar and input fields correctly", () => {
    render(
      <EventCalendar
        selectedDate="14/10/2024"
        setSelectedDate={mockSetSelectedDate}
        selectedTime=""
        setSelectedTime={mockSetSelectedTime}
      />
    );

    const dateInput = screen.getByPlaceholderText("dd/mm/yyyy");
    expect(dateInput).toBeInTheDocument();

    expect(screen.getByText("octubre 2024")).toBeInTheDocument();

    const timeSelect = screen.getByRole("combobox");
    expect(timeSelect).toBeInTheDocument();
  });

  it("should allow the user to input and change the date", () => {
    render(
      <EventCalendar
        selectedDate="14/10/2024"
        setSelectedDate={mockSetSelectedDate}
        selectedTime=""
        setSelectedTime={mockSetSelectedTime}
      />
    );

    const dateInput = screen.getByPlaceholderText("dd/mm/yyyy");

    fireEvent.change(dateInput, { target: { value: "25/12/2023" } });

    expect(mockSetSelectedDate).toHaveBeenCalledWith("25/12/2023");
  });

  it.skip("should update the selected date when a date is picked from the calendar", async () => {
    render(
      <EventCalendar
        selectedDate="14/10/2024"
        setSelectedDate={mockSetSelectedDate}
        selectedTime=""
        setSelectedTime={mockSetSelectedTime}
      />
    );

    const selectedDate = parse("14/10/2024", "dd/MM/yyyy", new Date());
    const dayToSelect = selectedDate.getDate().toString();

    const dayElement = screen.getByText(dayToSelect);
    fireEvent.click(dayElement);

    await waitFor(() => {
      expect(mockSetSelectedDate).toHaveBeenCalledWith("14/10/2024");
    });
  });

  it.skip("should allow the user to select a time from the dropdown", async () => {
    render(
      <EventCalendar
        selectedDate="14/10/2024"
        setSelectedDate={mockSetSelectedDate}
        selectedTime=""
        setSelectedTime={mockSetSelectedTime}
      />
    );

    const timeSelectTrigger = screen.getByRole("combobox");

    fireEvent.click(timeSelectTrigger);

    const timeOption = await screen.findByRole("option", { name: "15:30" });

    fireEvent.click(timeOption);

    await waitFor(() => {
      expect(mockSetSelectedTime).toHaveBeenCalledWith("15:30");
    });
  });

  it("should handle invalid date input", () => {
    render(
      <EventCalendar
        selectedDate=""
        setSelectedDate={mockSetSelectedDate}
        selectedTime=""
        setSelectedTime={mockSetSelectedTime}
      />
    );

    const dateInput = screen.getByPlaceholderText("dd/mm/yyyy");

    // Ingresar una fecha inválida
    fireEvent.change(dateInput, { target: { value: "invalid-date" } });

    // Asegurarse de que no se actualizó la fecha
    expect(mockSetSelectedDate).not.toHaveBeenCalled();
  });
});

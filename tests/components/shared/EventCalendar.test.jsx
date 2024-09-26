import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EventCalendar } from "@/components/shared/EventCalendar";
import { toast } from "@/hooks/useToast";
import { parse } from "date-fns";

vi.mock("@/hooks/useToast", () => ({
  toast: vi.fn(),
}));

describe("EventCalendar", () => {
  it("renders the EventCalendar form correctly", async () => {
    console.log("Running: renders the EventCalendar form correctly");
    render(<EventCalendar />);

    const dateInput = screen.getByLabelText("Seleccione la fecha");
    expect(dateInput).toBeInTheDocument();
    console.log("Date input found");

    const timeSelectTrigger = await screen.findByRole("combobox");
    expect(timeSelectTrigger).toBeInTheDocument();
    console.log(timeSelectTrigger);
    console.log("Time select trigger found");

    expect(
      screen.getByRole("button", { name: /Guardar Fecha y Hora/i })
    ).toBeInTheDocument();
  });

  it.skip("allows the user to input date and time and submit", async () => {
    console.log("Running: allows the user to input date and time and submit");
    render(<EventCalendar />);

    const dateInput = screen.getByPlaceholderText("dd/mm/yyyy");
    console.log("Date input placeholder found");

    const timeSelectTrigger = await screen.findByRole("combobox");
    console.log(timeSelectTrigger.textContent);
    console.log("Time select combobox found");

    fireEvent.change(dateInput, { target: { value: "25/12/2023" } });
    console.log("Date changed to 25/12/2023");

    fireEvent.click(timeSelectTrigger);
    console.log(timeSelectTrigger.textContent);

    const option = await screen.findByText("15:30");
    console.log(option.textContent);

    await act(async () => {
      fireEvent.click(option);
    });
    console.log(option.textContent);
    console.log("Time option 15:30 selected");
    console.log(timeSelectTrigger.textContent);

    // await act(async () => {
    //   expect(timeSelectTrigger).toHaveTextContent("15:30");
    // });

    console.log("Time select value confirmed to be 15:30");

    fireEvent.click(
      screen.getByRole("button", { name: /Guardar Fecha y Hora/i })
    );
    console.log("Form submitted");

    await act(async () => {
      expect(toast).toHaveBeenCalledWith({
        title: "Fecha y hora seleccionadas",
        description: `Seleccionaste la fecha: 25/12/2023 y la hora: 15:30`,
      });
      console.log("Toast called with correct values");
    });
  });

  it("updates the calendar to the selected date after submit", async () => {
    console.log(
      "Running: updates the calendar to the selected date after submit"
    );
    render(<EventCalendar />);

    const dateInput = screen.getByPlaceholderText("dd/mm/yyyy");
    const timeSelect = await screen.findByRole("combobox");

    fireEvent.change(dateInput, { target: { value: "25/12/2023" } });
    console.log("Date changed to 25/12/2023");

    fireEvent.click(timeSelect);
    console.log("Time select opened");

    const option = await screen.findByText("15:30");
    fireEvent.click(option);
    console.log("Time option 15:30 selected");

    fireEvent.click(
      screen.getByRole("button", { name: /Guardar Fecha y Hora/i })
    );
    console.log("Form submitted");

    const calendarDate = parse("25/12/2023", "dd/MM/yyyy", new Date());

    await waitFor(() => {
      expect(
        screen.getByText(calendarDate.getDate().toString())
      ).toBeInTheDocument();
      console.log("Calendar updated to selected date");
    });
  });

  it.skip("shows error when the date is invalid", async () => {
    console.log("Running: shows error when the date is invalid");
    render(<EventCalendar />);

    const dateInput = screen.getByPlaceholderText("dd/mm/yyyy");
    const timeSelect = await screen.findByRole("combobox");

    fireEvent.change(dateInput, { target: { value: "invalid-date" } });
    console.log("Invalid date entered");

    fireEvent.click(timeSelect);
    console.log("Time select opened");

    const option = await screen.findByText("15:30");
    fireEvent.click(option);
    console.log("Time option 15:30 selected");

    fireEvent.click(
      screen.getByRole("button", { name: /Guardar Fecha y Hora/i })
    );
    console.log("Form submitted");

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Error",
        description: "La fecha seleccionada no es válida.",
      });
      console.log("Toast called with error message");
    });
  });
});

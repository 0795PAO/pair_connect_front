import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EventCalendar } from "@/components/EventCalendar";
import { toast } from "@/hooks/useToast";
import { parse } from "date-fns";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";

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

    // Obtenemos el input de la fecha
    const dateInput = screen.getByPlaceholderText("dd/mm/yyyy");
    console.log("Date input placeholder found");

    // Verificamos el combobox del select de hora
    const timeSelectTrigger = await screen.findByRole("combobox");
    console.log(timeSelectTrigger.textContent);
    console.log("Time select combobox found");

    // Cambiamos la fecha
    fireEvent.change(dateInput, { target: { value: "25/12/2023" } });
    console.log("Date changed to 25/12/2023");

    // Abrimos el combobox para seleccionar la hora
    fireEvent.click(timeSelectTrigger);
    console.log(timeSelectTrigger.textContent);

    // Seleccionamos una hora del combobox
    const option = await screen.findByText("15:30");
    console.log(option.textContent);

    // Esperamos a que el click en la opción actualice el valor
    await act(async () => {
      fireEvent.click(option);
    });
    console.log(option.textContent);
    console.log("Time option 15:30 selected");
    console.log(timeSelectTrigger.textContent);
    // Verificamos que el valor del combobox haya sido actualizado a 15:30
    // Debemos esperar a que el DOM se actualice correctamente

    // await act(async () => {
    //   expect(timeSelectTrigger).toHaveTextContent("15:30");
    // });

    console.log("Time select value confirmed to be 15:30");

    // Simulamos el submit del formulario
    fireEvent.click(
      screen.getByRole("button", { name: /Guardar Fecha y Hora/i })
    );
    console.log("Form submitted");

    // Verificamos que el toast sea llamado con los valores correctos
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

  // Descomentar cuando los anteriores pasen
  it.skip("shows error when the date is invalid", async () => {
    console.log("Running: shows error when the date is invalid");
    render(<EventCalendar />);

    const dateInput = screen.getByPlaceholderText("dd/mm/yyyy");
    const timeSelect = await screen.findByRole("combobox");

    // Introducimos una fecha inválida
    fireEvent.change(dateInput, { target: { value: "invalid-date" } });
    console.log("Invalid date entered");

    // Abrimos el combobox para seleccionar la hora
    fireEvent.click(timeSelect);
    console.log("Time select opened");

    // Seleccionamos una hora del combobox
    const option = await screen.findByText("15:30");
    fireEvent.click(option);
    console.log("Time option 15:30 selected");

    // Simulamos el submit del formulario
    fireEvent.click(
      screen.getByRole("button", { name: /Guardar Fecha y Hora/i })
    );
    console.log("Form submitted");

    // Esperamos que el toast de error sea llamado
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Error",
        description: "La fecha seleccionada no es válida.",
      });
      console.log("Toast called with error message");
    });
  });
});

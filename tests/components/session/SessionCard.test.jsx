import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import SessionCard from "@/components/session/SessionCard";

describe("SessionCard", () => {
  const mockSession = {
    schedule_date_time: "2024-10-14T15:30:00",
    project_name: "Project Kamakura",
    owner_name: "John Doe",
    owner_avatar_url: "/avatar.jpg",
    language_names: ["JavaScript", "Python"],
    description: "This is a mock session for testing.",
    status: "enrolled",
    project_image_url: "/project-image.jpg",
  };

  it("renders session date and time correctly", () => {
    render(
      <MemoryRouter>
        <SessionCard session={mockSession} to="/session/1" />
      </MemoryRouter>
    );

    const dateRegex = /14\sde\s(octubre|oct)\sde\s2024/i;
    expect(screen.getByText(dateRegex)).toBeInTheDocument();

    const timeRegex = /15:30/i;
    expect(screen.getByText(timeRegex)).toBeInTheDocument();
  });

  it("renders session project name correctly", () => {
    render(
      <MemoryRouter>
        <SessionCard session={mockSession} to="/session/1" />
      </MemoryRouter>
    );

    expect(screen.getByText("Project Kamakura")).toBeInTheDocument();
  });

  it("renders owner name and avatar correctly", () => {
    render(
      <MemoryRouter>
        <SessionCard session={mockSession} to="/session/1" />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    const avatarImage = screen.getByAltText("John Doe's avatar");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute("src", "/avatar.jpg");
  });

  it("renders session languages correctly", () => {
    render(
      <MemoryRouter>
        <SessionCard session={mockSession} to="/session/1" />
      </MemoryRouter>
    );

    expect(screen.getByText("JavaScript, Python")).toBeInTheDocument();
  });

  it("renders session description correctly", () => {
    render(
      <MemoryRouter>
        <SessionCard session={mockSession} to="/session/1" />
      </MemoryRouter>
    );

    expect(
      screen.getByText("This is a mock session for testing.")
    ).toBeInTheDocument();
  });

  it("renders project image correctly", () => {
    render(
      <MemoryRouter>
        <SessionCard session={mockSession} to="/session/1" />
      </MemoryRouter>
    );

    const projectImage = screen.getByAltText("Imagen del proyecto");
    expect(projectImage).toBeInTheDocument();
    expect(projectImage).toHaveAttribute("src", "/project-image.jpg");
  });

  it("renders session status icon correctly when enrolled", () => {
    render(
      <MemoryRouter>
        <SessionCard session={mockSession} to="/session/1" />
      </MemoryRouter>
    );

    const statusIcon = screen.getByAltText("Estado Inscrito");
    expect(statusIcon).toBeInTheDocument();
    expect(statusIcon).toHaveAttribute("src", "/icon_green.svg");
  });

  it("links to the correct session page", () => {
    render(
      <MemoryRouter>
        <SessionCard session={mockSession} to="/session/1" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/session/1");
  });
});

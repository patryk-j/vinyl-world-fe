import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavigationHeader from "./NavigationHeader.component";
import "@testing-library/jest-dom";

describe("Navigation Header Component", () => {
  it("Should render Navigation Header Component.", async () => {
    render(
      <MemoryRouter>
        <NavigationHeader />
      </MemoryRouter>
    );

    const NavigationHeaderComponent = await screen.findByTestId(
      "navigation-header"
    );
    expect(NavigationHeaderComponent).toBeInTheDocument();
  });

  it("Should render logo and link.", () => {
    render(
      <MemoryRouter>
        <NavigationHeader />
      </MemoryRouter>
    );

    const logoLink = screen.getByText("Vinyl World");
    expect(logoLink).toBeInTheDocument();
  });

  it("Should render the navigation items correctly for unlogged users.", () => {
    render(
      <MemoryRouter>
        <NavigationHeader />
      </MemoryRouter>
    );

    const homeNavItem = screen.getByText("Home");
    expect(homeNavItem).toBeInTheDocument();

    const rentalNavItem = screen.getByText("Rental");
    expect(rentalNavItem).toBeInTheDocument();
  });

  it("Should navigate to the home page when the logo is clicked.", () => {
    render(
      <MemoryRouter>
        <NavigationHeader />
      </MemoryRouter>
    );

    const element = screen.getByText("Vinyl World");
    fireEvent.click(element);

    expect(window.location.pathname).toBe("/");
  });

  it("Should render the Log in button when not authenticated.", () => {
    render(
      <MemoryRouter>
        <NavigationHeader />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: /log in/i });
    expect(loginButton).toBeInTheDocument();
  });
});

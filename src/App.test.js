import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const checkDefaultLoginPage = () => {
  expect(screen.getByText("React-Demo")).toBeInTheDocument();
  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/profile/i)).not.toBeInTheDocument();
  expect(screen.getByText("Email address")).toBeInTheDocument();
  expect(screen.getByText("Password")).toBeInTheDocument();
  expect(screen.getByText("Login")).toBeInTheDocument();
};

test("default landing page", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  checkDefaultLoginPage();
});

test("landing on a bad page render default landing page", () => {
  render(
    <MemoryRouter initialEntries={["/some/bad/route"]}>
      <App />
    </MemoryRouter>
  );
  checkDefaultLoginPage();
});

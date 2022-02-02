import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "./AuthForm";

test("Login click error", () => {
  render(<AuthForm />);
  expect(
    screen
      .queryByText("Please enter a valid email")
      .classList.contains("invalid-feedback")
  ).toBe(true);
  expect(
    screen
      .queryByText("Please enter a password")
      .classList.contains("invalid-feedback")
  ).toBe(true);

  const buttonLogin = screen.getByRole("button");
  userEvent.click(buttonLogin);

  expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
  expect(screen.getByText("Please enter a password")).toBeInTheDocument();
});

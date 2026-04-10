import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders boot welcome text", () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Добро пожаловать в ZetaTech/i);
  expect(welcomeElement).toBeInTheDocument();
});

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../components/Counter";
import "@testing-library/jest-dom";

describe("Counter", () => {
  test("increments count by 1 on button click", async () => {
    render(<Counter />);
    expect(screen.queryByText(/Count: 0/)).toBeInTheDocument();
    const button = screen.getByText("+");
    await userEvent.click(button);
    expect(screen.queryByText(/Count: 1/)).toBeInTheDocument();
  });
});

/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "../app/(dashboard)/[storeId]/(routes)/products/home";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
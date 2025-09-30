import { render, screen } from "@testing-library/react";
import Homepage from "../Homepage";
import { describe, it, expect } from "vitest";

describe("Homepage", () => {
  it("renders homepage headline", () => {
    render(<Homepage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});

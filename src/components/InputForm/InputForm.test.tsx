import { render, screen } from "@testing-library/react";
import { InputForm } from ".";
import { expect, vi } from "vitest";

describe("InputForm", () => {
  it("renders", () => {
    render(<InputForm setData={vi.fn()} />);
    expect(screen.getByLabelText(/Username/)).toBeVisible();
  });
  // TODO: More tests
});

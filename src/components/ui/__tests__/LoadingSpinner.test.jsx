import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner.jsx";

describe("LoadingSpinner", () => {
  it("renders with default message", () => {
    render(<LoadingSpinner />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    render(<LoadingSpinner message="Procesando..." />);
    expect(screen.getByText("Procesando...")).toBeInTheDocument();
  });

  it("renders without message when message is empty string", () => {
    render(<LoadingSpinner message="" />);
    expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
  });

  it("applies correct size classes", () => {
    const { container } = render(<LoadingSpinner size="small" />);
    const spinner = container.querySelector("div[style*='24px']");
    expect(spinner).toBeInTheDocument();
  });

  it("renders with large size", () => {
    const { container } = render(<LoadingSpinner size="large" />);
    const spinner = container.querySelector("div[style*='64px']");
    expect(spinner).toBeInTheDocument();
  });
});


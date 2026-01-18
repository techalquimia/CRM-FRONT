import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCard from "../StatCard.jsx";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Test Label" value="100" trend="+10%" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("+10%")).toBeInTheDocument();
  });

  it("applies positive trend class", () => {
    const { container } = render(
      <StatCard label="Test" value="100" trend="+10%" />
    );
    const trendElement = container.querySelector(".stat-trend.up");
    expect(trendElement).toBeInTheDocument();
  });

  it("applies negative trend class", () => {
    const { container } = render(
      <StatCard label="Test" value="100" trend="-5%" />
    );
    const trendElement = container.querySelector(".stat-trend.down");
    expect(trendElement).toBeInTheDocument();
  });

  it("renders with different values", () => {
    render(
      <StatCard label="Leads nuevos" value="128" trend="+12%" />
    );
    expect(screen.getByText("Leads nuevos")).toBeInTheDocument();
    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("+12%")).toBeInTheDocument();
  });
});


import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "../AuthContext.jsx";
import { authStorage } from "../../utils/storage.js";

// Mock storage
vi.mock("../../utils/storage.js", () => ({
  authStorage: {
    get: vi.fn(() => false),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

// Test component that uses auth context
const TestComponent = () => {
  const { isAuthenticated, login, logout, isLoading } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? "Authenticated" : "Not Authenticated"}
      </div>
      <div data-testid="loading-status">
        {isLoading ? "Loading" : "Not Loading"}
      </div>
      <button
        data-testid="login-btn"
        onClick={() => login("test@example.com", "password")}
      >
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authStorage.get.mockReturnValue(false);
  });

  it("provides initial authentication state", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "Not Authenticated"
    );
  });

  it("handles login successfully", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByTestId("login-btn");
    await user.click(loginButton);

    await waitFor(
      () => {
        expect(screen.getByTestId("auth-status")).toHaveTextContent(
          "Authenticated"
        );
      },
      { timeout: 2000 }
    );

    // Wait a bit more to ensure the async login completes
    await waitFor(
      () => {
        expect(authStorage.set).toHaveBeenCalledWith(true);
      },
      { timeout: 1500 }
    );
  });

  it("handles logout", async () => {
    const user = userEvent.setup();
    authStorage.get.mockReturnValue(true);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // First login
    const loginButton = screen.getByTestId("login-btn");
    await user.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Authenticated"
      );
    });

    // Then logout
    const logoutButton = screen.getByTestId("logout-btn");
    await user.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Not Authenticated"
      );
    });

    expect(authStorage.remove).toHaveBeenCalled();
  });

  it("shows loading state during login", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByTestId("login-btn");
    await user.click(loginButton);

    // Should show loading state briefly
    expect(screen.getByTestId("loading-status")).toHaveTextContent("Loading");
  });
});


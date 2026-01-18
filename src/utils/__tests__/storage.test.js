import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  authStorage,
} from "../storage.js";

// Mock logger to avoid console output in tests
vi.mock("../logger.js", () => ({
  logger: {
    error: vi.fn(),
  },
}));

describe("Storage utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getStorageItem", () => {
    it("returns default value when key does not exist", () => {
      const result = getStorageItem("nonExistentKey", "default");
      expect(result).toBe("default");
    });

    it("returns parsed value when key exists", () => {
      localStorage.setItem("testKey", JSON.stringify({ test: "value" }));
      const result = getStorageItem("testKey");
      expect(result).toEqual({ test: "value" });
    });

    it("handles invalid JSON gracefully", () => {
      localStorage.setItem("invalidKey", "invalid json{");
      const result = getStorageItem("invalidKey", "default");
      expect(result).toBe("default");
    });
  });

  describe("setStorageItem", () => {
    it("stores value in localStorage", () => {
      setStorageItem("testKey", { test: "value" });
      const stored = localStorage.getItem("testKey");
      expect(JSON.parse(stored)).toEqual({ test: "value" });
    });

    it("stores string values", () => {
      setStorageItem("stringKey", "test string");
      const stored = localStorage.getItem("stringKey");
      expect(JSON.parse(stored)).toBe("test string");
    });

    it("stores number values", () => {
      setStorageItem("numberKey", 42);
      const stored = localStorage.getItem("numberKey");
      expect(JSON.parse(stored)).toBe(42);
    });
  });

  describe("removeStorageItem", () => {
    it("removes item from localStorage", () => {
      localStorage.setItem("testKey", "value");
      removeStorageItem("testKey");
      expect(localStorage.getItem("testKey")).toBeNull();
    });
  });

  describe("authStorage", () => {
    it("gets auth value from storage", () => {
      authStorage.set(true);
      expect(authStorage.get()).toBe(true);
    });

    it("returns false when auth is not set", () => {
      expect(authStorage.get()).toBe(false);
    });

    it("sets auth value", () => {
      authStorage.set(true);
      const stored = localStorage.getItem("isAuthenticated");
      expect(JSON.parse(stored)).toBe(true);
    });

    it("removes auth value", () => {
      authStorage.set(true);
      authStorage.remove();
      expect(authStorage.get()).toBe(false);
    });
  });
});


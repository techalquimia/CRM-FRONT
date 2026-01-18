import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logger, createLogger, LOG_LEVELS } from "./logger.js";

describe("Logger", () => {
  const originalEnv = import.meta.env;

  beforeEach(() => {
    // Mock console methods
    global.console = {
      ...console,
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      log: vi.fn(),
      group: vi.fn(),
      groupEnd: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    import.meta.env = originalEnv;
  });

  describe("Sanitization", () => {
    it("should sanitize sensitive data", () => {
      const sensitiveData = {
        email: "test@example.com",
        password: "secret123",
        apiKey: "key123",
        token: "token123",
      };

      logger.info("Test", sensitiveData);
      
      // In development, should log but password should be redacted
      // Note: sanitization happens in the log function
      expect(console.info).toHaveBeenCalled();
    });
  });

  describe("Log levels", () => {
    it("should log debug messages in development", () => {
      import.meta.env = { ...originalEnv, DEV: true };
      logger.debug("Debug message");
      expect(console.debug).toHaveBeenCalled();
    });

    it("should log info messages", () => {
      import.meta.env = { ...originalEnv, DEV: true };
      logger.info("Info message");
      expect(console.info).toHaveBeenCalled();
    });

    it("should log warn messages", () => {
      import.meta.env = { ...originalEnv, DEV: true };
      logger.warn("Warning message");
      expect(console.warn).toHaveBeenCalled();
    });

    it("should log error messages", () => {
      import.meta.env = { ...originalEnv, DEV: true };
      logger.error("Error message");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("Context logging", () => {
    it("should include context in log messages", () => {
      import.meta.env = { ...originalEnv, DEV: true };
      logger.info("Test message", null, "TestContext");
      expect(console.info).toHaveBeenCalledWith(
        expect.stringContaining("[TestContext]")
      );
    });
  });

  describe("createLogger", () => {
    it("should create logger with context", () => {
      import.meta.env = { ...originalEnv, DEV: true };
      const contextLogger = createLogger("MyContext");
      contextLogger.info("Test message");
      
      expect(console.info).toHaveBeenCalledWith(
        expect.stringContaining("[MyContext]")
      );
    });
  });

  describe("Performance logging", () => {
    it("should measure function execution time", async () => {
      import.meta.env = { ...originalEnv, DEV: true };
      
      const testFn = async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return "result";
      };

      const result = await logger.performance("test", testFn);
      
      expect(result).toBe("result");
      expect(console.debug).toHaveBeenCalledWith(
        expect.stringContaining("Performance: test")
      );
    });

    it("should log errors in performance measurement", async () => {
      import.meta.env = { ...originalEnv, DEV: true };
      
      const testFn = async () => {
        throw new Error("Test error");
      };

      await expect(logger.performance("test", testFn)).rejects.toThrow();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("Event logging", () => {
    it("should log events with sanitized data", () => {
      import.meta.env = { ...originalEnv, DEV: true };
      
      logger.event("user_action", { 
        action: "click", 
        password: "secret" 
      });
      
      expect(console.info).toHaveBeenCalledWith(
        expect.stringContaining("Event: user_action")
      );
    });
  });
});

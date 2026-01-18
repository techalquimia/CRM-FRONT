# Guía de Testing

Este proyecto utiliza **Vitest** (compatible con Jest) y **React Testing Library** para testing.

## Configuración

- **Vitest**: Framework de testing rápido compatible con Jest API
- **React Testing Library**: Utilidades para testing de componentes React
- **jsdom**: Entorno DOM simulado para tests
- **@testing-library/jest-dom**: Matchers adicionales para DOM

## Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch (desarrollo)
npm test -- --watch

# Ejecutar tests una vez
npm test -- --run

# Ejecutar tests con UI
npm run test:ui

# Ejecutar tests con coverage
npm run test:coverage
```

## Estructura de Tests

Los tests se organizan en carpetas `__tests__` junto a los archivos que prueban:

```
src/
  components/
    ui/
      LoadingSpinner.jsx
      __tests__/
        LoadingSpinner.test.jsx
  utils/
    storage.js
    __tests__/
      storage.test.js
```

## Ejemplos de Tests

### Test de Componente Simple

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyComponent from "../MyComponent.jsx";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### Test con User Events

```jsx
import userEvent from "@testing-library/user-event";

it("handles button click", async () => {
  const user = userEvent.setup();
  render(<MyComponent />);
  
  const button = screen.getByRole("button");
  await user.click(button);
  
  expect(screen.getByText("Clicked")).toBeInTheDocument();
});
```

### Test de Context

```jsx
import { render, screen } from "@testing-library/react";
import { MyProvider } from "../MyContext.jsx";

it("provides context values", () => {
  render(
    <MyProvider>
      <TestComponent />
    </MyProvider>
  );
  
  expect(screen.getByText("Expected Value")).toBeInTheDocument();
});
```

### Test de Utilidades

```jsx
import { describe, it, expect, beforeEach } from "vitest";
import { myUtility } from "../myUtility.js";

describe("myUtility", () => {
  beforeEach(() => {
    // Setup antes de cada test
  });

  it("returns expected value", () => {
    const result = myUtility("input");
    expect(result).toBe("expected");
  });
});
```

## Mocks

### Mock de Módulos

```jsx
import { vi } from "vitest";

vi.mock("../utils/logger.js", () => ({
  logger: {
    error: vi.fn(),
  },
}));
```

### Mock de localStorage

```jsx
beforeEach(() => {
  localStorage.clear();
});
```

## Mejores Prácticas

1. **Nombres descriptivos**: Usa nombres claros para tests y describe blocks
2. **AAA Pattern**: Arrange, Act, Assert
3. **Test una cosa**: Cada test debe verificar un comportamiento específico
4. **Usa queries accesibles**: Prefiere `getByRole`, `getByLabelText` sobre `getByTestId`
5. **Limpia después de tests**: Usa `beforeEach`/`afterEach` para limpiar estado
6. **Mock solo lo necesario**: No mockees todo, solo dependencias externas

## Recursos

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about/)


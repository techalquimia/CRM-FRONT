# Sistema de Logging Condicional

Sistema avanzado de logging con niveles, contexto, sanitización de datos sensibles e integración preparada para servicios externos.

## Características

- ✅ **Logging condicional**: Solo en desarrollo por defecto
- ✅ **Niveles de log**: DEBUG, INFO, WARN, ERROR
- ✅ **Contexto**: Logs con contexto para mejor tracking
- ✅ **Sanitización**: Automáticamente redacta datos sensibles
- ✅ **Timestamps**: Todos los logs incluyen timestamp ISO
- ✅ **Performance tracking**: Mide tiempo de ejecución de funciones
- ✅ **Event logging**: Para analytics y tracking de eventos
- ✅ **Preparado para producción**: Integración lista para Sentry, LogRocket, etc.

## Uso Básico

```javascript
import { logger } from './utils/logger.js';

// Logging básico
logger.debug("Mensaje de debug");
logger.info("Información general");
logger.warn("Advertencia");
logger.error("Error", errorObject);

// Con contexto
logger.info("Usuario autenticado", { userId: 123 }, "AuthContext");

// Con datos (se sanitizan automáticamente)
logger.info("Login attempt", { 
  email: "user@example.com", 
  password: "secret123" // Se redacta automáticamente
});
```

## Logger con Contexto

```javascript
import { createLogger } from './utils/logger.js';

// Crear logger con contexto específico
const logger = createLogger("MyComponent");

// Todos los logs incluirán el contexto automáticamente
logger.info("Component mounted");
logger.error("Component error", error);
```

## Performance Logging

```javascript
// Medir tiempo de ejecución
const result = await logger.performance("fetchData", async () => {
  return await fetch('/api/data');
});

// En desarrollo, mostrará: "Performance: fetchData took 123.45ms"
```

## Event Logging

```javascript
// Para analytics y tracking
logger.event("button_click", {
  buttonId: "submit",
  page: "login"
});

logger.event("user_login", {
  success: true,
  method: "email"
});
```

## Logging Agrupado

```javascript
logger.group("User Actions", () => {
  logger.info("Action 1");
  logger.info("Action 2");
  logger.info("Action 3");
});
```

## Sanitización Automática

El logger automáticamente redacta campos sensibles:

- `password`
- `token`
- `apiKey` / `api_key`
- `secret`
- `authorization`
- `auth`
- `creditCard` / `credit_card`
- `ssn`

```javascript
logger.info("Data", {
  email: "user@example.com",
  password: "secret123" // Se convierte en "[REDACTED]"
});
```

## Niveles de Log

- **DEBUG** (0): Información detallada para debugging (solo desarrollo)
- **INFO** (1): Información general
- **WARN** (2): Advertencias que no rompen funcionalidad
- **ERROR** (3): Errores que necesitan atención
- **NONE** (4): No loguear nada

En desarrollo, el nivel por defecto es `DEBUG`.  
En producción, el nivel por defecto es `ERROR`.

## Integración con Servicios Externos

El logger está preparado para integrarse con servicios como Sentry, LogRocket, etc.

Para habilitar, descomenta y configura en `sendToExternalService`:

```javascript
// Ejemplo con Sentry
if (isProduction && window.Sentry) {
  if (level === 'ERROR') {
    window.Sentry.captureException(new Error(message), {
      extra: { data, context }
    });
  }
}
```

## Mejores Prácticas

1. **Usa contexto**: Siempre proporciona contexto para facilitar el debugging
2. **Sanitiza manualmente si es necesario**: Aunque el logger sanitiza automáticamente, sé consciente de qué datos logueas
3. **Usa niveles apropiados**: 
   - DEBUG para información detallada
   - INFO para eventos importantes
   - WARN para situaciones inesperadas pero manejables
   - ERROR para errores reales
4. **No loguees en loops**: Evita logging excesivo en loops o renders frecuentes
5. **Usa createLogger**: Para componentes/hooks, crea un logger con contexto

## Ejemplos de Uso en el Proyecto

### AuthContext
```javascript
import { createLogger } from "../utils/logger.js";

const logger = createLogger("AuthContext");

logger.info("Login attempt started");
logger.event("user_login", { success: true });
```

### useGoogleMaps Hook
```javascript
import { createLogger } from "../utils/logger.js";

const logger = createLogger("useGoogleMaps");

logger.debug("Google Maps API key validated");
logger.error("Google Maps script load error", error);
logger.event("map_loaded", { mapType, success: true });
```

### Error Boundaries
```javascript
import { logger } from "../utils/logger.js";

logger.error(
  `[${context}] Error capturado por ErrorBoundary:`,
  {
    error: error.toString(),
    errorId: this.state.errorId,
    componentStack: errorInfo.componentStack,
  },
  context
);
```

## Testing

El logger incluye tests en `src/utils/logger.test.js` que verifican:
- Sanitización de datos sensibles
- Niveles de log
- Contexto en mensajes
- Performance logging
- Event logging

Ejecuta los tests con:
```bash
npm test logger.test.js
```

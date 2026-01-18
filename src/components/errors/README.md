# Error Boundaries

Este directorio contiene los componentes de Error Boundaries utilizados en la aplicación para capturar y manejar errores de React de manera elegante.

## Componentes Disponibles

### ErrorBoundary (Base)
Componente base reutilizable que captura errores de React y muestra una UI de error amigable.

**Ubicación:** `src/components/ErrorBoundary.jsx`

**Props:**
- `children` (required): Componentes hijos a proteger
- `showDetails` (boolean): Mostrar detalles del error (default: false, auto en desarrollo)
- `context` (string): Nombre del contexto para mejor tracking de errores
- `title` (string): Título personalizado del error
- `message` (string): Mensaje personalizado del error
- `onError` (function): Callback cuando ocurre un error
- `onReset` (function): Callback personalizado para reset
- `resetLabel` (string): Etiqueta del botón de reset
- `allowRetry` (boolean): Permitir botón de "Intentar de nuevo"
- `fallback` (function): Componente fallback personalizado

**Ejemplo:**
```jsx
<ErrorBoundary 
  context="MiComponente"
  title="Error personalizado"
  allowRetry={true}
>
  <MiComponente />
</ErrorBoundary>
```

### MapErrorBoundary
Error Boundary especializado para componentes de mapas.

**Ubicación:** `src/components/errors/MapErrorBoundary.jsx`

**Características:**
- Mensaje específico para errores de mapas
- Permite retry automático
- Contexto: "Map Component"

**Ejemplo:**
```jsx
<MapErrorBoundary>
  <GoogleMapView />
</MapErrorBoundary>
```

### EvidenceErrorBoundary
Error Boundary especializado para componentes de evidencias.

**Ubicación:** `src/components/errors/EvidenceErrorBoundary.jsx`

**Características:**
- Mensaje específico para errores de evidencias
- Permite retry automático
- Contexto: "Evidence Component"

**Ejemplo:**
```jsx
<EvidenceErrorBoundary>
  <EvidenceCard evidence={evidence} />
</EvidenceErrorBoundary>
```

### PageErrorBoundary
Error Boundary especializado para páginas completas.

**Ubicación:** `src/components/errors/PageErrorBoundary.jsx`

**Props:**
- `children` (required): Componentes hijos a proteger
- `pageName` (string): Nombre de la página para mensajes personalizados

**Características:**
- Navegación automática al dashboard en caso de error
- Mensaje personalizado con el nombre de la página
- Permite retry automático

**Ejemplo:**
```jsx
<PageErrorBoundary pageName="Dashboard">
  <Dashboard />
</PageErrorBoundary>
```

## Arquitectura de Error Boundaries

La aplicación utiliza una estrategia de Error Boundaries en cascada:

1. **Nivel Global** (`main.jsx`): ErrorBoundary principal que captura todos los errores no manejados
2. **Nivel de Página**: PageErrorBoundary en cada página principal
3. **Nivel de Componente**: Error Boundaries específicos para componentes críticos (mapas, evidencias)

```
ErrorBoundary (Global)
  └── PageErrorBoundary (Dashboard)
      └── MapErrorBoundary (GoogleMapView)
```

## Integración con Logging

Todos los Error Boundaries están integrados con el sistema de logging (`src/utils/logger.js`):

- Los errores se registran automáticamente en desarrollo
- Cada error tiene un ID único para tracking
- Se incluye información del contexto, stack trace y component stack
- En producción, se puede integrar con servicios como Sentry, LogRocket, etc.

## Mejores Prácticas

1. **Usar Error Boundaries en puntos estratégicos**: No en cada componente, sino en puntos de fallo críticos
2. **Mensajes claros**: Proporcionar mensajes de error comprensibles para el usuario
3. **Opciones de recuperación**: Siempre ofrecer opciones de recuperación (retry, navegación, etc.)
4. **Logging apropiado**: Usar el contexto para facilitar el debugging
5. **Testing**: Probar los Error Boundaries con errores simulados

## Testing

Para probar los Error Boundaries, puedes crear un componente de prueba que lance errores:

```jsx
const TestErrorComponent = () => {
  throw new Error("Error de prueba");
  return <div>No debería renderizarse</div>;
};

// En tu componente
<ErrorBoundary>
  <TestErrorComponent />
</ErrorBoundary>
```

## Próximos Pasos

- [ ] Integración con servicio de error tracking (Sentry, etc.)
- [ ] Métricas de errores y alertas
- [ ] Error Boundaries para componentes específicos adicionales
- [ ] Tests automatizados para Error Boundaries

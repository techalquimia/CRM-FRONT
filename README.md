# CRM-FRONT

Sistema CRM con integración de Google Maps para visualización de unidades en ruta.

## Configuración de Google Maps API

### Solución al error "RefererNotAllowedMapError"

Si recibes el error `RefererNotAllowedMapError`, necesitas autorizar tu URL en Google Cloud Console:

1. **Accede a Google Cloud Console**
   - Ve a: https://console.cloud.google.com/google/maps-apis/credentials

2. **Selecciona tu API Key**
   - Haz clic en la API key que estás usando

3. **Configura las restricciones de aplicación**
   - En la sección "Restricciones de aplicación"
   - Selecciona "Sitios web HTTP (referrers)"
   - Agrega las siguientes URLs:
     ```
     http://localhost:8080/*
     http://localhost:5173/*
     http://localhost:3000/*
     ```
   - Para producción, agrega también tu dominio:
     ```
     https://tu-dominio.com/*
     ```

4. **Guarda los cambios**
   - Haz clic en "Guardar"
   - Espera unos minutos para que los cambios se propaguen

### Configuración de la API Key

1. **Obtén tu API Key**
   - Ve a: https://console.cloud.google.com/google/maps-apis
   - Crea un nuevo proyecto o selecciona uno existente
   - Habilita la API: **Maps JavaScript API**
   - Ve a "Credenciales" y crea una nueva API key

2. **Configura la variable de entorno**
   - Crea un archivo `.env` en la raíz del proyecto:
   ```
   VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
   ```

3. **Reconstruye la aplicación**
   ```bash
   npm run build
   ```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Construcción para producción

```bash
npm run build
```

## Testing

El proyecto utiliza **Vitest** (compatible con Jest) y **React Testing Library** para testing.

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests una vez
npm test -- --run

# Ejecutar tests con UI
npm run test:ui

# Ejecutar tests con cobertura
npm run test:coverage
```

Para más información sobre testing, consulta [src/test/README.md](src/test/README.md).

## Docker

```bash
# Construir la imagen
docker build -t crm-front .

# Ejecutar el contenedor
docker run -d -p 8080:80 --name crm-front-container crm-front
```
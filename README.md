# ISP Simulator

Simulador de aplicación móvil para proveedores de servicios de internet (ISP) desarrollado en React Native (Expo).

## Características Principales

- **Gestión de Cuentas:** Dashboard con información del usuario (Nombre, Plan Contratado).
- **Control de Estados:** Visualización en tiempo real del estado de la conexión (`ACTIVO` / `SUSPENDIDO`).
- **Simulador de Pagos:** Módulo integrado para simular el pago de facturas pendientes y la reactivación automática de la conexión.
- **Herramientas de Administración:** Opciones para los administradores que permiten "pasar el mes" y ver cómo el sistema evalúa a los deudores y suspende sus servicios de forma automática al detectar una factura impaga.

## Tecnologías

- [Expo](https://expo.dev) / React Native
- Expo Router para la navegación.
- Estado global manejado con `Zustand`
- Almacenamiento local persistente (`AsyncStorage`).

## Instalación y Uso

1. Instalar las dependencias en tu ordenador:
   ```bash
   npm install
   ```

2. Iniciar el servidor local:
   ```bash
   npx expo start
   ```

3. Instala la app **"Expo Go"** en tu teléfono (iOS/Android), con tu cámara escanea el código QR que se imprimió en la terminal para previsualizar la app directamente en tu dispositivo físico, o abre tu emulador de Android Studio (`npx expo start --android`).

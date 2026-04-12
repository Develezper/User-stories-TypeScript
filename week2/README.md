# Historia de Usuario: M5.4S2 - Autenticación, Gestión de Usuarios y Extensibilidad

## 📝 Descripción General
Esta historia de usuario abarca el desarrollo de un sistema de autenticación modular y un motor de gestión de datos (CRUD) utilizando **React** y **TypeScript**. El enfoque principal es la aplicación de patrones avanzados como la **Programación Orientada a Objetos (POO)** y el uso de **Decoradores** para automatizar la extensión de datos, garantizando un código limpio, desacoplado y profesional.

**Story Points:** 20  
**Estado:** Pendiente  
**Sprint:** M5.4S2

---

## 🎯 Objetivo de la Historia de Usuario
Como desarrollador frontend, quiero implementar un login modular, una clase con operaciones CRUD y un decorador para extender automáticamente los datos de usuario, de forma que el sistema sea organizado, escalable y fácil de mantener.

---

## 📂 Estructura de Archivos Propuesta
Para cumplir con los criterios de modularidad, el código debe organizarse de la siguiente manera:

- `src/interfaces/User.ts`: Contrato de datos del usuario.
- `src/data/users.ts`: Usuarios mock para pruebas.
- `src/utils/auth.ts`: Lógica de autenticación.
- `src/utils/UserStore.ts`: Clase con lógica de negocio (CRUD).
- `src/utils/decorators.ts`: Decoradores para inyección de metadatos.
- `src/components/Login.tsx`: Interfaz de usuario para autenticación.

---

## 📋 Tareas y Criterios de Aceptación (CA)

### TASK 1: Implementación de Login Modular
* **CA_01:** Definir interface `User` en un archivo independiente.
* **CA_02:** Crear un array de usuarios mock en `data/users.ts`.
* **CA_03:** Implementar función `authenticate` en un módulo independiente.
* **CA_04:** Validar credenciales importando el módulo en el componente Login.
* **CA_05:** Mostrar mensajes informativos de éxito o error al usuario.
* **CA_06:** Redirigir al usuario a la vista principal tras un login exitoso.

### TASK 2: Clase CRUD y Simulación HTTP
* **CA_07:** Implementar la clase `UserStore` en la carpeta `utils`.
* **CA_08:** Definir métodos: `list()`, `findByName()`, `create()`, `update()`, `remove()`.
* **CA_09:** Cada método debe emitir un log en consola simulando una llamada HTTP (GET, POST, PATCH, DELETE).
* **CA_10:** Las operaciones deben realizarse sobre el array de usuarios importado.

### TASK 3: Extensibilidad con Decoradores
* **CA_11:** Crear decorador de método en `utils/decorators.ts`.
* **CA_12:** Aplicar el decorador al método `create` dentro de `UserStore`.
* **CA_13:** El decorador debe agregar automáticamente las propiedades:
    * `role: "user"`
    * `createdAt: Date.now()`
* **CA_14:** Asegurar que el decorador no altere la funcionalidad original del método, solo enriquezca el objeto de entrada.

---

## 🛠️ Requerimientos Técnicos

### Requerimientos Funcionales (RF)
* **RF_01:** Login funcional con validación de datos.
* **RF_02:** Organización de datos y tipos en módulos atómicos.
* **RF_03:** Sistema CRUD con trazabilidad en consola.
* **RF_04:** Uso de decoradores para extender propiedades de forma automática.

### Requerimientos No Funcionales (RNF)
* **RNF_01:** Código modular y preparado para crecimiento futuro.
* **RNF_02:** Tipado estricto (Strict Mode) en TypeScript.
* **RNF_03:** Desacoplamiento entre la UI (Componentes) y la lógica (Clases/Utils).
* **RNF_04:** Ejecución simple en entorno local.

---

## 🚀 Guía de Ejecución

1.  **Habilitar Decoradores:** Asegúrate de que tu `tsconfig.json` incluya:
    ```json
    {
      "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
      }
    }
    ```
2.  **Instalación:**
    ```bash
    npm install
    ```
3.  **Lanzamiento:**
    ```bash
    npm run dev
    ```
4.  **Verificación:** * Prueba el login con un usuario del archivo `data`.
    * Abre la consola del desarrollador para ver los logs de simulación HTTP.
    * Crea un usuario nuevo y verifica que el decorador haya inyectado el `role` y la fecha de creación automáticamente.

---
# Historia de Usuario M5.4S2

Aplicacion React + TypeScript para demostrar autenticacion modular, gestion CRUD de usuarios y extensibilidad con decoradores.

## Objetivo

Implementar un flujo de login desacoplado, una clase `UserStore` con operaciones CRUD y un decorador que enriquezca automaticamente los usuarios creados con:

- `role: "user"`
- `createdAt: Date.now()`

## Estructura del proyecto

```text
week2/
  src/
    components/
      Dashboard.tsx
      Login.tsx
    data/
      users.ts
    interfaces/
      User.ts
    utils/
      auth.ts
      decorators.ts
      UserStore.ts
    App.tsx
    App.css
    index.css
    main.tsx
  index.html
  package.json
  tsconfig.app.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
```

## Funcionalidades implementadas

### TASK 1

- Login modular con `authenticate` en `src/utils/auth.ts`.
- Interface `User` y tipos auxiliares en `src/interfaces/User.ts`.
- Usuarios mock centralizados en `src/data/users.ts`.
- Mensajes de exito y error en la vista de login.
- Redireccion a la vista principal usando navegacion por hash (`#/login` y `#/dashboard`).

### TASK 2

- Clase `UserStore` en `src/utils/UserStore.ts`.
- Metodos implementados:
  - `list()`
  - `findByName()`
  - `create()`
  - `update()`
  - `remove()`
- Cada metodo registra en consola una simulacion HTTP:
  - `GET`
  - `POST`
  - `PATCH`
  - `DELETE`

### TASK 3

- Decorador `enrichNewUser` en `src/utils/decorators.ts`.
- Aplicado sobre `create()` en `UserStore`.
- El decorador agrega `role` y `createdAt` antes de ejecutar la logica original del metodo.

## Credenciales de prueba

Puedes iniciar sesion con cualquiera de estas cuentas mock:

| Nombre | Correo | Contrasena | Estado |
| --- | --- | --- | --- |
| Ana Torres | `ana.torres@riwi.dev` | `Admin123*` | Activa |
| Mateo Ruiz | `mateo.ruiz@riwi.dev` | `Mateo456*` | Activa |
| Sara Jimenez | `sara.jimenez@riwi.dev` | `Sara789*` | Inactiva |

## Como ejecutar

```bash
bun install
bun run dev
```

La aplicacion se sirve por defecto en `http://localhost:5173`.

## Como probar la historia

1. Inicia sesion con una cuenta activa.
2. Verifica que el sistema redirige al panel principal.
3. Abre la consola del navegador.
4. Usa el campo de busqueda para disparar `findByName()`.
5. Crea un usuario desde el formulario y revisa en la interfaz que aparezca con rol `user`.
6. Confirma en consola el log `POST /users` y observa que el usuario ya incluye `role` y `createdAt`.
7. Usa los botones `Activar/Desactivar` y `Eliminar` para validar `update()` y `remove()`.

## Criterios cubiertos

- `CA_01` a `CA_06`: Login modular, validacion, mensajes y redireccion.
- `CA_07` a `CA_10`: Clase CRUD con logs HTTP simulados.
- `CA_11` a `CA_14`: Decorador aplicado al metodo `create` sin romper su logica base.

## Requerimientos cubiertos

- `RF_01`: Login funcional y modular.
- `RF_02`: Tipos e informacion organizados por modulos.
- `RF_03`: CRUD con trazabilidad en consola.
- `RF_04`: Extension automatica de datos con decoradores.
- `RNF_01` a `RNF_04`: Solucion modular, tipada y facil de ejecutar localmente.

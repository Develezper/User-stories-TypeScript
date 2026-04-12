# Historia de Usuario M5.4S3: Componentes UI Reutilizables con TypeScript

## 📝 Descripción General
Esta historia de usuario se enfoca en la creación de una librería interna de componentes atómicos (**Button**, **Badge**, **Card**) bajo un esquema de tipado fuerte con **TypeScript**. El objetivo es establecer las bases de una interfaz consistente, escalable y fácil de mantener, asegurando que cada componente sea modular y altamente configurable a través de sus props.

**Story Points:** 20  
**Estado:** Pendiente  
**Sprint:** M5.4S3

---

## 🎯 Objetivo de la Historia de Usuario
Como desarrollador frontend, quiero crear componentes UI reutilizables (Button, Badge, Card) con tipado fuerte en TypeScript, para garantizar consistencia, escalabilidad y facilidad de mantenimiento en la interfaz.

---

## 📂 Estructura de Componentes
Cada componente debe estar ubicado en su propio directorio dentro de `src/components/`:

- `src/components/Button/`: Lógica y estilos del botón.
- `src/components/Badge/`: Etiquetas de estado o categoría.
- `src/components/Card/`: Contenedor principal que integra Button y Badge.

---

## 📋 Tareas de Desarrollo y Criterios de Aceptación (CA)

### TASK 1: Componente Button
* **CA_01:** Soporte de variantes: `variant?: "primary" | "secondary" | "danger"` (Default: `primary`).
* **CA_02:** Soporte de tamaños: `size?: "sm" | "md" | "lg"` (Default: `md`).
* **CA_03:** Implementación de props opcionales: `disabled`, `loading`, `leftIcon`, `rightIcon` y `onClick`.
* **CA_04:** Prop obligatoria `text: string`.
* **CA_05:** Integración técnica para funcionar como acción principal dentro de una `Card`.

### TASK 2: Componente Badge
* **CA_06:** Prop obligatoria `label: string`.
* **CA_07:** Soporte de estados: `status?: "success" | "warning" | "info" | "error" | "neutral"` (Default: `neutral`).
* **CA_08:** Prop opcional `icon?: React.ReactNode`.
* **CA_09:** Requisito de diseño: Cada `Card` debe renderizar al menos un `Badge`.

### TASK 3: Componente Card
* **CA_10:** Props obligatorias: `title: string`, `type: "green" | "white" | "black"`.
* **CA_11:** Prop opcional `imageUrl?: string` para encabezados visuales.
* **CA_12:** Prop opcional `footer?: React.ReactNode`, diseñado para inyectar componentes como `Button`.
* **CA_13:** Integración obligatoria de al menos un `Badge` en su estructura interna.

---

## 🛠️ Requerimientos Técnicos

### Requerimientos Funcionales (RF)
* **RF_01:** Crear un componente `Button` tipado y reutilizable.
* **RF_02:** Crear un componente `Badge` tipado y reutilizable.
* **RF_03:** Crear un componente `Card` tipado que integre `Badge` y opcionalmente `Button`.
* **RF_04:** Renderizar un listado de `Card` con ejemplos prácticos en la vista principal.

### Requerimientos No Funcionales (RNF)
* **RNF_01:** Código desarrollado en React + TypeScript sin errores de tipado (`any` prohibido).
* **RNF_02:** Componentes modulares y consistentes visualmente.
* **RNF_03:** Diseño limpio y arquitectura extensible.
* **RNF_04:** Compilación exitosa en entornos locales estándar.

---

## 🚀 Guía de Uso de Componentes

### Ejemplo de Implementación:
```tsx
import { Card } from './components/Card';
import { Button } from './components/Button';
import { Badge } from './components/Badge';

const MyView = () => (
  <Card 
    title="Nuevo Proyecto" 
    type="white"
    footer={<Button text="Ver detalles" variant="primary" />}
  >
    <Badge label="En curso" status="info" />
  </Card>
);
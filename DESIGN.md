# DESIGN SYSTEM: STITCH UI

Este documento define las reglas de diseño y arquitectura visual para el proyecto. El objetivo es mantener la consistencia técnica y estética mediante un sistema matemático y una tipografía adaptativa.

---

## 📐 1. Sistema de Grilla de 8 Puntos (8-Point Grid)

### 1.1 Regla de Oro

- **Unidad Base:** 8px.
- **Fórmula:** Espacio = n × 8px.
- **Excepción:** Se permite el uso de 4px (n/2) exclusivamente para ajustes finos en micro-componentes.

### 1.2 Escala de Espaciado (Sizing & Spacing)

| Token      | Valor | Uso Sugerido                                       |
| :--------- | :---- | :------------------------------------------------- |
| `space-4`  | 4px   | Micro-ajustes y etiquetas.                         |
| `space-8`  | 8px   | Padding interno de botones, separaciones pequeñas. |
| `space-16` | 16px  | Espaciado estándar entre elementos.                |
| `space-24` | 24px  | Padding interno de tarjetas.                       |
| `space-32` | 32px  | Márgenes entre componentes.                        |
| `space-48` | 48px  | Espaciado entre secciones.                         |
| `space-64` | 64px  | Layout spacing grande.                             |

---

## ✍️ 2. Tipografía y Ritmo Vertical (Responsive)

Se implementa una escala tipográfica fluida basada en `clamp()` para adaptarse a mobile y desktop.

### 2.1 Escala Tipográfica

- **H1 (Large Title):**
  `clamp(32px, 5vw, 48px)` / line-height: **1.2**

- **H2 (Title):**
  `clamp(24px, 3vw, 32px)` / line-height: **1.3**

- **Body (Standard):**
  `clamp(16px, 1.5vw, 18px)` / line-height: **1.6**

- **Caption:**
  **14px** / line-height: **1.4**

---

### 2.2 Reglas de Ritmo Vertical

- El `line-height` debe generar bloques alineados al sistema de 4px u 8px.
- Priorizar legibilidad en desktop aumentando el body a 18px cuando sea posible.
- Evitar tamaños menores a 14px para texto legible.

---

### 2.3 Jerarquía Visual

- H1 debe ser claramente dominante (mínimo 2× Body).
- H2 debe diferenciarse por tamaño y peso (no solo tamaño).
- Body debe priorizar legibilidad sobre densidad.
- Caption se usa solo para metadata o información secundaria.

---

## 🍱 3. Componentes Atómicos (Dimensiones)

| Componente      | Altura (Height) | Border Radius | Padding Horizontal |
| :-------------- | :-------------- | :------------ | :----------------- |
| **Botón (Std)** | 48px            | 8px           | 24px               |
| **Input Field** | 48px            | 8px           | 16px               |
| **Cards**       | Auto            | 16px          | 24px               |
| **Iconos**      | 24px x 24px     | N/A           | N/A                |

**Reglas adicionales:**

- Texto en botones: 16px–18px.
- Mantener padding vertical alineado al sistema de 8pt.

---

## 📱 4. Layout & Contenedores

- **Desktop (1440px+):** 12 columnas | Gutter: 24px | Margen lateral: 64px.
- **Tablet (768px):** 8 columnas | Gutter: 16px | Margen lateral: 32px.
- **Mobile (360px):** 4 columnas | Gutter: 16px | Margen lateral: 16px.

---

## 🤖 5. Instrucciones para el Agente de AI

### 5.1 Strict Mode

- Prohibido usar valores no múltiplos de 8.
- Permitido 4px solo en micro-ajustes.

---

### 5.2 Tipografía

- Usar `clamp()` para tamaños fluidos.
- Nunca usar texto menor a 14px.
- Priorizar legibilidad sobre densidad visual.

---

### 5.3 Tailwind Preference

- `p-2` → 8px
- `p-4` → 16px
- `gap-6` → 24px
- `text-base` → 16–18px

---

### 5.4 Refactorización

- Cualquier valor fuera del sistema de 8pt debe corregirse.
- Escalas tipográficas rígidas deben migrarse a `clamp()`.

---

## 🎨 6. Sistema de Color

Se define una paleta basada en un color primario, un secundario neutro y un color de foreground. Las variaciones deben mantener consistencia visual y accesibilidad (contraste adecuado).

### 6.1 Colores Base

- **Primary:** `#f28080`
- **Secondary:** `#f3ebee`
- **Foreground (texto principal):** `#251a1a`

---

### 6.2 Escala del Primary (Tonalidades)

Generar variaciones usando claridad/oscuridad manteniendo la identidad del color:

| Token         | Valor   | Uso              |
| ------------- | ------- | ---------------- |
| `primary-100` | #fde6e6 | Fondos suaves    |
| `primary-200` | #f9bcbc | Hover light      |
| `primary-300` | #f59a9a | Elementos suaves |
| `primary-400` | #f28080 | Base             |
| `primary-500` | #e06666 | Hover            |
| `primary-600` | #cc4d4d | Active           |
| `primary-700` | #993838 | Estados fuertes  |

---

### 6.3 Escala del Secondary (Neutrales cálidos)

| Token           | Valor   | Uso             |
| --------------- | ------- | --------------- |
| `secondary-100` | #ffffff | Background base |
| `secondary-200` | #f8f4f5 | Surface         |
| `secondary-300` | #f3ebee | Base            |
| `secondary-400` | #e6dede | Bordes          |
| `secondary-500` | #d6cdcf | Divider         |

---

### 6.4 **Foreground**# DESIGN SYSTEM: STITCH UI

Este documento define las reglas de diseño y arquitectura visual para el proyecto. El objetivo es mantener la consistencia técnica y estética mediante un sistema matemático y una tipografía adaptativa.

---

## 📐 1. Sistema de Grilla de 8 Puntos (8-Point Grid)

### 1.1 Regla de Oro

- **Unidad Base:** 8px.
- **Fórmula:** Espacio = n × 8px.
- **Excepción:** Se permite el uso de 4px (n/2) exclusivamente para ajustes finos en micro-componentes.

### 1.2 Escala de Espaciado (Sizing & Spacing)

| Token      | Valor | Uso Sugerido                                       |
| :--------- | :---- | :------------------------------------------------- |
| `space-4`  | 4px   | Micro-ajustes y etiquetas.                         |
| `space-8`  | 8px   | Padding interno de botones, separaciones pequeñas. |
| `space-16` | 16px  | Espaciado estándar entre elementos.                |
| `space-24` | 24px  | Padding interno de tarjetas.                       |
| `space-32` | 32px  | Márgenes entre componentes.                        |
| `space-48` | 48px  | Espaciado entre secciones.                         |
| `space-64` | 64px  | Layout spacing grande.                             |

---

## ✍️ 2. Tipografía y Ritmo Vertical (Responsive)

Se implementa una escala tipográfica fluida basada en `clamp()` para adaptarse a mobile y desktop.

### 2.1 Escala Tipográfica

- **H1 (Large Title):**
  `clamp(32px, 5vw, 48px)` / line-height: **1.2**

- **H2 (Title):**
  `clamp(24px, 3vw, 32px)` / line-height: **1.3**

- **Body (Standard):**
  `clamp(16px, 1.5vw, 18px)` / line-height: **1.6**

- **Caption:**
  **14px** / line-height: **1.4**

---

### 2.2 Reglas de Ritmo Vertical

- El `line-height` debe generar bloques alineados al sistema de 4px u 8px.
- Priorizar legibilidad en desktop aumentando el body a 18px cuando sea posible.
- Evitar tamaños menores a 14px para texto legible.

---

### 2.3 Jerarquía Visual

- H1 debe ser claramente dominante (mínimo 2× Body).
- H2 debe diferenciarse por tamaño y peso (no solo tamaño).
- Body debe priorizar legibilidad sobre densidad.
- Caption se usa solo para metadata o información secundaria.

---

## 🍱 3. Componentes Atómicos (Dimensiones)

| Componente      | Altura (Height) | Border Radius | Padding Horizontal |
| :-------------- | :-------------- | :------------ | :----------------- |
| **Botón (Std)** | 48px            | 8px           | 24px               |
| **Input Field** | 48px            | 8px           | 16px               |
| **Cards**       | Auto            | 16px          | 24px               |
| **Iconos**      | 24px x 24px     | N/A           | N/A                |

**Reglas adicionales:**

- Texto en botones: 16px–18px.
- Mantener padding vertical alineado al sistema de 8pt.

---

## 📱 4. Layout & Contenedores

- **Desktop (1440px+):** 12 columnas | Gutter: 24px | Margen lateral: 64px.
- **Tablet (768px):** 8 columnas | Gutter: 16px | Margen lateral: 32px.
- **Mobile (360px):** 4 columnas | Gutter: 16px | Margen lateral: 16px.

---

## 🤖 5. Instrucciones para el Agente de AI

### 5.1 Strict Mode

- Prohibido usar valores no múltiplos de 8.
- Permitido 4px solo en micro-ajustes.

---

### 5.2 Tipografía

- Usar `clamp()` para tamaños fluidos.
- Nunca usar texto menor a 14px.
- Priorizar legibilidad sobre densidad visual.

---

### 5.3 Tailwind Preference

- `p-2` → 8px
- `p-4` → 16px
- `gap-6` → 24px
- `text-base` → 16–18px

---

### 5.4 Refactorización

- Cualquier valor fuera del sistema de 8pt debe corregirse.
- Escalas tipográficas rígidas deben migrarse a `clamp()`.

---

## 🎨 6. Sistema de Color

Se define una paleta basada en un color primario, un secundario neutro y un color de foreground. Las variaciones deben mantener consistencia visual y accesibilidad (contraste adecuado).

### 6.1 Colores Base

- **Primary:** `#f28080`
- **Secondary:** `#f3ebee`
- **Foreground (texto principal):** `#251a1a`

---

### 6.2 Escala del Primary (Tonalidades)

Generar variaciones usando claridad/oscuridad manteniendo la identidad del color:

| Token         | Valor   | Uso              |
| ------------- | ------- | ---------------- |
| `primary-100` | #fde6e6 | Fondos suaves    |
| `primary-200` | #f9bcbc | Hover light      |
| `primary-300` | #f59a9a | Elementos suaves |
| `primary-400` | #f28080 | Base             |
| `primary-500` | #e06666 | Hover            |
| `primary-600` | #cc4d4d | Active           |
| `primary-700` | #993838 | Estados fuertes  |

---

### 6.3 Escala del Secondary (Neutrales cálidos)

| Token           | Valor   | Uso             |
| --------------- | ------- | --------------- |
| `secondary-100` | #ffffff | Background base |
| `secondary-200` | #f8f4f5 | Surface         |
| `secondary-300` | #f3ebee | Base            |
| `secondary-400` | #e6dede | Bordes          |
| `secondary-500` | #d6cdcf | Divider         |

---

### 6.4 Foreground

| Token          | Valor   | Uso                 |
| -------------- | ------- | ------------------- |
| `fg-primary`   | #251a1a | Texto principal     |
| `fg-secondary` | #5c4a4a | Texto secundario    |
| `fg-muted`     | #8a7a7a | Texto deshabilitado |

---

### 6.5 Reglas de Uso

- El **Primary** se usa para acciones (botones, links, estados activos).
- El **Secondary** se usa para fondos y superficies.
- El **Foreground** se usa para texto.
- Mantener contraste mínimo accesible (WCAG AA).
- Evitar usar colores fuera de la paleta definida.

---

### 6.6 Estados

- **Hover:** usar un tono más oscuro del mismo color.
- **Active:** usar 1–2 niveles más oscuros.
- **Disabled:** usar `fg-muted` + baja opacidad.

| Token          | Valor   | Uso                 |
| -------------- | ------- | ------------------- |
| `fg-primary`   | #251a1a | Texto principal     |
| `fg-secondary` | #5c4a4a | Texto secundario    |
| `fg-muted`     | #8a7a7a | Texto deshabilitado |

---

### 6.5 Reglas de Uso

- El **Primary** se usa para acciones (botones, links, estados activos).
- El **Secondary** se usa para fondos y superficies.
- El **Foreground** se usa para texto.
- Mantener contraste mínimo accesible (WCAG AA).
- Evitar usar colores fuera de la paleta definida.

---

### 6.6 Estados

- **Hover:** usar un tono más oscuro del mismo color.
- **Active:** usar 1–2 niveles más oscuros.
- **Disabled:** usar `fg-muted` + baja opacidad.

---

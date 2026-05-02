# Instrucciones del Agente - Francia Crochet

## 🤖 Perfil del Agente

Actúa como un Desarrollador Senior Fullstack. Eres experto en crear interfaces estéticas para e-commerce artesanal usando **shadcn/ui**, **Tailwind CSS v4** y **Framer Motion**.

## 🛠️ Stack Tecnológico (Versiones Reales)

- **Framework:** Next.js 16 (App Router) y React 19.
- **UI Library:** **shadcn/ui** (Componentes localizados en `@/components/ui`).
- **Estilos:** Tailwind CSS v4 con `tailwind-merge` y `clsx`.
- **Base de Datos:** Prisma v6.19.0 (Obligatorio: Driver Adapters).
- **Formularios:** `react-hook-form` + `zod` + `sonner` para notificaciones.
- **Gráficos:** `recharts` para estadísticas de ventas/inventario.

## 📖 Diccionario de Dominio y Estilo

- **Terminología:** No uses el término "sustantivo"; cámbialo siempre por **"Etiquetas"**.
- **Diseño:** Los componentes de **shadcn/ui** deben seguir una estética artesanal: usa radios de borde suaves (`rounded-xl` o `rounded-2xl`) y animaciones sutiles con Framer Motion.
- **Idioma:** Código en inglés, explicaciones en **español** siguiendo la claridad del método **Refold**.

## 📋 Reglas de Trabajo (Higiene de Código)

1.  **Componentes UI:** Antes de crear un componente desde cero, verifica si ya existe en `@/components/ui`. Si necesitas uno nuevo de shadcn, indica el comando `npx shadcn@latest add [componente]`.
2.  **Base de Datos:** Asegura que el esquema de Prisma cumpla con la **3FN** y usa `ts-node` para el seeding.

## 🚀 Comandos de Referencia

- `npm run dev` - Servidor de desarrollo.
- `npx shadcn@latest add` - Añadir nuevos componentes de UI.

## 📐 Arquitectura de Diseño (Visual Harmony)

- **Source of Truth:** Todas las decisiones de espaciado y dimensiones deben seguir estrictamente el archivo [DESIGN.md](./DESIGN.md).
- **8-Point Grid System:**
  - Aplica el sistema de 8 puntos para `padding`, `margin`, `gap`, `height` y `width`.
  - En **Tailwind v4**, prioriza el uso de valores proporcionales (ej. `p-2` para 8px, `m-4` para 16px).
- **Consistencia UI:** Los componentes de **shadcn/ui** deben ajustarse para que sus alturas y paddings internos respeten la grilla de 8px, manteniendo los bordes `rounded-xl/2xl` definidos en el perfil.
- **Validación:** Antes de entregar código de frontend, verifica mentalmente: "¿Este valor es múltiplo de 8?". Si la respuesta es no, ajústalo al múltiplo más cercano.

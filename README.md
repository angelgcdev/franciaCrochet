# Francia Crochet

E-commerce artesanal construido con `Next.js 16`, `React 19`, `Prisma`, `NextAuth`, `shadcn/ui` y `Tailwind CSS v4`. El proyecto combina una landing page comercial para productos tejidos con un panel administrativo protegido para gestionar el catálogo, las categorías y los accesos.

## Qué resuelve este proyecto

Francia Crochet permite mostrar los productos de la marca a los clientes mediante un catálogo digital accesible desde una landing page, ayudando a fortalecer la presencia digital y transmitir mayor confianza.

El sistema también incorpora un panel administrativo donde se pueden agregar productos junto con sus características, imágenes y precios para que sean mostrados automáticamente en el sitio web.

Esto permite mantener la información organizada y persistente en un solo lugar, evitando depender únicamente de WhatsApp para enviar manualmente imágenes, descripciones y precios cada vez que un cliente solicita el catálogo.

De esta manera, los clientes pueden acceder fácilmente a un espacio donde visualizar los productos disponibles en cualquier momento.

Hoy el proyecto incluye:

- **Landing pública:** Secciones de marca, productos destacados, testimonios y pedidos personalizados.
- **Autenticación:** Login seguro con Google OAuth.
- **Panel Administrativo:** Acceso restringido por lista blanca de correos autorizados.
- **Gestión Integral:** Control total sobre productos, categorías y usuarios autorizados (Etiquetas).
- **Consistencia Visual:** Diseño alineado estrictamente con [DESIGN.md](./DESIGN.md).

## Stack Tecnológico

- **Framework:** `Next.js 16` (App Router)
- **Biblioteca UI:** `React 19`
- **Estilos:** `Tailwind CSS v4`
- **Componentes:** `shadcn/ui`
- **ORM:** `Prisma 6.19`
- **Autenticación:** `NextAuth`
- **Formularios:** `react-hook-form` + `zod`
- **Notificaciones:** `sonner`
- **Animaciones:** `Framer Motion`
- **Gráficos:** `Recharts`

## Requisitos previos

Antes de levantar el proyecto, ten listo lo siguiente:

- `Node.js` 20 o superior recomendado
- `npm`
- `PostgreSQL`
- Credenciales de `Google OAuth`
- Credenciales de `Cloudinary` si vas a probar el flujo de imágenes

## Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Crea un archivo `.env` en la raíz del proyecto.

3. Configura las variables de entorno requeridas.

4. Ejecuta las migraciones de Prisma:

```bash
npx prisma migrate dev
```

5. Ejecuta el seed inicial:

```bash
npx prisma db seed
```

6. Levanta el servidor de desarrollo:

```bash
npm run dev
```

7. Abre [http://localhost:3000](http://localhost:3000) e inicia sesión con un correo autorizado.

## Flujo de arranque recomendado

El orden recomendado para onboarding es este:

1. `npm install`
2. Crear `.env`
3. Configurar PostgreSQL y credenciales externas
4. `npx prisma migrate dev`
5. `npx prisma db seed`
6. `npm run dev`
7. Entrar con un correo presente en `AllowedEmail`

## Variables de entorno

Estas variables son necesarias para levantar el proyecto sin errores:

```env
DATABASE_URL=""
DIRECT_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
SUPERUSER_EMAIL=""
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### Notas importantes sobre variables

- `DATABASE_URL`: usada por Prisma en `prisma/schema.prisma`.
- `DIRECT_URL`: usada por Prisma en `prisma.config.ts`.
- `SUPERUSER_EMAIL`: se usa en el seed para crear o actualizar el superusuario inicial.
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_API_KEY` y `CLOUDINARY_API_SECRET`: necesarias si vas a probar subida o eliminación de imágenes en Cloudinary.

## Base de Datos

El proyecto usa `PostgreSQL` con `Prisma`.

Puntos importantes:

- `prisma/schema.prisma` consume `DATABASE_URL`.
- `prisma.config.ts` consume `DIRECT_URL`.
- El seed definido en `prisma/seed.ts` crea o actualiza el correo configurado en `SUPERUSER_EMAIL` dentro de la tabla `AllowedEmail`.

---

## Estructura del Proyecto

```text
├── app/                # Rutas y lógica de servidor (Next.js App Router)
├── components/         # Componentes de negocio (Product, Admin, Layout)
│   └── ui/             # Componentes base de shadcn/ui personalizados
├── lib/                # Acciones de servidor, utilidades y servicios
├── prisma/             # Esquema de base de datos, migraciones y seed
├── public/             # Activos estáticos (imágenes, fuentes, iconos)
├── hooks/              # Hooks de React personalizados
└── types/              # Definiciones de TypeScript globales
```

## Autenticación y Acceso

- El login se realiza con `GoogleProvider` a través de `NextAuth`.
- Solo pueden acceder usuarios cuyo correo exista en la tabla `AllowedEmail`.
- El seed inicial registra el `SUPERUSER_EMAIL` como usuario permitido con privilegios altos.
- La pantalla de login personalizada se encuentra en `/login`.

## Diseño y Consistencia Visual

Las decisiones de interfaz deben seguir estrictamente el archivo [DESIGN.md](./DESIGN.md), que funciona como la "Fuente de Verdad" visual del proyecto.

**Principios clave:**

- Estética artesanal con apariencia boutique y minimalista.
- Uso de tipografías expresivas (**Handlee**) y redondez suave (**Varela Round**).
- Sistema de grilla base de `8px` para espacios, tamaños y separaciones.
- Los componentes de `shadcn/ui` deben adaptarse a la identidad visual (radios `xl/2xl`).

## Comandos Útiles

### Desarrollo

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Generar build de producción
npm run lint         # Ejecutar el linter
```

### Base de Datos (Prisma)

```bash
npx prisma migrate dev    # Crear y aplicar migraciones
npx prisma db seed        # Ejecutar el seed de datos (Etiquetas autorizadas)
npx prisma studio         # Explorador visual de la base de datos
```

### Interfaz (shadcn)

```bash
npx shadcn@latest add [componente]  # Añadir nuevo componente de UI
```

## Referencias Internas

- **Guía Visual:** [DESIGN.md](./DESIGN.md)
- **Instrucciones del Agente:** [AGENTS.md](./AGENTS.md)
- **Esquema de Base de Datos:** [prisma/schema.prisma](./prisma/schema.prisma)
- **Seed Inicial:** [prisma/seed.ts](./prisma/seed.ts)

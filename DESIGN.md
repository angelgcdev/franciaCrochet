---
name: Francia Crochet
colors:
  surface: "#fff7fb"
  surface-dim: "#e0d8dd"
  surface-bright: "#fff7fb"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#faf1f6"
  surface-container: "#f4ebf1"
  surface-container-high: "#eee6eb"
  surface-container-highest: "#e9e0e5"
  on-surface: "#1e1a1e"
  on-surface-variant: "#4c444d"
  inverse-surface: "#332f33"
  inverse-on-surface: "#f7eef4"
  outline: "#7e747e"
  outline-variant: "#cfc3ce"
  surface-tint: "#774f84"
  primary: "#774f84"
  on-primary: "#ffffff"
  primary-container: "#f3c2ff"
  on-primary-container: "#734b80"
  inverse-primary: "#e6b6f2"
  secondary: "#5d5f5f"
  on-secondary: "#ffffff"
  secondary-container: "#dfe0e0"
  on-secondary-container: "#616363"
  tertiary: "#6f4e9b"
  on-tertiary: "#ffffff"
  tertiary-container: "#e1c8ff"
  on-tertiary-container: "#6b4a96"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#f9d8ff"
  primary-fixed-dim: "#e6b6f2"
  on-primary-fixed: "#2e0a3c"
  on-primary-fixed-variant: "#5e386b"
  secondary-fixed: "#e2e2e2"
  secondary-fixed-dim: "#c6c6c7"
  on-secondary-fixed: "#1a1c1c"
  on-secondary-fixed-variant: "#454747"
  tertiary-fixed: "#eddcff"
  tertiary-fixed-dim: "#d8b9ff"
  on-tertiary-fixed: "#290153"
  on-tertiary-fixed-variant: "#563681"
  background: "#fff7fb"
  on-background: "#1e1a1e"
  surface-variant: "#e9e0e5"
typography:
  h1:
    fontFamily: Handlee
    fontSize: 48px
    fontWeight: "400"
    lineHeight: "1.2"
    letterSpacing: -0.02em
  h2:
    fontFamily: Handlee
    fontSize: 32px
    fontWeight: "400"
    lineHeight: "1.3"
  h3:
    fontFamily: Handlee
    fontSize: 24px
    fontWeight: "400"
    lineHeight: "1.4"
  body-lg:
    fontFamily: Varela Round
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Varela Round
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  label-caps:
    fontFamily: Varela Round
    fontSize: 12px
    fontWeight: "400"
    lineHeight: "1.0"
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin: 32px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Marca y Estilo

Este sistema de diseño fue creado para reflejar la naturaleza caprichosa, táctil y meticulosa del crochet. La personalidad de la marca es cálida y acogedora, buscando evocar la comodidad de un regalo hecho a mano mientras mantiene una experiencia digital profesional y de calidad tipo boutique.

La estética utiliza un estilo híbrido **Minimalista-Táctil**. Emplea abundante espacio en blanco y diseños limpios para garantizar que la fotografía de los productos siga siendo el punto focal, mientras incorpora elementos de interfaz muy redondeados y “esponjosos” que reflejan la suavidad del hilo y de los puntos tejidos. La respuesta emocional debe ser una sensación de “modernismo acogedor”: un espacio que se sienta tan suave como un ovillo de lana, pero tan confiable como un atelier de alta gama.

## Colores

La paleta de colores se aleja de los tradicionales tonos tierra y se orienta hacia un sofisticado y soñador espectro lavanda.

- **Primario (#f3c2ff):** Utilizado para los principales elementos interactivos y momentos representativos de la marca. Representa la “suavidad” del arte del crochet.
- **Secundario (#fafafa):** La base principal. Este blanco roto proporciona un lienzo limpio, similar al papel, evitando que los tonos púrpura se saturen demasiado.
- **Terciario (#be9aed):** Reservado para acentos, estados hover y destacados de llamadas a la acción, aportando la profundidad visual necesaria.
- **Colores de primer plano:** Un tono carbón de alto contraste garantiza accesibilidad para lecturas extensas, mientras que un gris pizarra secundario se usa para metadatos, subtítulos y etiquetas decorativas.

## Tipografía

Este sistema de diseño utiliza una combinación tipográfica expresiva para equilibrar el encanto artesanal con la legibilidad. **Handlee** se utiliza en encabezados, aportando una cualidad juguetona y manuscrita que sugiere la naturaleza personalizada de los patrones de crochet. Para el texto de contenido y etiquetas funcionales, se utiliza **Varela Round** para mantener una estética amigable y fácil de leer. Las terminaciones naturalmente redondeadas de Varela Round eliminan la dureza visual y reflejan las curvas orgánicas de los tejidos de crochet.

Los encabezados deben configurarse con un ligero espaciado negativo entre letras para sentirse más cohesivos. El texto de cuerpo requiere una altura de línea generosa (1.6) para mantener una sensación ligera y fácil de leer sobre el fondo blanco roto.

## Distribución y Espaciado

La distribución sigue una filosofía de **Grid Fijo** para escritorio, creando una sensación curada y similar a un catálogo visual, mientras que en dispositivos móviles se transforma en un modelo fluido.

Se utiliza una cuadrícula de 12 columnas con amplios espacios de 24px entre columnas para permitir que la interfaz “respire”. El espaciado está gobernado por una unidad base de 8px, aunque se prefieren valores de “stack” para crear agrupaciones claras de contenido. Se deben usar márgenes verticales más grandes (`stack-lg`) entre diferentes categorías o secciones de productos para enfatizar una experiencia de navegación relajada y sin prisa.

## Elevación y Profundidad

Para mantener la sensación artesanal, la profundidad se crea mediante **Sombras Ambientales** y **Capas Tonales**, en lugar de contornos duros.

- **Niveles de superficie:** Utiliza el lavanda primario con opacidades muy bajas (5–8%) para crear contenedores de fondo sutiles destinados a contenido secundario.
- **Perfil de sombras:** Las sombras deben ser extremadamente difusas y con un ligero tinte púrpura. Esto imita la sombra suave proyectada por la tela o el hilo.
- **Interacción:** En estado hover, los elementos deben elevarse ligeramente (2–4px) junto con un incremento correspondiente en la expansión de la sombra para reforzar la sensación táctil y “esponjosa”.

## Formas

El lenguaje visual de las formas está definido por una **Redondez Moderadamente**. No existen esquinas afiladas en este sistema de diseño.

- **Elementos estándar (botones, inputs):** Utilizar un radio de 0.5rem (8px).
- **Contenedores grandes (cards, modales):** Utilizar un radio de 0.5rem (8px).
- **Elementos destacados:** Utilizar 0.5rem (8px) para imágenes prominentes o secciones de “Agregar al carrito”, enfatizando la naturaleza suave y redondeada de los puntos de crochet.

## Componentes

- **Botones:** Los botones principales se rellenan con el color Lavanda (#f3c2ff) y texto de alto contraste. Deben sentirse “acolchados”, utilizando un padding horizontal generoso. Los botones secundarios usan un borde Terciario (#be9aed) sin relleno.
- **Cards:** Las tarjetas de producto utilizan un fondo Secundario (#fafafa) con una sombra ambiental muy suave. Las imágenes dentro de las tarjetas deben heredar un radio de borde ligeramente menor que el de la tarjeta para dar sensación de estar anidadas.
- **Chips/Etiquetas:** Utilizados para etiquetas como “Material” (por ejemplo, algodón o acrílico) o “Dificultad”. Deben tener forma de píldora con un fondo Terciario (#be9aed) al 15% de opacidad.
- **Campos de entrada:** Fondos grises suaves con un estado focus que transiciona hacia un borde Lavanda de 2px.
- **Checkboxes:** Completamente redondeados (circulares) para evitar interrupciones visuales “puntiagudas”, utilizando un ícono de check que recuerde una puntada simplificada.
- **Barras de progreso:** Utilizadas para “Crochet-alongs” o seguimiento de pedidos. Deben ser gruesas y con forma de píldora, utilizando un degradado desde Lavanda hasta Púrpura Oscuro.

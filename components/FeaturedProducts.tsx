import { ProductCard } from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Mantita de Bebé",
    price: "$45.00",
    image:
      "https://res.cloudinary.com/dngkwtctt/image/upload/v1762224267/zapatito-mate-cars_kdalh5.jpg",
    description: "Suave mantita tejida en algodón 100% natural",
  },
  {
    id: 2,
    name: "Amigurumi Osito",
    price: "$28.00",
    image:
      "https://res.cloudinary.com/dngkwtctt/image/upload/v1762224259/oso-marron_gdf1hi.jpg",
    description: "Adorable osito tejido, perfecto para abrazar",
  },
  {
    id: 3,
    name: "Conjunto de Gorro y Botitas",
    price: "$35.00",
    image:
      "https://res.cloudinary.com/dngkwtctt/image/upload/v1762224253/oso_tmiati.jpg",
    description: "Set completo para mantener abrigado al bebé",
  },
  {
    id: 4,
    name: "Amigurumi Conejito",
    price: "$30.00",
    image:
      "https://res.cloudinary.com/dngkwtctt/image/upload/v1762224239/kitty_oup1wx.jpg",
    description: "Tierno conejito personalizable en colores",
  },
  {
    id: 5,
    name: "Amigurumi Conejito",
    price: "$30.00",
    image:
      "https://res.cloudinary.com/dngkwtctt/image/upload/v1762224200/conejo_ermnoi.jpg",
    description: "Tierno conejito personalizable en colores",
  },
  {
    id: 6,
    name: "Amigurumi Conejito",
    price: "$30.00",
    image:
      "https://res.cloudinary.com/dngkwtctt/image/upload/v1762224194/conejo-amigurumi_prinjy.jpg",
    description: "Tierno conejito personalizable en colores",
  },
];

const FeaturedProducts = () => {
  return (
    <section id="productos" className="py-20 md:py-32 bg-[#F2EADF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-1">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance text-[#542622]">
            Productos Destacados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Cada pieza es única y hecha con materiales de la más alta calidad
            para garantizar la seguridad y comodidad de tu bebé.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

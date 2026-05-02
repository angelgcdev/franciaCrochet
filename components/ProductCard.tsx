import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { ProductInfo } from "@/app/admin/products/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  product: ProductInfo;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = product.images[0]?.image_url || "/images/logo.png";
  const price = product.price ? `Bs. ${product.price}` : "Consultar precio";

  const whatsappMessage = `
Hola 👋 quiero pedir este producto:

🧶 Producto: ${product.name}
💰 Precio: ${price}
🖼 Foto: ${imageUrl}
`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=59178614070&text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/80 bg-white p-6 shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/70">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <CardContent className="px-0 pt-6">
        <p className="stitch-caption mb-2 font-semibold uppercase tracking-[0.25em] text-primary/80">
          {product.category?.name || "Francia Crochet"}
        </p>
        <h3 className="stitch-h2 font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="stitch-body mt-4 line-clamp-2 min-h-12 text-muted-foreground">
          {product.description || "Pieza tejida a mano con acabado delicado."}
        </p>
        <p className="stitch-h2 mt-4 font-bold text-primary">
          {price}
        </p>
      </CardContent>
      <CardFooter className="px-0 pb-0 pt-0">
        <Button
          className="h-12 w-full rounded-lg bg-primary px-6 text-base font-semibold leading-6 hover:bg-primary/90"
          asChild
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-6" aria-hidden="true" />
            Comprar por WhatsApp
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ProductCard };

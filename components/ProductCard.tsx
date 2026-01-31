import { ProductInfo } from "@/app/admin/products/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  product: ProductInfo;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const whatsappMessage = `
Hola 👋 quiero pedir este producto:

🧶 Producto: ${product.name}
💰 Precio: Bs. ${product.price}
🖼 Foto: ${product.images[0].image_url}
`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=59178614070&text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <Card className="overflow-hidden bg-card text-card-foreground px-4 py-4 shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0].image_url || "/placeholder.svg"}
          alt={product.name}
          fill
          className="rounded-2xl object-cover"
        />
      </div>
      <CardContent>
        <h3 className="font-semibold text-lg mb-2 text-balance">
          {product.name}
        </h3>
        {product.description ? (
          <p className="text-sm text-muted-foreground mb-3 text-pretty leading-relaxed line-clamp-1">
            {product.description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground mb-3 text-pretty leading-relaxed line-clamp-1">
            Sin descripción
          </p>
        )}
        <p className="text-xl font-bold text-primary">Bs. {product.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full rounded-full font-semibold bg-primary hover:bg-primary/90 transform transition-transform duration-300 hover:scale-105"
          asChild
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white leading-tight tracking-wide"
          >
            Comprar por WhatsApp
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ProductCard };

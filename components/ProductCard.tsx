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
    whatsappMessage
  )}`;

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images[0].image_url || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-balance">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 text-pretty leading-relaxed">
          {product.description}
        </p>
        <p className="text-xl font-bold text-[#DC999E]">Bs. {product.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full rounded-full font-semibold bg-[#DC999E] hover:bg-[#C77B83]"
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

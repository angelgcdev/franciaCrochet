import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const whatsappMessage = `Hola 👋 quiero pedir este producto: ${product.name}`;
  const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-balance">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 text-pretty leading-relaxed">
          {product.description}
        </p>
        <p className="text-xl font-bold text-[#DC999E]">{product.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full rounded-full font-semibold bg-[#DC999E]"
          asChild
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Comprar por WhatsApp
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ProductCard };

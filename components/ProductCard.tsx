import Image from "next/image";
import { Handlee, Varela } from "next/font/google";
import { ProductInfo } from "@/app/admin/products/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  product: ProductInfo;
}

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

const varela = Varela({
  weight: "400",
  subsets: ["latin"],
});

const formatPrice = (price?: number) => {
  if (!price) return "Consultar precio";

  return `Bs. ${new Intl.NumberFormat("es-BO").format(price)}`;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = product.images[0]?.image_url || "/images/logo.png";
  const price = formatPrice(product.price);
  const categoryName = product.category?.name || "Francia Crochet";

  const whatsappMessage = `🧶 ¡Hola! Me interesa este producto de *Francia Crochet*:%0A%0A📦 *${product.name}*%0A💰 ${price}%0A%0A📸 Ver foto: ${imageUrl}%0A%0A¡Gracias! 😊`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=59178614070&text=${whatsappMessage}`;

  return (
    <Card className="group overflow-hidden rounded-[24px] border-transparent bg-white p-space-16 shadow-[0_12px_30px_rgba(119,79,132,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(119,79,132,0.12)]">
      <div className="relative aspect-4/5 overflow-hidden rounded-[24px] bg-secondary">
        <Badge
          className={`${handlee.className} absolute left-space-16 top-space-16 z-10 rounded-full bg-primary-400 px-3 py-2 text-sm tracking-[0.08em] text-primary-100 shadow-[0_8px_16px_rgba(119,79,132,0.24)] hover:bg-primary-400`}
        >
          {categoryName}
        </Badge>

        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>

      <CardContent className="px-space-8 pb-0  text-center">
        <p
          className={`${varela.className} truncate text-[clamp(22px,1.8vw,28px)] leading-[1.15] tracking-[-0.02em] text-fg-secondary text-sm`}
          title={product.name}
        >
          {product.name}
        </p>

        <p
          className={`${handlee.className} mt-4 text-[clamp(22px,1.8vw,28px)] leading-[1.2] tracking-[-0.02em] text-primary text-shadow-[1px_1px_1px_rgba(0,0,0,0.4)]`}
        >
          {price}
        </p>
      </CardContent>

      <CardFooter className="px-space-8 pb-space-8">
        <Button
          className="h-12 w-full cursor-pointer rounded-full bg-primary px-space-24 text-sm font-semibold uppercase tracking-[0.02em] text-primary-400 shadow-[0_10px_20px_rgba(243,194,255,0.42)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-primary-100 hover:shadow-[0_14px_28px_rgba(243,194,255,0.48)] active:scale-[0.98]"
          asChild
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            COMPRAR POR WHATSAPP
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ProductCard };

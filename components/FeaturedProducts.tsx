import { Handlee } from "next/font/google";
import { getPublicProductsService } from "@/lib/public/service";
import FeaturedProductsClient from "./FeaturedProductsClient";
import { ProductInfo } from "@/app/admin/products/types";

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

export default async function FeaturedProducts() {
  const initialData = await getPublicProductsService(null, 12);

  return (
    <section
      id="productos"
      className="bg-[linear-gradient(180deg,#fff8fb_0%,#fcf3f8_100%)] px-space-16 py-space-48 scroll-mt-20 md:px-space-32 md:py-space-64"
    >
      <div className="section-shell">
        <div className="mx-auto max-w-[640px] text-center">
          <h2
            className={`${handlee.className} text-[clamp(32px,3.5vw,48px)] leading-[1.2] tracking-[-0.02em] text-primary-400`}
          >
            Nuestro Catálogo
          </h2>
          <p className="mx-auto mt-space-16 max-w-[520px] text-[clamp(16px,1.4vw,18px)] leading-[1.6] text-fg-secondary">
            Explora nuestras creaciones artesanales hechas a mano
          </p>
        </div>

        <div className="mt-space-48">
          {/* Aquí inyectamos el cliente para el Scroll Infinito con los datos iniciales listos desde SSR */}
          <FeaturedProductsClient
            initialProducts={initialData.data as unknown as ProductInfo[]}
            initialHasMore={initialData.hasMore}
            initialNextCursor={initialData.nextCursor}
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { Handlee } from "next/font/google";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";
import { getPublicProducts } from "@/app/api";
import { ProductInfo } from "@/app/admin/products/types";
import { ProductCard } from "./ProductCard";

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

const FeaturedProducts = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<number | null>(null);

  const fetchProducts = useCallback(
    async (cursor: number | null, reset = false) => {
      const res = await getPublicProducts(cursor, 12);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      if (reset) {
        setProducts(res.data.data);
      } else {
        setProducts((prev) => {
          const ids = new Set(prev.map((p) => p.id));
          const uniqueNew = res.data.data.filter(
            (item: ProductInfo) => !ids.has(item.id),
          );
          return [...prev, ...uniqueNew];
        });
      }

      setHasMore(res.data.hasMore);
      setNextCursor(res.data.nextCursor || null);
    },
    [],
  );

  useEffect(() => {
    async function loadInitial() {
      await fetchProducts(null);
    }

    loadInitial();
  }, [fetchProducts]);

  const loadMore = () => {
    if (!nextCursor) return;
    fetchProducts(nextCursor);
  };

  return (
    <section
      id="productos"
      className="bg-[linear-gradient(180deg,#fff8fb_0%,#fcf3f8_100%)] px-space-16 py-space-48 scroll-mt-20 md:px-space-32 md:py-space-64"
    >
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mx-auto max-w-[640px] text-center"
        >
          <h2
            className={`${handlee.className} text-[clamp(32px,3.5vw,48px)] leading-[1.2] tracking-[-0.02em] text-fg-primary`}
          >
            Nuestro Catálogo
          </h2>
          <p className="mx-auto mt-space-16 max-w-[520px] text-[clamp(16px,1.4vw,18px)] leading-[1.6] text-fg-secondary">
            Cada pieza es tejida punto por punto, asegurando la mayor suavidad
            para la piel de tu bebé.
          </p>
        </motion.div>

        <div className="mt-space-48">
          <InfiniteScroll
            dataLength={products.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="pt-space-32 text-center text-sm font-medium text-primary-400">
                Cargando más piezas...
              </div>
            }
            endMessage={
              products.length > 0 ? (
                <p className="pt-space-32 text-center text-sm font-medium text-fg-muted">
                  Ya viste todas las piezas disponibles por ahora.
                </p>
              ) : null
            }
          >
            <div className="grid grid-cols-1 gap-space-32 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.04, 0.16),
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

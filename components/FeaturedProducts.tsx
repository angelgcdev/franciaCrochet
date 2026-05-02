"use client";

import { useCallback, useEffect, useState } from "react";
import { Playwrite_US_Trad } from "next/font/google";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";
import { getPublicProducts } from "@/app/api";
import { ProductInfo } from "@/app/admin/products/types";
import { ProductCard } from "./ProductCard";

const playwriteUS = Playwrite_US_Trad({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
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
      className="bg-[linear-gradient(180deg,#fff8f7_0%,#f7dcdf_100%)] px-space-24 py-20 scroll-mt-20 md:py-24"
    >
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="stitch-caption font-semibold uppercase tracking-[0.25em] text-primary">
            Catálogo
          </p>
          <h2
            className={`${playwriteUS.className} stitch-h2 mt-4 font-semibold text-foreground`}
          >
            Piezas listas para regalar
          </h2>
          <p className="stitch-body mt-4 text-muted-foreground">
            Amigurumis, ropita y accesorios tejidos con materiales suaves,
            pensados para celebrar momentos pequeños con mucho cariño.
          </p>
        </motion.div>

        <div className="thread-divider" />

        <InfiniteScroll
          dataLength={products.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className="stitch-caption py-10 text-center font-medium text-primary">
              Cargando más piezas...
            </div>
          }
          endMessage={
            products.length > 0 ? (
              <p className="stitch-caption py-10 text-center font-medium text-muted-foreground">
                Ya viste todas las piezas disponibles por ahora.
              </p>
            ) : null
          }
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    </section>
  );
};

export default FeaturedProducts;

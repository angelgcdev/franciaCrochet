"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";
import { getPublicProducts } from "@/app/api";
import { ProductInfo } from "@/app/admin/products/types";
import { ProductCard } from "./ProductCard";

interface FeaturedProductsClientProps {
  initialProducts: ProductInfo[];
  initialHasMore: boolean;
  initialNextCursor: number | null;
}

export default function FeaturedProductsClient({
  initialProducts,
  initialHasMore,
  initialNextCursor,
}: FeaturedProductsClientProps) {
  const [products, setProducts] = useState<ProductInfo[]>(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [nextCursor, setNextCursor] = useState<number | null>(
    initialNextCursor,
  );

  const fetchProducts = useCallback(async (cursor: number | null) => {
    const res = await getPublicProducts(cursor, 12);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    setProducts((prev) => {
      const ids = new Set(prev.map((p) => p.id));
      const uniqueNew = res.data.data.filter(
        (item: ProductInfo) => !ids.has(item.id),
      );
      return [...prev, ...uniqueNew];
    });

    setHasMore(res.data.hasMore);
    setNextCursor(res.data.nextCursor || null);
  }, []);

  const loadMore = () => {
    if (!nextCursor) return;
    fetchProducts(nextCursor);
  };

  return (
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
  );
}

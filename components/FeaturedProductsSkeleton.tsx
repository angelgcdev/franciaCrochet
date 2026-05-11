import { Skeleton } from "@/components/ui/skeleton";
import { Handlee } from "next/font/google";

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

export default function FeaturedProductsSkeleton() {
  return (
    <section
      id="productos"
      className="bg-[linear-gradient(180deg,#fff8fb_0%,#fcf3f8_100%)] px-space-16 py-space-48 md:px-space-32 md:py-space-64"
    >
      <div className="section-shell">
        <div className="mx-auto max-w-[640px] text-center">
          <h2
            className={`${handlee.className} text-[clamp(32px,3.5vw,48px)] leading-[1.2] tracking-[-0.02em] text-primary-400 opacity-50`}
          >
            Nuestro Catálogo
          </h2>
          <div className="mx-auto mt-space-16 flex flex-col items-center gap-2">
            <Skeleton className="h-5 w-full max-w-[400px] rounded-full" />
            <Skeleton className="h-5 w-3/4 max-w-[300px] rounded-full" />
          </div>
        </div>

        <div className="mt-space-48">
          <div className="grid grid-cols-1 gap-space-32 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-space-16">
                {/* Image Skeleton */}
                <Skeleton className="aspect-square w-full rounded-2xl" />
                {/* Content Skeleton */}
                <div className="flex flex-col gap-space-8">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-1/3 rounded-full" />
                    <Skeleton className="h-6 w-1/4 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-5/6 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

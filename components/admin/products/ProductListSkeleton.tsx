import { Skeleton } from "@/components/ui/skeleton";

export function ProductListSkeleton() {
  return (
    <div className="bg-secondary-200 m-4 rounded-xl p-4 shadow-sm">
      {/* Badge skeleton */}
      <div className="flex items-center justify-end mb-4">
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>

      {/* Product card skeletons */}
      <div className="grid gap-4 grid-cols-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border p-4 bg-white flex flex-row gap-4 items-center"
          >
            {/* Image skeleton */}
            <Skeleton className="w-[100px] h-[130px] rounded-lg shrink-0" />

            {/* Content skeleton */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>

              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />

              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
                <Skeleton className="h-5 w-20 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

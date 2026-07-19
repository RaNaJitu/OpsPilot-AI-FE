import Skeleton from "../../../components/ui/Skeleton";

export default function IncidentListSkeleton({ count = 4 }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading incidents">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border p-5"
          style={{
            backgroundColor: "var(--app-bg-elevated)",
            borderColor: "var(--app-border)",
          }}
        >
          <Skeleton className="h-5 w-2/3" rounded="md" />
          <div className="mt-3 flex gap-2">
            <Skeleton className="h-5 w-16" rounded="full" />
            <Skeleton className="h-5 w-20" rounded="full" />
            <Skeleton className="h-5 w-16" rounded="md" />
          </div>
          <Skeleton className="mt-4 h-16 w-full" rounded="lg" />
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((__, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-14" rounded="md" />
                <Skeleton className="h-4 w-24" rounded="md" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

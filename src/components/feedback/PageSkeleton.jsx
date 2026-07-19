import Skeleton from "../ui/Skeleton";

export function DetailPageSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6 lg:p-8" aria-busy="true">
      <Skeleton className="h-4 w-28" rounded="md" />
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4" rounded="md" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" rounded="full" />
          <Skeleton className="h-6 w-20" rounded="full" />
          <Skeleton className="h-6 w-16" rounded="md" />
        </div>
      </div>
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-56 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}

export function SettingsPageSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6 lg:p-8" aria-busy="true">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" rounded="md" />
        <Skeleton className="h-4 w-64" rounded="md" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="space-y-4 rounded-2xl border p-5 md:p-6"
          style={{ borderColor: "var(--app-border)" }}
        >
          <Skeleton className="h-6 w-36" rounded="md" />
          <Skeleton className="h-10 w-full" rounded="lg" />
          <Skeleton className="h-10 w-full" rounded="lg" />
        </div>
      ))}
    </div>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div
      className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:flex-row md:gap-8 md:p-6 lg:p-8"
      aria-busy="true"
    >
      <div className="w-full shrink-0 md:w-[280px] lg:w-[300px]">
        <div
          className="overflow-hidden rounded-2xl border"
          style={{ borderColor: "var(--app-border)" }}
        >
          <Skeleton className="h-28 w-full rounded-none" />
          <div className="space-y-3 px-5 py-8">
            <Skeleton className="mx-auto h-20 w-20" rounded="full" />
            <Skeleton className="mx-auto h-6 w-32" rounded="md" />
            <Skeleton className="mx-auto h-4 w-40" rounded="md" />
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-4">
        <Skeleton className="h-8 w-48" rounded="md" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}

export function AssistantSidebarSkeleton() {
  return (
    <div className="space-y-3 p-3" aria-busy="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2 rounded-xl border p-3" style={{ borderColor: "var(--app-border)" }}>
          <Skeleton className="h-4 w-3/4" rounded="md" />
          <Skeleton className="h-3 w-1/2" rounded="md" />
        </div>
      ))}
    </div>
  );
}

export function ChatThreadSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4" aria-busy="true">
      <Skeleton className="h-16 w-3/4 self-start" rounded="lg" />
      <Skeleton className="h-20 w-2/3 self-end" rounded="lg" />
      <Skeleton className="h-14 w-1/2 self-start" rounded="lg" />
    </div>
  );
}

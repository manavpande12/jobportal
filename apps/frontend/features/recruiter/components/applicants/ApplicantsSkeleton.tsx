import { Card, CardContent } from "@/common/components/ui/card";
import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";

export default function ApplicantsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="relative w-full overflow-hidden bg-background shadow-sm ring-0 border">
          <CardContent className="relative z-10 flex w-full! flex-col items-center justify-center gap-3 p-3">
            {/* Status Badge */}
            <div className="w-full">
              <Skeleton className="h-5 w-24 rounded-md" />
            </div>

            {/* Applicant Information */}
            <div className="flex w-full min-w-0 gap-3">
              <Skeleton className="size-16 shrink-0 rounded-full" />

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded-sm" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="flex w-full gap-2 overflow-hidden">
              <Skeleton className="h-6 w-16 shrink-0 rounded-xl" />
              <Skeleton className="h-6 w-20 shrink-0 rounded-xl" />
              <Skeleton className="h-6 w-14 shrink-0 rounded-xl" />
            </div>

            <Separator className="w-full" />

            {/* Application Details */}
            <div className="flex w-full flex-wrap justify-between gap-3">
              {/* Applied For */}
              <div className="flex min-w-0 flex-1 gap-2">
                <Skeleton className="size-9 shrink-0 rounded-lg" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <Skeleton className="h-2.5 w-16" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>

              {/* Applied On */}
              <div className="flex min-w-0 flex-1 gap-2">
                <Skeleton className="size-9 shrink-0 rounded-lg" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <Skeleton className="h-2.5 w-16" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>

            <Separator className="w-full" />

            {/* Action Buttons */}
            <div className="flex w-full flex-col items-center gap-2">
              <div className="flex w-full min-w-0 gap-2">
                <Skeleton className="h-9 min-w-0 flex-1 rounded-md" />
                <Skeleton className="h-9 min-w-0 flex-1 rounded-md" />
              </div>

              {/* View Resume */}
              <Skeleton className="h-9 w-full rounded-md" />
            </div>

            {/* Background Blur */}
            <div className="pointer-events-none absolute -bottom-32 -right-20 size-96 rounded-full bg-muted/20 blur-3xl" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

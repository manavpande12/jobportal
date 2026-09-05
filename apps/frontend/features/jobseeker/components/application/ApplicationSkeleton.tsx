import { Card, CardContent } from "@/common/components/ui/card";
import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";
import { useIsMobile } from "@/common/hooks/useMobile";

export default function ApplicationSkeleton() {
    const isMobile = useIsMobile();
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <Card
                    key={index}
                    className="relative overflow-hidden bg-background  ring-0 border"
                >
                    <CardContent className="flex flex-col gap-4 p-3 lg:flex-row lg:items-center lg:p-5">
                        {/* Left */}
                        <div className="flex min-w-0 flex-1 items-start gap-4">
                            <Skeleton className="size-16 shrink-0 rounded-xl lg:size-20" />

                            <div className="flex min-w-0 flex-1 flex-col gap-2">
                                <Skeleton className="h-3 w-28" />
                                <Skeleton className="h-6 w-3/4" />

                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-16 rounded-xl" />
                                    <Skeleton className="h-6 w-20 rounded-xl" />
                                    <Skeleton className="h-6 w-14 rounded-xl" />
                                </div>
                            </div>
                        </div>

                        <Separator orientation={isMobile ? "horizontal" : "vertical"} />

                        {/* Right */}
                        <div className="flex flex-wrap items-center justify-between gap-4 lg:min-w-60">
                            <div className="flex items-center gap-2">
                                <Skeleton className="size-9 rounded-lg" />
                                <div className="space-y-1.5">
                                    <Skeleton className="h-2.5 w-12" />
                                    <Skeleton className="h-4 w-28" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Skeleton className="size-9 rounded-lg" />
                                <div className="space-y-1.5">
                                    <Skeleton className="h-2.5 w-24" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/common/components/ui/carousel";
import { Card, CardContent } from "@/common/components/ui/card";
import { hsl } from "@/common/constants/color";
import { APPLICATION_STATUS_CONFIG, ApplicationStatus } from "@/features/application/types/application.types";
import { useGetJobSeekerApplicationStatusCount } from "@/features/application/hooks/useApplication";

export function ApplicationStats() {
    const { data: counts, isLoading } = useGetJobSeekerApplicationStatusCount();

    const APPLICATION_STATS = [
        ApplicationStatus.APPLIED,
        ApplicationStatus.UNDER_REVIEW,
        ApplicationStatus.SHORTLISTED,
        ApplicationStatus.REJECTED,
        ApplicationStatus.HIRED,
    ];

    return (
        <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-3">
                {APPLICATION_STATS.map((statusKey) => {
                    const status = APPLICATION_STATUS_CONFIG[statusKey];
                    const Icon = status.icon;
                    const value = counts?.[statusKey] ?? 0;

                    const boxClr = {
                        backgroundColor: hsl(status.color, 0.08),
                        borderColor: hsl(status.color, 0.12),
                        color: hsl(status.color),
                    };

                    return (
                        <CarouselItem
                            key={statusKey}
                            className="pl-2 basis-1/3 sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
                        >
                            <Card className="relative h-full overflow-hidden border bg-background ring-0">
                                <div
                                    style={{
                                        background: `radial-gradient(circle, ${hsl(status.color, 0.25)} 0%, transparent 60%)`,
                                    }}
                                    className="absolute -bottom-10 -right-10 size-24 rounded-full blur-3xl"
                                />

                                <CardContent className="relative z-10 flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-start sm:gap-4">
                                    <div
                                        style={boxClr}
                                        className="flex size-16 shrink-0 items-center justify-center rounded-full border sm:size-18"
                                    >
                                        <Icon className="size-8 sm:size-10" />
                                    </div>

                                    <div className="min-w-0 text-center sm:text-left">
                                        <p className="truncate text-xs font-medium text-muted-foreground sm:text-sm">
                                            {status.label}
                                        </p>
                                        <p className="mt-1 text-2xl font-semibold tracking-tight">
                                            {isLoading ? "..." : value}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
        </Carousel>
    );
}
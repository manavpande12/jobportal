"use client";
import { BriefcaseBusiness } from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { JobPostResponse } from "@/features/jobpost/types/jobpost.types";
import { useIsMobile } from "@/common/hooks/useMobile";
type Prop = {
    data: JobPostResponse;
}
export default function JobCard({ data }: Prop) {
    const isMobile = useIsMobile();
    const router = useRouter();
    const scount = isMobile ? 2 : 6;
    return (
        <div className="relative flex flex-col gap-4 rounded-xl border bg-background shadow-sm transition-all hover:shadow-md sm:flex-row overflow-hidden">
            {/* Left */}
            <div className="flex items-start gap-4 flex-1 p-3 sm:p-6">
                <div className="flex size-21 shrink-0 items-center justify-center rounded-xl border bg-muted/40 sm:size-24">
                    <BriefcaseBusiness className={clsx("h-8 w-8 sm:h-10 sm:w-10")} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h1 className="truncate text-xl font-bold sm:text-2xl">{data.title}</h1>

                    <span

                        className="shrink-0 rounded-xl px-3 py-1 w-fit text-center text-xs font-bold whitespace-nowrap sm:text-sm"
                    >
                        {data.status}
                    </span>

                    <div className="flex w-full gap-2 overflow-x-auto scrollbar-none pb-1">
                        {data.skills.slice(0, scount).map((s) => (
                            <div
                                key={s.id}

                                className="shrink-0 rounded-xl px-3 py-1 text-center text-xs font-bold whitespace-nowrap sm:text-sm"
                            >
                                {s.name}
                            </div>
                        ))}

                        {data.skills.length > scount && (
                            <div

                                className="shrink-0 rounded-xl px-3 py-1 text-center text-xs font-bold whitespace-nowrap sm:text-sm"
                            >
                                +{data.skills.length - scount} more
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-between gap-4 border-t pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 lg:min-w-65 p-3 sm:p-6">
                {/* Dates */}
                <div className="flex flex-col sm:gap-2 text-sm">
                    <div className="flex gap-2 sm:flex-col">
                        <span className="text-muted-foreground"> Posted On </span>
                        <span className="font-semibold"> {format(new Date(data.createdAt), "dd MMM yy hh:mm a")} </span>
                    </div>
                    <div className="flex gap-2 sm:flex-col">
                        <span className="text-muted-foreground">Updated On</span>
                        <span className="font-semibold">{format(new Date(data.updatedAt), "dd MMM yy hh:mm a")}</span>
                    </div>
                </div>


            </div>

            <div
                className="absolute -bottom-32 -right-20 size-96 rounded-full blur-3xl pointer-events-none"
            />
        </div>
    );
}
"use client";
import { CalendarDays } from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/common/hooks/useMobile";
import { JobsResponse } from "../types/jobs.types";
import { getPlainText } from "@/common/utils/html";
import { getColorFromText, hsl } from "@/common/constants/color";
import { getIconFromText, jobIcons } from "@/common/constants/icon";
type Prop = { data: JobsResponse; }
export default function JobCard({ data }: Prop) {
    const isMobile = useIsMobile();
    const router = useRouter();
    const scount = isMobile ? 2 : 6;
    const clr = getColorFromText(`${data.title}-${data.id}`);
    const boxClr = { backgroundColor: hsl(clr, 0.05), borderColor: hsl(clr, 0.10), color: hsl(clr), }
    const Icon = getIconFromText(data.title, jobIcons);
    return (
        <div onClick={() => router.push(`jobs/${data.slug}/${data.id}`)} className="relative flex flex-col gap-4 rounded-xl border bg-background shadow-sm sm:flex-row overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Left */}
            <div className="flex items-start gap-4 flex-1 p-3 sm:p-6">
                <div
                    style={boxClr}
                    className="flex size-21 shrink-0 items-center justify-center rounded-xl border sm:size-24">
                    <Icon className={clsx("h-8 w-8 sm:h-10 sm:w-10")} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span
                            style={{ backgroundColor: hsl(clr) }}
                            className="size-2 rounded-full shrink-0"
                        />
                        <span
                            style={{ color: hsl(clr) }}
                            className="text-xs font-semibold uppercase tracking-[0.18em]"
                        >
                            {data.companyName}
                        </span>
                    </div>
                    <h1 className=" truncate text-xl font-bold sm:text-2xl">{data.title}</h1>
                    <div className="flex w-full gap-2 overflow-x-auto scrollbar-none pb-1">
                        {data.skills.slice(0, scount).map((s) => (
                            <div
                                key={s.id}
                                style={boxClr}
                                className="shrink-0 rounded-xl px-3 py-1 text-center text-xs font-bold whitespace-nowrap sm:text-sm"
                            >
                                {s.name}
                            </div>
                        ))}

                        {data.skills?.length > scount && (
                            <div
                                style={boxClr}
                                className="shrink-0 rounded-xl px-3 py-1 text-center text-xs font-bold whitespace-nowrap sm:text-sm"
                            >
                                +{data.skills.length - scount} more
                            </div>
                        )}
                    </div>
                    <p className="leading-4 line-clamp-2 text-sm text-muted-foreground font-semibold">{getPlainText(data.description)}</p>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-between gap-4 border-t pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 lg:min-w-65 p-3 sm:p-6">
                {/* Dates */}
                <div className="flex items-center gap-3">
                    <div
                        style={boxClr}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border"
                    >
                        <CalendarDays className="h-5 w-5" />
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Published
                        </p>

                        <p className="font-semibold">
                            {data.publishedOn
                                ? format(new Date(data.publishedOn), "dd MMM yyyy • hh:mm a")
                                : "-"}
                        </p>
                    </div>
                </div>
            </div>
            <Icon
                style={{
                    color: hsl(clr, 0.05),
                    filter: "blur(1px)",
                }}
                className="absolute -bottom-10 -right-10 h-52 w-52 pointer-events-none"
            />
            <div
                style={{
                    background: `radial-gradient(circle, hsl(${clr.h} ${clr.s}% ${clr.l}% / 0.25) 0%, transparent 60%)`,
                }}
                className="absolute -bottom-32 -right-20 size-96 rounded-full blur-3xl pointer-events-none"
            />
        </div>
    );
}
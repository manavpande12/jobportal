"use client";
import RichTextViewer from "@/common/components/editor/RichTextViewer";
import { Skeleton } from "@/common/components/ui/skeleton";
import { useGetJobById } from "../hooks/useJobs";
import { BriefcaseBusiness, CalendarDays, Grip, Rocket, Send, Sparkle } from "lucide-react";
import { Separator } from "@/common/components/ui/separator";
import { getColorFromText, hsl } from "@/common/constants/color";
import { useIsMobile } from "@/common/hooks/useMobile";
import { getIconFromText, jobIcons, socialIcons } from "@/common/constants/icon";
import clsx from "clsx";
import { Button } from "@/common/components/ui/button";
import InfoItem from "@/common/components/info-item";
import { format } from "date-fns";
import JobApplicationAction from "./JobApplicationAction";
import { JobPostStatus } from "@/features/jobpost/types/jobpost.types";



export default function JobDetail({ id }: { id: string }) {
    const { data, isLoading, isError } = useGetJobById(id);
    const isMobile = useIsMobile();
    const scount = isMobile ? 2 : 6;
    const clr = getColorFromText(`${data?.title}-${data?.id}`);
    const boxClr = { backgroundColor: hsl(clr, 0.05), borderColor: hsl(clr, 0.10), color: hsl(clr), }
    const neBoxClr = { backgroundColor: hsl(clr), borderColor: hsl(clr), color: clr.l > 60 ? "#000" : "#fff", };
    const Icon = getIconFromText(data?.title ?? "", jobIcons);
    if (isLoading) {
        return (
            <Skeleton />
        );
    }

    if (!data || isError) {
        return (
            <div>
                <h1>Page not found.</h1>
            </div>
        );
    }
    return (
        <section
            style={{
                background: `linear-gradient(
                    to bottom,
                    hsl(${clr.h} ${clr.s}% ${clr.l}% / 0.05) 0%,
                    hsl(${clr.h} ${clr.s}% ${clr.l}% / 0.02) 50%,
                    hsl(${clr.h} ${clr.s}% ${clr.l}% / 0) 100%
                )`,
            }}
            className="relative p-2 xl:p-4 mt-15 overflow-hidden min-h-screen ">
            {/* Effects */}
            <div
                className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full blur-[120px] animate-pulse"
                style={{ backgroundColor: `hsl(${clr.h} ${clr.s}% ${clr.l}% / 0.15)` }}
            />
            <div
                className="absolute right-0 top-0 h-72 w-72 rounded-full blur-[120px] animate-pulse"
                style={{ backgroundColor: `hsl(${clr.h} ${clr.s}% ${clr.l}% / 0.10)`, }}
            />
            <Rocket style={{ color: `hsl(${clr.h} ${clr.s}% ${clr.l}% / 0.05)`, }} className="absolute right-0 top-10 size-72 rotate-12" />
            <Grip style={{ color: `hsl(${clr.h} ${clr.s}% ${clr.l}% / 0.05)`, }} className="absolute -left-20 bottom-0 size-72 rotate-45 " />
            {/* Main */}
            <div className="grid grid-cols-1 xl:grid-cols-12 xl:gap-6 gap-y-6 sm:p-12 ">
                {/* Left */}
                <div className="rounded-xl sm:p-6 space-y-6 col-span-8 p-4 bg-background border transition-all duration-300 hover:shadow-lg">
                    {/* Header */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        {/* Left */}
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div style={boxClr} className="flex size-20 shrink-0 items-center justify-center rounded-xl border sm:size-32" >
                                <Icon className="h-8 w-8 sm:h-14 sm:w-14" />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span style={{ backgroundColor: hsl(clr) }} className="size-2 rounded-full shrink-0" />
                                    <span style={{ color: hsl(clr) }} className="text-xs font-semibold uppercase tracking-[0.18em]" >
                                        {data.companyName}
                                    </span>
                                </div>
                                <h1 className="text-xl font-bold sm:text-2xl wrap-break-word">
                                    {data.title}
                                </h1>
                                <div className="flex items-center gap-2.5">
                                    <div style={boxClr} className="flex size-7 shrink-0 items-center justify-center rounded-md" >
                                        <Rocket className="size-4" />
                                    </div>
                                    <p className="flex-1 text-xs leading-5">
                                        <span className="font-semibold">Take the next step.</span>{" "}
                                        <span className="text-muted-foreground">
                                            Your application could be the beginning of something
                                            great.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex w-full flex-col gap-4 lg:w-auto lg:items-center">
                            <JobApplicationAction
                                jobPostId={data.id}
                                isActive={data.status === JobPostStatus.ACTIVE}
                                style={neBoxClr}
                            />
                            <div className="flex flex-wrap justify-center gap-2">
                                {socialIcons.map(({ icon: Icon, label }) => (
                                    <button
                                        key={label}
                                        title={label}
                                        style={boxClr}
                                        className="flex size-12 items-center justify-center rounded-full transition-all duration-200 hover:bg-background"
                                    >
                                        <Icon className="size-6" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Separator />
                    {/* Description */}
                    <RichTextViewer html={data.description} color={hsl(clr)} />
                </div>
                {/* Right */}
                <div className="col-span-4 gap-4 flex flex-col w-full">
                    <div className="rounded-xl p-4 bg-background border transition-all duration-300 hover:shadow-lg space-y-4 min-h-60 w-full">
                        <div className="flex items-center gap-2">
                            <div style={boxClr} className="size-10 border rounded-xl flex justify-center items-center">
                                <BriefcaseBusiness />
                            </div>
                            <h1 className="text-xl font-bold sm:text-2xl">Overview</h1>
                        </div>
                        <div className="flex flex-col gap-2">
                            <InfoItem
                                size="sm"
                                rounded="square"
                                Icon={CalendarDays}
                                title="Published"
                                value={format(new Date(data.publishedOn), "dd MMM yyyy hh:mm a")}
                                color={clr}
                            />
                        </div>
                    </div>
                    <div className="rounded-xl p-4 bg-background border transition-all duration-300 hover:shadow-lg space-y-4 min-h-60 w-full">
                        <div className="flex items-center gap-2">
                            <div style={boxClr} className="size-10 border rounded-xl flex justify-center items-center">
                                <Sparkle />
                            </div>
                            <h1 className="text-xl font-bold sm:text-2xl">Skills</h1>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((s) => (
                                <div
                                    key={s.id}
                                    style={boxClr}
                                    className="shrink-0 rounded-xl px-3 py-1 text-center text-xs font-bold whitespace-nowrap sm:text-sm"
                                >
                                    {s.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
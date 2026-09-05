"use client";

import { Card, CardContent } from "@/common/components/ui/card";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { APPLICATION_STATUS_CONFIG, ApplicationResponse } from "@/features/application/types/application.types";
import { hsl } from "@/common/constants/color";
import { getIconFromText, jobIcons } from "@/common/constants/icon";
import { useIsMobile } from "@/common/hooks/useMobile";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Separator } from "@/common/components/ui/separator";
import ApplicationEmpty from "./ApplicationEmpty";
import ApplicationSkeleton from "./ApplicationSkeleton";

type Prop = { data: ApplicationResponse[]; loading: boolean };

export function ApplicationList({ data, loading }: Prop) {
    const isMobile = useIsMobile();
    const router = useRouter();
    const scount = isMobile ? 2 : 6;
    if (loading) {
        return (<ApplicationSkeleton />);
    }
    if (!data.length) {
        return (<ApplicationEmpty />);
    }

    return (
        <div className="space-y-3">
            {data.map((application) => {
                const status = APPLICATION_STATUS_CONFIG[application.status];
                const StatusIcon = status.icon;
                const boxClr = {
                    backgroundColor: hsl(status.color, 0.05),
                    borderColor: hsl(status.color, 0.10),
                    color: hsl(status.color),
                };
                const Icon = getIconFromText(application.jobPost.title, jobIcons);

                return (
                    <Card
                        key={application.id}
                        onClick={() => router.push(`/jobs/${application.jobPost.companySlug}/${application.jobPost.id}`)}
                        className="relative cursor-pointer overflow-hidden bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-0 border"
                    >
                        <CardContent className="relative z-10 flex flex-col gap-4 p-3 lg:flex-row lg:items-center lg:p-5">

                            {/* Left */}
                            <div className="flex min-w-0 flex-1 items-start gap-4">
                                {/* Job Icon */}
                                <div style={boxClr} className="flex size-16 shrink-0 items-center justify-center rounded-xl border lg:size-20">
                                    <Icon className={clsx("size-8 lg:size-10")} />
                                </div>

                                {/* Job Information */}
                                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                                    {/* Company */}
                                    <div className="flex items-center gap-2">
                                        <span style={{ backgroundColor: hsl(status.color) }} className="size-2 shrink-0 rounded-full" />
                                        <span style={{ color: hsl(status.color) }} className="truncate text-xs font-semibold uppercase tracking-[0.16em]">
                                            {application.jobPost.companyName}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="truncate text-lg font-bold lg:text-xl">
                                        {application.jobPost.title}
                                    </h2>

                                    {/* Skills */}
                                    <div className="flex w-full gap-2 overflow-x-auto scrollbar-none pb-1">
                                        {application.jobPost.skills.slice(0, scount).map((skill) => (
                                            <div key={skill.id} style={boxClr} className="shrink-0 rounded-xl px-2.5 py-1 text-xs font-bold whitespace-nowrap">
                                                {skill.name}
                                            </div>
                                        ))}

                                        {application.jobPost.skills.length > scount && (
                                            <div style={boxClr} className="shrink-0 rounded-xl px-2.5 py-1 text-xs font-bold whitespace-nowrap">
                                                + {application.jobPost.skills.length - scount} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Separator orientation={isMobile ? "horizontal" : "vertical"} />
                            {/* Right */}
                            <div className="flex flex-wrap items-center justify-between gap-3 lg:min-w-60">
                                {/* Applied Date */}
                                <div className="flex items-center gap-2">
                                    <div style={boxClr} className="flex size-9 shrink-0 items-center justify-center rounded-lg border">
                                        <CalendarDays className="size-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                            Applied
                                        </p>
                                        <p className="whitespace-nowrap text-xs font-semibold lg:text-sm">
                                            {application.appliedAt ? format(new Date(application.appliedAt), "dd MMM yyyy • hh:mm a") : "-"}
                                        </p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-2">
                                    <div style={boxClr} className="flex size-9 shrink-0 items-center justify-center rounded-lg border">
                                        <StatusIcon className="size-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                            Application Status
                                        </p>
                                        <p className="whitespace-nowrap text-xs font-semibold lg:text-sm">
                                            {status.label}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        {/* Colored blur */}
                        {/* Colored blur */}
                        <div
                            style={{
                                background: `radial-gradient(circle, ${hsl(status.color, 0.25)} 0%, transparent 60%)`,
                            }}
                            className="pointer-events-none absolute -bottom-32 -right-20 size-96 rounded-full blur-3xl"
                        />
                    </Card>
                );
            })}
        </div>
    );
}
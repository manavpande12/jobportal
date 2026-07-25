"use client";
import { CalendarDays, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";
import { Button } from "@/common/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import JobPostDialog from "./JobPostDialog";
import JobPostStatusActions from "./JobPostStatusActions";
import { JobPostResponse } from "../types/jobpost.types";
import { useIsMobile } from "@/common/hooks/useMobile";
import { getPlainText } from "@/common/utils/html";
import { getIconFromText, jobIcons } from "@/common/constants/icon";
import { getColorFromStatus, hsl } from "@/common/constants/color";
type Prop = {
    data: JobPostResponse;
}
export default function JobPostCard({ data }: Prop) {
    const isMobile = useIsMobile();
    const router = useRouter();
    const scount = isMobile ? 2 : 6;
    const clr = getColorFromStatus(data.status);
    const boxClr = { backgroundColor: hsl(clr, 0.05), borderColor: hsl(clr, 0.10), color: hsl(clr), }


    const dateInfo = (() => {
        switch (data.status) {
            case "ACTIVE":
                return {
                    label1: "Published",
                    value1: data.publishedOn,
                    label2: "Modified",
                    value2: data.updatedAt,
                };

            case "DRAFT":
                return {
                    label1: "Drafted",
                    value1: data.draftedOn,
                    label2: "Modified",
                    value2: data.updatedAt,
                };

            case "CLOSED":
                return {
                    label1: "Closed",
                    value1: data.closedOn,
                    label2: "Modified",
                    value2: data.updatedAt,
                };

            default:
                return {
                    label1: "Created",
                    value1: data.createdAt,
                    label2: "Modified",
                    value2: data.updatedAt,
                };
        }
    })();

    const Icon = getIconFromText(data.title, jobIcons);
    return (
        <div className="relative flex flex-col gap-4 rounded-xl border bg-background shadow-sm transition-all hover:shadow-md sm:flex-row overflow-hidden">
            {/* Left */}
            <div className="flex items-start gap-4 flex-1 p-3 sm:p-6">
                <div style={boxClr} className="flex size-21 shrink-0 items-center justify-center rounded-xl border sm:size-24">
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
                            {data.status}
                        </span>
                    </div>
                    <h1 className="truncate text-xl font-bold sm:text-2xl">{data.title}</h1>
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
                        {data.skills.length > scount && (
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
                <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-3">
                        <div
                            style={boxClr}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border"
                        >
                            <CalendarDays className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                {dateInfo.label1}
                            </p>

                            <p className="font-semibold">
                                {dateInfo.value1
                                    ? format(new Date(dateInfo.value1), "dd MMM yyyy • hh:mm a")
                                    : "-"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div
                            style={boxClr}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border"
                        >
                            <CalendarDays className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                {dateInfo.label2}
                            </p>

                            <p className="font-semibold">
                                {dateInfo.value2
                                    ? format(new Date(dateInfo.value2), "dd MMM yyyy • hh:mm a")
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Action */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0" >
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 text-sm!">
                        <DropdownMenuLabel className="text-muted-foreground text-sm">
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push(`/recruiter/job-posts/${data.id}`)}>
                            <Eye className="size-4" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/recruiter/job-posts/${data.id}/edit`)}>
                            <Pencil className="size-4" />
                            Edit Post
                        </DropdownMenuItem>
                        <JobPostStatusActions
                            id={data.id}
                            status={data.status}
                        />
                        <DropdownMenuSeparator />
                        <JobPostDialog
                            id={data.id}
                            trigger={
                                <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()} >
                                    <Trash2 className="size-4" />
                                    Delete Post
                                </DropdownMenuItem>
                            }
                            action="DELETE"
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
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
                    background: `radial-gradient(circle, ${clr}40 0%, transparent 50%)`,
                }}
                className="absolute -bottom-32 -right-20 size-96 rounded-full blur-3xl pointer-events-none"
            />
        </div>
    );
}
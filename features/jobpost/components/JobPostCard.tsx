"use client";
import { BriefcaseBusiness, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";
import { Button } from "@/common/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import JobPostDialog from "./JobPostDialog";
import JobPostStatusActions from "./JobPostStatusActions";
import { JobPostResponse } from "../types/jobpost.types";
import { useIsMobile } from "@/common/hooks/useMobile";
type Prop = {
    data: JobPostResponse;
}
export default function JobPostCard({ data }: Prop) {
    const isMobile = useIsMobile();
    const router = useRouter();
    const scount = isMobile ? 2 : 6;
    let clr = "#565667";

    switch (data.status) {
        case "ACTIVE":
            clr = "#305CDE";
            break;
        case "DRAFT":
            clr = "#EAB308";
            break;
        case "CLOSED":
            clr = "#DC2626";
            break;
        default:
            clr = "#565667";
            break;
    }
    return (
        <div className="relative flex flex-col gap-4 rounded-xl border bg-background shadow-sm transition-all hover:shadow-md sm:flex-row overflow-hidden">
            {/* Left */}
            <div className="flex items-start gap-4 flex-1 p-3 sm:p-6">
                <div style={{ backgroundColor: clr + "10" }} className="flex size-21 shrink-0 items-center justify-center rounded-xl border bg-muted/40 sm:size-24">
                    <BriefcaseBusiness style={{ color: clr }} className={clsx("h-8 w-8 sm:h-10 sm:w-10")} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h1 className="truncate text-xl font-bold sm:text-2xl">{data.title}</h1>

                    <span
                        style={{ color: clr, backgroundColor: clr + "10" }}
                        className="shrink-0 rounded-xl px-3 py-1 w-fit text-center text-xs font-bold whitespace-nowrap sm:text-sm"
                    >
                        {data.status}
                    </span>

                    <div className="flex w-full gap-2 overflow-x-auto scrollbar-none pb-1">
                        {data.skills.slice(0, scount).map((s) => (
                            <div
                                key={s.id}
                                style={{ color: clr, backgroundColor: clr + "10" }}
                                className="shrink-0 rounded-xl px-3 py-1 text-center text-xs font-bold whitespace-nowrap sm:text-sm"
                            >
                                {s.name}
                            </div>
                        ))}

                        {data.skills.length > scount && (
                            <div
                                style={{ color: clr, backgroundColor: clr + "10" }}
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

            <div
                style={{
                    background: `radial-gradient(circle, ${clr}40 0%, transparent 50%)`,
                }}
                className="absolute -bottom-32 -right-20 size-96 rounded-full blur-3xl pointer-events-none"
            />
        </div>
    );
}
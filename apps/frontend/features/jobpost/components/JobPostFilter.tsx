"use client";

import { Circle, LayoutDashboard, Plus } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/common/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/common/components/ui/select";
import { JobPostFilterRequest, SortDirection } from "../types/jobpost.types";
import { useRouter } from "next/navigation";

type Props = {
    filter: JobPostFilterRequest;
    setFilter: React.Dispatch<React.SetStateAction<JobPostFilterRequest>>;
}

export default function JobPostFilter({ filter, setFilter }: Props) {
    const router = useRouter();
    const statusBox = [
        { label: "All", value: undefined, color: "text-primary", Icon: LayoutDashboard },
        { label: "Active", value: "ACTIVE", color: "fill-green-500 stroke-0", Icon: Circle },
        { label: "Draft", value: "DRAFT", color: "fill-yellow-500 stroke-0", Icon: Circle },
        { label: "Closed", value: "CLOSED", color: "fill-destructive stroke-0", Icon: Circle },
    ];
    return (
        <div className="mt-6 flex gap-4 justify-between flex-wrap overflow-hidden">
            <div className=" flex bg-muted/30 border rounded-md overflow-x-auto scrollbar-none ">
                {statusBox.map((s) => {
                    const isActive = filter.status === s.value;
                    return (
                        <Button
                            key={s.label}
                            onClick={() => setFilter((prev) => ({ ...prev, status: s.value, page: 0, }))}
                            className={clsx(
                                "relative flex min-w-28 flex-1 hover:bg-background! hover:text-foreground! border items-center justify-center gap-2 border-r py-3 transition-all duration-200",
                                isActive
                                    ? "bg-primary/5 text-foreground"
                                    : "text-muted-foreground bg-background"
                            )}
                        >
                            <s.Icon className={clsx("h-5 w-5", s.color)} />
                            <span className="text-sm font-semibold">{s.label}</span>
                            {isActive && <div className="absolute bottom-0 left-0 h-0.75 w-full bg-primary" />}
                        </Button>
                    );
                })}
            </div>
            <div className="flex gap-2 flex-1 sm:flex-none flex-wrap">
                <div className="flex items-center justify-around border rounded-md grow sm:grow-0">
                    <span className="text-sm text-center px-2 font-semibold">Sortby:</span>
                    <Select
                        defaultValue="latest"
                        onValueChange={(v) =>
                            setFilter((prev) => ({
                                ...prev,
                                sortBy: "createdAt",
                                direction: v === "latest" ? SortDirection.DESC : SortDirection.ASC,
                            }))
                        }
                    >
                        <SelectTrigger className="w-26 rounded-none border-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={() => router.push("/recruiter/job-posts/create")} className="gradient-background grow! sm:grow-0 text-white">
                    <Plus className="size-4!" />
                    <span>
                        Create Job Post
                    </span>
                </Button>
            </div>

        </div>
    );
}
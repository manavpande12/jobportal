"use client";

import RichTextViewer from "@/common/components/editor/RichTextViewer";
import { Button } from "@/common/components/ui/button";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Building, Calendar, Clock } from "lucide-react";
import { useRouter } from "next/navigation"
import { MoreVertical, Pencil, Trash2 } from "lucide-react";;
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { format } from "date-fns";
import { useGetJobPostById } from "../hooks/useJobPost";
import { getColorFromStatus, hsl } from "@/common/constants/color";


type Prop = {
    id: string;
}
export default function JobPostPage({ id }: Prop) {
    const { data, isLoading } = useGetJobPostById(id);
    const router = useRouter();
    const clr = getColorFromStatus(data?.status);
    const boxClr = { backgroundColor: hsl(clr, 0.05), borderColor: hsl(clr, 0.10), color: hsl(clr), }

    if (isLoading || !data) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-12 w-96" />

                <div className="flex gap-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-40" />
                </div>

                <Skeleton className="h-96 w-full" />
            </div>
        );
    }
    return (
        <div>
            <div className="flex justify-end">
                {/* Action */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="highlight-brand p-5" >
                            <span>Action</span>
                            <MoreVertical className="size-5!" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 text-sm!">
                        <DropdownMenuLabel className="text-muted-foreground text-sm">
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push(`${data.id}/edit`)}>
                            <Pencil className="size-4" />
                            Edit Post
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                            <Trash2 className="size-4" />
                            Delete Post
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="py-6 flex flex-col">
                <h1 className="font-bold text-3xl xl:text-4xl">{data.title}</h1>
                <div className="flex gap-4 py-2 mb-2 overflow-x-auto whitespace-nowrap scrollbar-none text-muted-foreground font-medium">
                    <div style={boxClr} className="inline-flex items-center gap-2 rounded-sm px-3 py-0.5 text-sm font-medium">
                        <div style={{ backgroundColor: hsl(clr) }} className="size-2 rounded-full" />
                        <span>{data.status}</span>
                    </div>
                    <div className="flex shrink-0 gap-2 items-center text-sm">
                        <Building className="size-4 shrink-0" />
                        <span className="text-foreground">{data.companyName}</span>
                    </div>

                    <div className="flex shrink-0 gap-2 items-center text-sm">
                        <Calendar className="size-4 shrink-0" />
                        <span>Created At:</span>
                        <span className="text-foreground">{format(data.createdAt, "dd MMM yy hh:mm a")}</span>
                    </div>

                    <div className="flex shrink-0 gap-2 items-center text-sm">
                        <span>Updated At:</span>
                        <Clock className="size-4 shrink-0" />
                        <span className="text-foreground">{format(data.updatedAt, "dd MMM yy hh:mm a")}</span>
                    </div>
                </div>

            </div>
            <div className="rounded-lg border p-4">
                <RichTextViewer html={data.description} color={hsl(clr)} />
            </div>
        </div>
    );
}
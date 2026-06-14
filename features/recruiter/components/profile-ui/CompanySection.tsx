"use client";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Building, Calendar, CalendarCheck, Clock, Factory, Globe, Landmark, Pen, Users } from "lucide-react";
import CreateEditCompany from "../profile-edit/CreateEditCompany";
import Link from "next/link";
import ProfileInfo from "@/common/components/profile-info";
import { format } from "date-fns";
import { Button } from "@/common/components/ui/button";
import { useState } from "react";
import { useGetCompany } from "@/features/company/hooks/useCompany";

export default function CompanySection() {
    const { data, isLoading, isError, error } = useGetCompany();
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    if (isLoading) {
        return (
            <Skeleton className="flex-3 bg-background rounded-xl flex flex-col py-8 px-3 xl:px-6 transition-all duration-300 hover:shadow-lg" />
        );
    }

    if (isError) {
        return (
            <div className="flex-3 h-full rounded-xl bg-background flex items-center justify-center">
                <span className="highlight-destructive">
                    {error instanceof Error
                        ? error.message
                        : "Something went wrong."}
                </span>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex-3 bg-background space-y-4 rounded-xl flex flex-col py-8 px-3 xl:px-6 w-full transition-all duration-300 hover:shadow-lg">
                {/* Header Section */}
                <div className="flex md:flex-row flex-col gap-2 justify-between md:items-center">
                    <div className="flex items-center flex-1 gap-4">
                        <div className="flex justify-center items-center rounded-full highlight-brand p-4">
                            <Building className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold leading-6">Company Information</h1>
                    </div>
                    <div className="w-full md:w-fit">
                        <Button
                            onClick={() => setCreateOpen(true)}
                            className="highlight-brand w-full px-6 text-sm font-semibold shadow-sm transition-all hover:scale-[1.02]">
                            <Building className="mr-2 h-4 w-4" />
                            Create Company
                        </Button>
                        <CreateEditCompany isCreate={true} open={createOpen} setOpen={setCreateOpen} />
                    </div>
                </div>
                <div className="h-full flex items-center justify-center">
                    <span className="highlight-brand w-full md:w-fit text-center">
                        Fill a company details to begin hiring process.
                    </span>
                </div>
            </div>
        )
    }


    return (
        <div className="flex-3 bg-background rounded-xl flex flex-col py-8 px-3 xl:px-6 transition-all duration-300 hover:shadow-lg">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center rounded-full highlight-brand p-4">
                        <Building className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold leading-6">Company Information</h1>
                </div>
                <Button
                    size="icon"
                    onClick={() => setEditOpen(true)}
                    className="highlight-brand h-12 w-12 rounded-full shadow-md transition-all hover:scale-110"
                >
                    <Pen className="h-5 w-5" />
                </Button>
                <CreateEditCompany isCreate={false} open={editOpen} setOpen={setEditOpen} data={data} />
            </div>
            {/* Body Section */}
            <div className="flex flex-col gap-4 items-center justify-between mt-10">
                {/* Main Company Info */}
                <div className="flex w-full flex-row gap-6 rounded-xl border p-4">
                    <div className="flex items-start justify-start">
                        <div className="flex aspect-square w-16 items-center justify-center rounded-md bg-card/60 shadow md:w-26">
                            <Landmark className="fill-pritext-primary text-primary stroke-2 md:size-16" />
                        </div>
                    </div>

                    <div className="flex min-w-0 w-full flex-col items-start justify-start space-y-2">
                        <h1 className=" font-semibold text-lg leading-4.5">
                            {data.name}
                        </h1>
                        <p className="line-clamp-2 text-xs font-semibold text-muted-foreground md:text-sm">
                            {data.headline}
                        </p>
                        <div className="flex w-full items-center gap-2">
                            <Globe className="size-3.5 shrink-0 text-muted-foreground md:size-4" />
                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={data.domain}
                                className="truncate text-xs font-semibold text-secondary underline md:text-sm"
                            >
                                {data.domain}
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Extra Info Company */}
                <div className="w-full grid  grid-cols-1 md:grid-cols-2 space-y-4 border rounded-xl p-4 gap-4">
                    <ProfileInfo Icon={Factory} title="Industry" value={data.industry} rounded="square" />
                    <ProfileInfo Icon={Users} title="Company Size" value={data.companySize} rounded="square" />
                    <ProfileInfo Icon={CalendarCheck} title="Founded Year" value={data.foundedYear} rounded="square" />
                    <ProfileInfo Icon={Calendar} title="Created At" value={format(new Date(data.createdAt), "dd MMM yy hh:mm a")} rounded="square" />
                    <ProfileInfo Icon={Clock} title="Last Updated" value={format(new Date(data.updatedAt), "dd MMM yy hh:mm a")} rounded="square" />
                </div>
            </div>
        </div>
    );
}
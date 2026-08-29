"use client";
import { Skeleton } from "@/common/components/ui/skeleton";
import ProfileSidebar from "./ProfileSidebar";
import { useState } from "react";
import EditProfileSheet from "../profile-edit/EditProfileSheet";
import CompanySection from "./CompanySection";
import ActionBtnSection from "./ActionBtnSection";
import { useGetRecruiterProfile } from "../../hooks/useRecruiterProfile";

export default function HomeDashboard() {
    const { data, isLoading, isError, error } = useGetRecruiterProfile();
    const [openEditProfile, setOpenEditProfile] =
        useState(false);

    if (isLoading) {
        return (
            <Skeleton className="h-screen rounded-xl bg-background mx-4 my-2" />
        );
    }

    if (isError) {
        return (
            <div className="h-screen rounded-xl bg-background mx-4 my-2 flex items-center justify-center">
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
            <div className="h-screen rounded-xl bg-background mx-4 my-2 flex items-center justify-center">
                <span className="highlight-brand">
                    Profile not found.
                </span>
            </div>
        );
    }


    return (
        <div className="flex flex-col xl:flex-row gap-6 min-w-0 h-fit xl:h-full">
            {data && (
                <div className="w-full xl:w-80 shrink-0">
                    <ProfileSidebar
                        data={data}
                        onEdit={() => setOpenEditProfile(true)}
                    />
                </div>
            )}

            <div className="flex-1 min-w-0 flex flex-col gap-6">
                <CompanySection />
                <ActionBtnSection />
            </div>

            {data && (
                <EditProfileSheet
                    data={data}
                    open={openEditProfile}
                    onOpenChange={setOpenEditProfile}
                />
            )}
        </div>

    )
}
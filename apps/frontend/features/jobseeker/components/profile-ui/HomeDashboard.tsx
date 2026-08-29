"use client";
import { Skeleton } from "@/common/components/ui/skeleton";
import ProfileSidebar from "./ProfileSidebar";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ProfileMeta from "./ProfileMeta";
import { useGetJobSeekerProfile } from "@/features/jobseeker/hooks/useJobSeekerProfile";
import { useState } from "react";
import EditProfileSheet from "../profile-edit/EditProfileSheet";

export default function HomeDashboard() {
    const { data, isLoading, isError, error } = useGetJobSeekerProfile();
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
            {data && <ProfileSidebar data={data} onEdit={() => setOpenEditProfile(true)} />}
            <div className="flex-3 flex flex-col gap-6 h-full">
                <AboutSection data={data} />
                <SkillsSection data={data} />
                <ProfileMeta data={data} />
            </div>
            {data && <EditProfileSheet data={data} open={openEditProfile} onOpenChange={setOpenEditProfile} />}
        </div>

    )
}
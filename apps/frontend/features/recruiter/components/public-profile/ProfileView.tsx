"use client";

import { BriefcaseBusiness, Mail, Share2 } from "lucide-react";
import { useGetRecruiterPublicProfile } from "../../hooks/useRecruiterProfile";
import UserNotFound from "@/features/shared/components/UserNotFound";
import InitialsAvatar from "@/common/components/initials-avatar";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Button } from "@/common/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { getColorFromText, hsl } from "@/common/constants/color";
import { shareContent } from "@/common/utils/share";

type Prop = {
  id: string;
};

export default function ProfileView({ id }: Prop) {
  const { data, isLoading, isError } = useGetRecruiterPublicProfile(id);

  if (isLoading) {
    return (
      <div className="mx-auto w-full space-y-5">
        <Skeleton className="h-64 rounded-2xl bg-background" />
      </div>
    );
  }

  if (isError || !data) return <UserNotFound />;

  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const hslClr = hsl(getColorFromText(fullName));

  const handleShare = async () => {
    const result = await shareContent({
      title: `${fullName} | Recruiter Profile`,
      text: `Check out ${fullName}'s recruiter profile`,
      url: window.location.href,
      initials: fullName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      avatarColor: hslClr,
    });

    switch (result) {
      case "shared":
        toast.success("Profile shared successfully!");
        break;
      case "copied":
        toast.success("Profile link copied!");
        break;
      case "failed":
        toast.error("Unable to share profile");
        break;
    }
  };

  return (
    <div className="mx-auto w-full flex-1">
      <section className="relative overflow-hidden rounded-2xl border bg-background">
        {/* Cover */}
        <div className="relative h-36 bg-linear-to-r from-primary/15 via-primary/5 to-background sm:h-48">
          <div className="absolute -right-10 -top-24 size-64 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: hslClr }} />
          <div className="absolute -bottom-24 left-1/3 size-56 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: hslClr }} />
        </div>

        {/* Profile Header */}
        <div className="relative px-5 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <InitialsAvatar name={fullName} size="l" />

              <div className="space-y-1 pb-1">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{fullName || "~"}</h1>

                <p className="text-sm leading-6 text-muted-foreground sm:text-base">{data.designation || "~"}</p>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <BriefcaseBusiness className="size-3.5" />
                  Recruiter
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 sm:pb-1">
              <Button asChild className="flex-1 text-white sm:flex-none">
                <Link href={data.email ? `mailto:${data.email}` : "#"} onClick={(e) => !data.email && e.preventDefault()}>
                  <Mail className="size-4" />
                  Contact
                </Link>
              </Button>

              <Button variant="outline" onClick={handleShare} className="flex-1 sm:flex-none">
                <Share2 className="size-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

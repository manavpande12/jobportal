"use client";

import { Card, CardContent } from "@/common/components/ui/card";
import { BriefcaseBusiness, CalendarDays, User } from "lucide-react";
import { format } from "date-fns";
import { APPLICATION_STATUS_CONFIG, ApplicationResponse } from "@/features/application/types/application.types";
import { getColorFromText, hsl } from "@/common/constants/color";
import { useIsMobile } from "@/common/hooks/useMobile";
import { useRouter } from "next/navigation";
import { Separator } from "@/common/components/ui/separator";
import ApplicationEmpty from "./ApplicantsEmpty";
import ApplicationSkeleton from "./ApplicantsSkeleton";
import InitialsAvatar from "@/common/components/initials-avatar";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import { FaFilePdf } from "react-icons/fa6";
import ApplicantsStatusUpdate from "./ApplicantsStatusUpdate";

type Prop = { data: ApplicationResponse[]; loading: boolean };

export function ApplicantsList({ data, loading }: Prop) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const scount = isMobile ? 2 : 4;
  if (loading) {
    return <ApplicationSkeleton />;
  }
  if (!data.length) {
    return <ApplicationEmpty />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {data.map((application) => {
        const status = APPLICATION_STATUS_CONFIG[application.status];
        const Icon = status.icon;
        const clr = getColorFromText(application.jobseeker.firstName + " " + application.jobseeker.lastName);
        const boxClr = {
          backgroundColor: hsl(clr, 0.05),
          borderColor: hsl(clr, 0.1),
          color: hsl(clr),
        };
        return (
          <Card
            key={application.id}
            className="relative w-full cursor-pointer overflow-hidden p-0! bg-background shadow-sm transition-all duration-300 hover:shadow-xl ring-0 border"
          >
            <CardContent className="relative z-10 p-3 gap-2 flex flex-col items-center justify-center w-full!">
              <div className="w-full">
                <Badge className={status.className}>
                  <Icon className="size-3" />
                  {status.label}
                </Badge>
              </div>
              <div className="flex gap-3 w-full">
                <InitialsAvatar name={application.jobseeker.firstName + " " + application.jobseeker.lastName} size="l" />
                <div className="flex flex-col gap-2 min-w-0">
                  <h2 className="truncate text-lg font-bold leading-tight lg:text-xl">
                    {application.jobseeker.firstName} {application.jobseeker.lastName}
                  </h2>
                  <span
                    style={{ color: hsl(status.color) }}
                    className="text-xs font-semibold uppercase whitespace-nowrap leading-none tracking-[0.16em] overflow-x-auto block w-full scrollbar-none line-clamp-1"
                  >
                    {application.jobseeker.headline ?? "-"}
                  </span>
                  <div className="flex gap-2 items-center text-muted-foreground text-xs">
                    <BriefcaseBusiness className="size-4" />
                    <span>{application.jobseeker.yearsOfExperience != null ? `${application.jobseeker.yearsOfExperience}+ yrs exp` : "Fresher"}</span>
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-2 overflow-x-auto scrollbar-none">
                {(application?.jobseeker?.skills ?? []).slice(0, scount).map((skill) => (
                  <div key={skill.id} style={boxClr} className="shrink-0 rounded-xl px-2.5 py-1 text-xs font-bold whitespace-nowrap">
                    {skill.name}
                  </div>
                ))}

                {(application?.jobseeker?.skills?.length ?? 0) > scount && (
                  <div style={boxClr} className="shrink-0 rounded-xl px-2.5 py-1 text-xs font-bold whitespace-nowrap">
                    + {(application?.jobseeker?.skills?.length ?? 0) - scount} more
                  </div>
                )}
              </div>
              <Separator className="w-full" />
              <div className="flex flex-wrap justify-between gap-2 w-full lg:min-w-60">
                {/* Applied For */}
                <div className="flex gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted">
                    <BriefcaseBusiness className="size-4 text-shadow-muted" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Applied For</p>
                    <p className="whitespace-nowrap text-xs font-semibold lg:text-sm">{application.jobPost.title}</p>
                  </div>
                </div>
                {/* Applied On */}
                <div className="flex gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted">
                    <CalendarDays className="size-4 text-shadow-muted" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Applied On</p>
                    <p className="whitespace-nowrap text-xs font-semibold lg:text-sm">
                      {application.appliedAt ? format(new Date(application.appliedAt), "dd MMM yyyy • hh:mm a") : "-"}
                    </p>
                  </div>
                </div>
              </div>
              <Separator className="w-full" />
              <div className="w-full flex justify-center items-center flex-col gap-2">
                <div className="flex w-full min-w-0 gap-2">
                  <Button
                    onClick={() => router.push(`/profile/${application.jobseeker.id}`)}
                    variant="outline"
                    style={{ backgroundColor: hsl(clr) }}
                    className="min-w-0 flex-1 text-white hover:text-white"
                  >
                    <User className="size-4 shrink-0" />
                    <span className="truncate">View Profile</span>
                  </Button>
                  <div className="min-w-0 flex-1">
                    <ApplicantsStatusUpdate id={application.id} status={application.status} />
                  </div>
                </div>
                <Button style={boxClr} variant={"link"} className="w-full">
                  <FaFilePdf className="size-4" />
                  View Resume
                </Button>
              </div>
            </CardContent>

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

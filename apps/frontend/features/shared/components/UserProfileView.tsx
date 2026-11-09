"use client";

import { useGetRoleById } from "@/common/hooks/useUser";
import { RoleType } from "@/common/types/role.types";
import JobSeekerProfileView from "@/features/jobseeker/components/public-profile/ProfileView";
import UserNotFound from "./UserNotFound";
import { Loader2 } from "lucide-react";
import RecruiterProfileView from "@/features/recruiter/components/public-profile/ProfileView";

type prop = {
  id: string;
};

export default function UserProfileView({ id }: prop) {
  const { data: role, isLoading, isError } = useGetRoleById(id);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Loader2 className="size-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !role) {
    return (
      <div className="flex flex-1 flex-col">
        <UserNotFound />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      {role === RoleType.JOB_SEEKER ? (
        <JobSeekerProfileView id={id} />
      ) : role === RoleType.RECRUITER ? (
        <RecruiterProfileView id={id} />
      ) : (
        <UserNotFound />
      )}
    </div>
  );
}

import { Skills } from "@/common/types/skills";
import { JobPostStatus } from "@/features/jobpost/types/jobpost.types";
import { CheckCircle2, Clock3, XCircle, UserRoundCheck, FileText, LucideIcon, } from "lucide-react";

export enum ApplicationStatus {
    APPLIED = "APPLIED",
    UNDER_REVIEW = "UNDER_REVIEW",
    SHORTLISTED = "SHORTLISTED",
    REJECTED = "REJECTED",
    HIRED = "HIRED"
}

export type JobPostResponse = {
    id: string;
    title: string;
    companyName: string;
    companySlug: string;
    status: JobPostStatus;
    skills: Skills[];
};

export type JobSeekerResponse = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type ApplicationStatusCount = Partial<Record<ApplicationStatus, number>>;

export type ApplicationResponse = {
    id: string;
    jobPost: JobPostResponse;
    jobseeker: JobSeekerResponse;
    status: ApplicationStatus;
    appliedAt: string;
};

export type UpdateApplicationStatusRequest = {
    status: ApplicationStatus;
};

export type ApplicationPageRequest = {
    page?: number;
    size?: number;
    sort?: string;
};


export type MyApplicationRequest = ApplicationPageRequest & ApplicationFilterRequest;

export type ApplicationFilterRequest = {
    search?: string;
    status?: ApplicationStatus;
};

type HslColor = {
    h: number;
    s: number;
    l: number;
};

export type ApplicationStatusConfig = {
    label: string;
    className: string;
    color: HslColor;
    icon: LucideIcon;
};
export const APPLICATION_STATUS_CONFIG: Record<ApplicationStatus, ApplicationStatusConfig> = {
    [ApplicationStatus.APPLIED]: {
        label: "APPLIED",
        className: "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-200",
        color: { h: 215, s: 16, l: 47 },
        icon: FileText,
    },

    [ApplicationStatus.UNDER_REVIEW]: {
        label: "UNDER REVIEW",
        className: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
        color: { h: 221, s: 83, l: 53 },
        icon: Clock3,
    },

    [ApplicationStatus.SHORTLISTED]: {
        label: "SHORTLISTED",
        className: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
        color: { h: 142, s: 71, l: 45 },
        icon: UserRoundCheck,
    },

    [ApplicationStatus.REJECTED]: {
        label: "REJECTED",
        className: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
        color: { h: 0, s: 84, l: 60 },
        icon: XCircle,
    },

    [ApplicationStatus.HIRED]: {
        label: "HIRED",
        className: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
        color: { h: 271, s: 81, l: 56 },
        icon: CheckCircle2,
    },
};
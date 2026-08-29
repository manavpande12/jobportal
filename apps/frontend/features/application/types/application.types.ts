import { Skills } from "@/common/types/skills";
import { JobPostStatus } from "@/features/jobpost/types/jobpost.types";

export enum ApplicationStatus {
    APPLIED = "APPLIED",
    UNDER_REVIEW = "UNDER_REVIEW",
    SHORTLISTED = "SHORTLISTED",
    REJECTED = "REJECTED",
    HIRED = "HIRED",
}

export type JobPostResponse = {
    id: string;
    title: string;
    companyName: string;
    status: JobPostStatus;
    skills: Skills[];
};

export type JobSeekerResponse = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

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
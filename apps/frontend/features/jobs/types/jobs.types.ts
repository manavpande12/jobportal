import { Skills } from "@/common/types/skills";
import { JobPostStatus } from "@/features/jobpost/types/jobpost.types";

export type JobsResponse = {
    id: string;
    title: string;
    description: string;
    companyName: string;
    status: JobPostStatus
    skills: Skills[];
    slug: string;
    publishedOn: string;
}

export type JobSearchRequest = {
    title: string;
    skillIds: number[],
    page: number,
    size: number
}
import { Skills } from "@/common/types/skills";

export type JobsResponse = {
    id: number;
    title: string;
    description: string;
    companyName: string;
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
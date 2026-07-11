import { Skills } from "@/common/types/skills";


export enum JobPostStatus {
    ACTIVE = "ACTIVE",
    DRAFT = "DRAFT",
    CLOSED = "CLOSED",
}

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC",
}

export type CreateJobPostRequest = {
    title: string;
    description: string;
    skillIds: number[];
}
export type UpdateJobPostRequest = {
    title?: string;
    description?: string;
    skillIds?: number[];
}
export type JobPostResponse = {
    id: string,
    title: string;
    description: string;
    status: JobPostStatus;
    createdBy: string;
    companyName: string;
    slug: string;
    skills: Skills[];
    publishedOn: string;
    draftedOn: string;
    closedOn: string;
    createdAt: string;
    updatedAt: string;
}



export type JobPostFilterRequest = {
    status?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    direction?: SortDirection;
};
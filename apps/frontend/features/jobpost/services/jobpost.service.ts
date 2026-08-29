import { api } from "@/common/lib/api";
import { ApiResponse, PageResponse } from "@/common/types/api.types";
import { CreateJobPostRequest, JobPostFilterRequest, JobPostResponse, UpdateJobPostRequest } from "../types/jobpost.types";

export const createJobPost = async (data: CreateJobPostRequest) => {
    const res = await api.post<ApiResponse<null>>("/job-posts/me", data);
    return res.data;
}
export const updateJobPostById = async (id: string, data: UpdateJobPostRequest) => {
    const res = await api.patch<ApiResponse<null>>(`/job-posts/me/${id}`, data);
    return res.data;
}
export const getJobPostById = async (id: string) => {
    const res = await api.get<ApiResponse<JobPostResponse>>(`/job-posts/me/${id}`);
    return res.data;
}
export const getJobPosts = async (params: JobPostFilterRequest) => {
    const res = await api.get<ApiResponse<PageResponse<JobPostResponse>>>("/job-posts/me", { params });
    return res.data.data;
}
export const deleteJobPost = async (id: string) => {
    const res = await api.delete<ApiResponse<null>>(`/job-posts/me/${id}`);
    return res.data;
}
export const closeJobPost = async (id: string) => {
    const res = await api.patch<ApiResponse<null>>(`/job-posts/me/${id}/close`);
    return res.data;
}
export const draftJobPost = async (id: string) => {
    const res = await api.patch<ApiResponse<null>>(`/job-posts/me/${id}/draft`);
    return res.data;
}
export const activeJobPost = async (id: string) => {
    const res = await api.patch<ApiResponse<null>>(`/job-posts/me/${id}/active`);
    return res.data;
}
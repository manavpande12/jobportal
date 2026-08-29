import { api } from "@/common/lib/api";
import { ApiResponse, PageResponse } from "@/common/types/api.types";
import { ApplicationPageRequest, ApplicationResponse, UpdateApplicationStatusRequest, } from "../types/application.types";

export const applyForJob = async (jobPostId: string) => {
    const res = await api.post<ApiResponse<null>>(`/applications/job-posts/${jobPostId}`, {}, { redirectOnUnauthenticated: true });
    return res.data;
};

export const getMyApplications = async (params: ApplicationPageRequest) => {
    const res = await api.get<ApiResponse<PageResponse<ApplicationResponse>>>("/applications/me", { params });
    return res.data.data;
};

export const getApplicationsForJob = async (jobPostId: string, params: ApplicationPageRequest) => {
    const res = await api.get<ApiResponse<PageResponse<ApplicationResponse>>>(`/applications/job-posts/${jobPostId}`, { params });
    return res.data.data;
};

export const updateApplicationStatus = async (id: string, data: UpdateApplicationStatusRequest) => {
    const res = await api.patch<ApiResponse<null>>(`/applications/${id}/status`, data);
    return res.data;
};

export const hasApplied = async (jobPostId: string) => {
    const res = await api.get<ApiResponse<boolean>>(`/applications/job-posts/${jobPostId}/has-applied`);
    return res.data.data;
};
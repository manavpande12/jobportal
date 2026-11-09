import { api } from "@/common/lib/api";
import { ApiResponse, PageResponse } from "@/common/types/api.types";
import { JobSearchRequest, JobsResponse } from "../types/jobs.types";

export const getJobById = async (id: string) => {
  const res = await api.get<ApiResponse<JobsResponse>>(`jobs/${id}`);
  return res.data;
};

export const searchJobs = async (params: JobSearchRequest) => {
  const res = await api.get<ApiResponse<PageResponse<JobsResponse>>>("jobs", { params });
  return res.data.data;
};

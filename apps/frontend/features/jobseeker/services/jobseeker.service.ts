import { ApiResponse } from "@/common/types/api.types";
import { JobSeekerProfileRequest, JobSeekerProfileResponse, JobSeekerPublicProfileResponse } from "../types/jobseeker.types";
import { api } from "@/common/lib/api";

export const getJobSeekerProfile = async () => {
  const res = await api.get<ApiResponse<JobSeekerProfileResponse>>("/job-seeker-profiles/me");
  return res.data;
};
export const getJobSeekerPublicProfile = async (id: string) => {
  const res = await api.get<ApiResponse<JobSeekerPublicProfileResponse>>(`/job-seeker-profiles/public/${id}`);
  return res.data;
};

export const updateJobSeekerProfile = async (data: JobSeekerProfileRequest) => {
  const res = await api.patch<ApiResponse<null>>("/job-seeker-profiles/me", data);
  return res.data;
};

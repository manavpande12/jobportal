import { api } from "@/common/lib/api";
import { ApiResponse } from "@/common/types/api.types";
import { RecruiterProfileRequest, RecruiterProfileResponse, RecruiterPublicProfileResponse } from "../types/recruiter.types";

export const getRecruiterProfile = async () => {
  const res = await api.get<ApiResponse<RecruiterProfileResponse>>("/recruiter-profiles/me");
  return res.data;
};

export const getRecruiterPublicProfile = async (id: string) => {
  const res = await api.get<ApiResponse<RecruiterPublicProfileResponse>>(`/recruiter-profiles/public/${id}`);
  return res.data;
};

export const updateRecruiterProfile = async (data: RecruiterProfileRequest) => {
  const res = await api.patch<ApiResponse<null>>("/recruiter-profiles/me", data);
  return res.data;
};

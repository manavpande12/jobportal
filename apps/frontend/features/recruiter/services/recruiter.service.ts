import { api } from "@/common/lib/api"
import { ApiResponse } from "@/common/types/api.types";
import { RecruiterProfileRequest, RecruiterProfileResponse } from "../types/recruiter.types";


export const getRecruiterProfile = async () => {
    const res = await api.get<ApiResponse<RecruiterProfileResponse>>("/recruiter-profiles/me");
    return res.data;
}

export const updateRecruiterProfile = async (data: RecruiterProfileRequest) => {
    const res = await api.patch<ApiResponse<null>>("/recruiter-profiles/me", data);
    return res.data;
}
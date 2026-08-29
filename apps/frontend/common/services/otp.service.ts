import { api } from "@/common/lib/api"
import { SentOtpRequest, SentOtpResponse, VerifyOtpRequest, VerifyOtpResponse } from "@/common/types/otp.types";

export const sendOtp = async (data: SentOtpRequest) => {
    const res = await api.post<SentOtpResponse>("/otp/sent-otp", data);
    return res.data;
}

export const verifyOtp = async (data: VerifyOtpRequest) => {
    const res = await api.post<VerifyOtpResponse>("/otp/verify-otp", data);
    return res.data;
}


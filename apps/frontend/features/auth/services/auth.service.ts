import { api } from "@/common/lib/api";
import { ForgetPasswordRequest, LoginRequest, RegisterRequest } from "../types/auth.types";
import { ApiResponse } from "@/common/types/api.types";

export const login = async (data: LoginRequest) => {
    const res = await api.post<ApiResponse<null>>("/auth/login", data);
    return res.data;
};

export const register = async (data: RegisterRequest) => {
    const res = await api.post<ApiResponse<null>>("/auth/register", data);
    return res.data;
};

export const forgetPassword = async (data: ForgetPasswordRequest) => {
    const res = await api.put<ApiResponse<null>>("/auth/forget-password", data);
    return res.data;
}

export const logout = async () => {
    const res = await api.post<ApiResponse<null>>("/auth/logout");
    return res.data;
}
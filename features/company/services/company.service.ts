import { api } from "@/common/lib/api"
import { ApiResponse } from "@/common/types/api.types";
import { UpdateCompanyRequest, CompanyResponse, CreateCompanyRequest } from "@/common/types/company";

export const getCompany = async () => {
    const res = await api.get<ApiResponse<CompanyResponse>>("/companies/me");
    return res.data;
}

export const updateCompany = async (data: UpdateCompanyRequest) => {
    const res = await api.patch<ApiResponse<null>>("/companies/me", data);
    return res.data;
}

export const createCompany = async (data: CreateCompanyRequest) => {
    const res = await api.post<ApiResponse<null>>("/companies/me", data);
    return res.data;
}

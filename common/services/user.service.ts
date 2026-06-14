import { api } from "@/common/lib/api"
import { ApiResponse } from "@/common/types/api.types";
import { UserResponse } from "@/common/types/user.types";

export const getUser = async () => {
    const res = await api.get<ApiResponse<UserResponse>>("/users/me");
    return res.data;
}
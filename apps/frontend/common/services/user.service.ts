import { api } from "@/common/lib/api";
import { ApiResponse } from "@/common/types/api.types";
import { UserResponse } from "@/common/types/user.types";
import { RoleType } from "../types/role.types";

export const getUser = async () => {
  const res = await api.get<ApiResponse<UserResponse>>("/users/me");
  return res.data;
};

export const getUserById = async (id: string) => {
  const res = await api.get<ApiResponse<UserResponse>>(`/users/${id}`);
  return res.data;
};
export const getRoleById = async (id: string) => {
  const res = await api.get<ApiResponse<RoleType>>(`/users/roles/${id}`);
  return res.data;
};

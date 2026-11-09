import { getRoleById, getUser, getUserById } from "@/common/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: async () => {
      const res = await getUser();
      return res.data;
    },
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await getUserById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useGetRoleById = (id: string) => {
  return useQuery({
    queryKey: ["users", id, "role"],
    queryFn: async () => {
      const res = await getRoleById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

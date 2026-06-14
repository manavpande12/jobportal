import { getUser } from "@/common/services/user.service";
import { useQuery } from "@tanstack/react-query"

export const useGetUser = () => {
    return useQuery({
        queryKey: ["user-me"],
        queryFn: async () => {
            const res = await getUser();
            return res.data;
        }
    });
}
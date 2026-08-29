import { getSkills } from "@/common/services/skills.service";
import { Skills } from "@/common/types/skills";
import { useQuery } from "@tanstack/react-query"

export const useGetSkills = (enabled = true) => {
    return useQuery({
        queryKey: ["get-skills"],
        queryFn: async (): Promise<Skills[]> => {
            const res = await getSkills();
            return res.data;
        },
        enabled
    });
}
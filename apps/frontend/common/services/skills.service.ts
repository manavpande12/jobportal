import { api } from "@/common/lib/api"
import { GetSkillsResponse } from "@/common/types/skills";

export const getSkills = async () => {
    const res = await api.get<GetSkillsResponse>("/skills");
    return res.data;
}
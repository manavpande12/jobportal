
export type Skills = {
    id: number;
    name: string;
}
export type GetSkillsResponse = import("./api.types").ApiResponse<Skills[]>;
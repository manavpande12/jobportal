export enum RoleType {
    JOB_SEEKER = "ROLE_JOB_SEEKER",
    RECRUITER = "ROLE_RECRUITER",
    ADMIN = "ROLE_ADMIN"
}

export const ROLE_DASHBOARD: Record<RoleType, string> = {
    [RoleType.JOB_SEEKER]: "/job-seeker",
    [RoleType.RECRUITER]: "/recruiter",
    [RoleType.ADMIN]: "/admin",
};

export const isValidRole = (role: string): role is RoleType => {
    return Object.values(RoleType).includes(role as RoleType);
};

export const FormatRoleLabel = (role: RoleType) => {
    return role
        .replace("ROLE_", "")     // remove prefix
        .replaceAll("_", " ")     // replace underscore with space
        .toLowerCase()            // optional: normalize case
        .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize words
};
import { RoleType } from "@/common/types/role.types";
import { Bolt, BriefcaseBusiness, FileText, Home, LucideIcon, PenLine } from "lucide-react";
export enum AccessType { PUBLIC, GUEST, PRIVATE }
export type TabsTypes = { label: string; path: string; icon: LucideIcon; hide?: boolean }

export const STATIC_ROUTES = {
    public: ["/", "/contact", "/pricing", "/jobs"],
    guest: ["/login", "/register"],
};

export const PROTECTED_ROUTES: Record<RoleType, TabsTypes[]> = {
    [RoleType.JOB_SEEKER]: [
        { label: "Dashboard", path: "/job-seeker", icon: Home },
        { label: "Jobs", path: "/jobs", icon: BriefcaseBusiness },
        { label: "Settings", path: "/job-seeker/settings", icon: Bolt },
    ],

    [RoleType.ADMIN]: [
        { label: "Dashboard", path: "/admin", icon: Home },
        { label: "Settings", path: "/admin/settings", icon: Bolt },
    ],

    [RoleType.RECRUITER]: [
        { label: "Dashboard", path: "/recruiter", icon: Home },
        { label: "My Job Post", path: "/recruiter/job-posts", icon: FileText },
        { label: "Create Job Post", path: "/recruiter/job-posts/create", icon: PenLine, hide: true },
        { label: "Settings", path: "/recruiter/settings", icon: Bolt },
    ],
};

export const ROUTES = (() => {
    const protectedRoutes = Object.values(PROTECTED_ROUTES).flat().map((r) => r.path);
    return {
        public: STATIC_ROUTES.public,
        guest: STATIC_ROUTES.guest,
        protected: [...new Set(protectedRoutes)],
    };
})();

export const GET_ROUTE_TITLE = (role: RoleType, pathname: string): string | undefined => {
    const cleanPath = pathname.split("?")[0].replace(/\/$/, "");
    return PROTECTED_ROUTES[role]
        .filter((r) => cleanPath.startsWith(r.path))
        .sort((a, b) => b.path.length - a.path.length)[0]?.label;
};

export const GET_ROUTE_TABS = (role: RoleType): TabsTypes[] => {
    return PROTECTED_ROUTES[role];
};
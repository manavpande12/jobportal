import { RoleType } from "@/common/types/role.types";
import { Bolt, BriefcaseBusiness, CirclePlus, Home, LucideIcon, Search, Settings } from "lucide-react";
export enum AccessType { PUBLIC, GUEST, PRIVATE }
export type TabsTypes = { label: string; path: string; icon: LucideIcon; hide?: boolean }

export const STATIC_ROUTES = {
    public: ["/", "/contact", "/pricing", "/jobs"],
    guest: ["/login", "/register"],
};

export const PROTECTED_ROUTES: Record<RoleType, TabsTypes[]> = {
    [RoleType.JOB_SEEKER]: [
        { label: "Dashboard", path: "/job-seeker", icon: Home },
        { label: "Find Jobs", path: "/jobs", icon: Search },
        { label: "Settings", path: "/job-seeker/settings", icon: Settings },
    ],

    [RoleType.ADMIN]: [
        { label: "Dashboard", path: "/admin", icon: Home },
        { label: "Settings", path: "/admin/settings", icon: Bolt },
    ],

    [RoleType.RECRUITER]: [
        { label: "Dashboard", path: "/recruiter", icon: Home },
        { label: "My Jobs", path: "/recruiter/job-posts", icon: BriefcaseBusiness },
        { label: "Post a Job", path: "/recruiter/job-posts/create", icon: CirclePlus, hide: true },
        { label: "Browse Jobs", path: "/jobs", icon: Search },
        { label: "Settings", path: "/recruiter/settings", icon: Settings },
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
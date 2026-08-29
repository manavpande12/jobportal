"use client";
import { RoleType } from "@/common/types/role.types";
import { GET_ROUTE_TITLE } from "@/common/config/routes";
import { usePathname } from "next/navigation";

const RouteTitle = ({ role }: { role: RoleType }) => {
    const pathname = usePathname();
    const title = GET_ROUTE_TITLE(role, pathname);
    return (
        <h1 className="gradient-text text-2xl sm:text-4xl font-black">{title}</h1>
    );
}
export default RouteTitle;
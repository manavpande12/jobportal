"use client";
import RouteTitle from "@/common/components/route-title";
import { Button } from "@/common/components/ui/button";
import UserAvatar from "@/common/components/user-avatar";
import { RoleType } from "@/common/types/role.types";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const ROLE = RoleType.RECRUITER;
export default function RecruiterNav() {
    const router = useRouter();
    const pathname = usePathname();
    const isRoot = pathname === "/recruiter";
    return (
        <nav className="fixed top-0 z-40 flex justify-between items-center h-16 w-full gap-6 px-4 py-2 shrink-0 border-b bg-background/60 backdrop-blur-md supports-backdrop-filter:bg-background/5s0 lg:pr-20">
            <div className="inline-flex space-x-4 items-center">
                {!isRoot && <Button variant="outline" onClick={() => router.back()} className="rounded-full! size-12">
                    <ChevronLeft className="size-6! text-muted-foreground" />
                </Button>}
                <RouteTitle role={ROLE} />
            </div>
            <UserAvatar />
        </nav>
    );
}
"use client";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useSidebar } from "../provider/SidebarProvider";
import { useIsMobile } from "../hooks/useMobile";
import { useGetUser } from "../hooks/useUser";

const UserAvatar = () => {
    const { setOpen } = useSidebar();
    const isMobile = useIsMobile();
    const { data, isLoading, isError } = useGetUser();
    return (
        <div onClick={() => {
            if (isMobile) setOpen((prev) => !prev);
        }} className="flex justify-center items-center rounded-full p-2.5 size-12 gradient-background">

            {
                !data || isLoading
                    ? <Loader2 className="animate-spin w-4 h-4 text-white" />
                    : isError
                        ? <AlertTriangle />
                        : <span className="text-white font-semibold text-sm">{(data.firstName.charAt(0) + data.lastName.charAt(0)).toUpperCase()}</span>
            }
        </div>
    );
}

export default UserAvatar;
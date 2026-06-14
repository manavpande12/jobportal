"use client";
import SettingCard from "@/common/components/setting-card";
import { useLogout } from "@/features/auth/hooks/useAuth";
import { showApiError } from "@/common/utils/show-api-error";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const LogOutCard = () => {
    const { mutateAsync, isPending } = useLogout();

    const handleLogout = async () => {
        try {
            const res = await mutateAsync();
            toast.success(res.message ?? "Logout Successfully");
            window.location.href = "/";
        } catch (err: unknown) {
            showApiError(err);
        }
    };

    return (
        <SettingCard
            title="LogOut"
            description="Session ends here. You will be signed out from your account on this device."
            isDestructive={true}
            Icon={LogOut}
            actionLabel="Sign Out"
            loading={isPending}
            onClick={handleLogout}
        />
    );
};

export default LogOutCard;
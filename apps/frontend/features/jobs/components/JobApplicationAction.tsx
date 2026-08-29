"use client";

import { Button } from "@/common/components/ui/button";
import { Send } from "lucide-react";
import { useApplyForJob, useHasApplied } from "@/features/application/hooks/useApplication";
import { toast } from "sonner";
import { showApiError } from "@/common/utils/show-api-error";

type Props = {
    jobPostId: string;
    isActive: boolean;
    style?: React.CSSProperties;
};

export default function JobApplicationAction({ jobPostId, isActive, style, }: Props) {
    const { mutateAsync, isPending } = useApplyForJob();
    const { data: hasApplied, isLoading } = useHasApplied(jobPostId);
    const handleApply = async () => {
        try {
            const res = await mutateAsync(jobPostId)
            toast.success(res.message ?? "Application submitted successfully.");
        }
        catch (err: unknown) {
            showApiError(err);
        }
    };

    return (
        <Button
            style={style}
            className="w-full lg:min-w-65 lg:w-auto py-6! text-xl"
            disabled={!isActive || hasApplied || isPending || isLoading}
            onClick={handleApply}
        >
            {isPending
                ? "Applying..."
                : hasApplied
                    ? "Applied"
                    : !isActive
                        ? "Applications Closed"
                        : "Apply Now"}


            <Send className="size-6" />
        </Button>
    );
}
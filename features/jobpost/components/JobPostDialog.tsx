"use client";

import { useState } from "react";
import { toast } from "sonner";
import ButtonSpinner from "@/common/components/loading/ButtonSpinner";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/common/components/ui/dialog";
import { useActiveJobPost, useCloseJobPost, useDeleteJobPost, useDraftJobPost, useGetJobPostById, } from "../hooks/useJobPost";
import { showApiError } from "@/common/utils/show-api-error";

export type ActionType = | "DELETE" | "ACTIVE" | "CLOSED" | "DRAFT";

const ACTION_CONFIG = {
    DELETE: {
        title: "Delete Job Post",
        description: "delete",
        buttonText: "Delete",
        buttonVariant: "destructive" as const,
        warning:
            "This action cannot be undone. The job post and its associated data will be permanently removed.",
    },

    ACTIVE: {
        title: "Publish Job Post",
        description: "publish",
        buttonText: "Publish",
        buttonVariant: "default" as const,
        warning:
            "This job post will become visible to candidates and start accepting applications.",
    },

    CLOSED: {
        title: "Close Job Post",
        description: "close",
        buttonText: "Close",
        buttonVariant: "destructive" as const,
        warning:
            "Candidates will no longer be able to apply for this position.",
    },

    DRAFT: {
        title: "Move To Draft",
        description: "move to draft",
        buttonText: "Move To Draft",
        buttonVariant: "warning" as const,
        warning:
            "This job post will be hidden from candidates until published again.",
    },
};

type Props = {
    id: string;
    action: ActionType;
    trigger: React.ReactNode;
};

export default function JobPostDialog({ id, action, trigger }: Props) {
    const [open, setOpen] = useState(false);
    const config = ACTION_CONFIG[action];
    const deleteMutation = useDeleteJobPost();
    const activeMutation = useActiveJobPost();
    const closeMutation = useCloseJobPost();
    const draftMutation = useDraftJobPost();
    const { data, isLoading } = useGetJobPostById(id);
    const loading = isLoading || deleteMutation.isPending || activeMutation.isPending || closeMutation.isPending || draftMutation.isPending;

    const onSubmit = async () => {
        try {
            let res;
            switch (action) {
                case "DELETE":
                    res = await deleteMutation.mutateAsync(id);
                    break;
                case "ACTIVE":
                    res = await activeMutation.mutateAsync(id);
                    break;
                case "CLOSED":
                    res = await closeMutation.mutateAsync(id);
                    break;
                case "DRAFT":
                    res = await draftMutation.mutateAsync(id);
                    break;
            }

            toast.success(res?.message);
            setOpen(false);
        } catch (err) {
            showApiError(err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {config.title}
                    </DialogTitle>

                    <DialogDescription>
                        {data?.title ? (
                            <>
                                Are you sure you want to{" "}
                                {config.description}{" "}
                                <span className="font-medium text-foreground">
                                    "{data.title}"
                                </span>
                                ?
                            </>
                        ) : (
                            `Are you sure you want to ${config.description} this job post?`
                        )}
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
                    {config.warning}
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant={config.buttonVariant}
                        onClick={onSubmit}
                        disabled={loading}
                        className="w-32"
                    >
                        {loading ? (
                            <ButtonSpinner />
                        ) : (
                            config.buttonText
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
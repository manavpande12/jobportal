"use client";

import clsx from "clsx";
import JobPostDialog, { ActionType } from "./JobPostDialog";
import { JobPostStatus } from "../types/jobpost.types";
import { DropdownMenuItem } from "@/common/components/ui/dropdown-menu";

type Props = {
    id: string;
    status: JobPostStatus;
};

const JOB_POST_ACTIONS = {
    ACTIVE: [
        {
            label: "Close Posting",
            action: "CLOSED" as ActionType,
            color: "bg-destructive",
        },
        {
            label: "Move to Draft",
            action: "DRAFT" as ActionType,
            color: "bg-yellow-500",
        },
    ],
    DRAFT: [
        {
            label: "Publish Job",
            action: "ACTIVE" as ActionType,
            color: "bg-primary",
        },
    ],
    CLOSED: [
        {
            label: "Reopen Job",
            action: "ACTIVE" as ActionType,
            color: "bg-primary",
        },
        {
            label: "Move to Draft",
            action: "DRAFT" as ActionType,
            color: "bg-yellow-500",
        },
    ],
} as const;

export default function JobPostStatusActions({ id, status, }: Props) {
    return (
        <>
            {JOB_POST_ACTIONS[status].map((item) => (
                <JobPostDialog
                    key={`${id}-${item.action}`}
                    id={id}
                    action={item.action}
                    trigger={
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <div className={clsx("size-2 mx-1 rounded-full", item.color)} />
                            {item.label}
                        </DropdownMenuItem>
                    }
                />
            ))}
        </>
    );
}
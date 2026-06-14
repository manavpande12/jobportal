"use client";

import { useState } from "react";
import JobPostFilter from "./JobPostFilter";
import JobPostCard from "./JobPostCard";
import { useGetJobPosts } from "../hooks/useJobPost";
import { JobPostFilterRequest, SortDirection, } from "../types/jobpost.types";

export default function JobPostView() {
    const [filter, setFilter] = useState<JobPostFilterRequest>({
        page: 0,
        size: 10,
        sortBy: "createdAt",
        direction: SortDirection.DESC,
    });

    const { data, isLoading } = useGetJobPosts(filter);
    const posts = data?.content ?? [];

    return (
        <div>
            <JobPostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <div className="mt-4 flex flex-col gap-4">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-44 w-full animate-pulse rounded-2xl border bg-muted/40"
                        />
                    ))
                ) : (
                    posts.map((jp) => (
                        <JobPostCard key={jp.id} data={jp} />
                    ))
                )}
            </div>
        </div>
    );
}
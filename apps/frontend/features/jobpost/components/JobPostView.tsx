"use client";

import { useState } from "react";
import JobPostFilter from "./JobPostFilter";
import { useGetJobPosts } from "../hooks/useJobPost";
import { JobPostFilterRequest, SortDirection, } from "../types/jobpost.types";
import JobPostList from "./JobPostList";
import JobPostPagination from "./JobPostPagination";

export default function JobPostView() {
    const [filter, setFilter] = useState<JobPostFilterRequest>({
        sortBy: "createdAt",
        direction: SortDirection.DESC,
    });
    const [page, setPage] = useState(0);
    const { data, isLoading } = useGetJobPosts({
        page,
        size: 5,
        direction: filter.direction,
        sortBy: filter.sortBy,
        status: filter.status
    });

    return (
        <div>
            <JobPostFilter
                filter={filter}
                setFilter={(value) => {
                    setFilter(value);
                    setPage(0);
                }}
            />
            <JobPostList
                data={data?.content ?? []}
                isLoading={isLoading}
            />

            {data && (
                <JobPostPagination
                    page={data.number}
                    totalPages={data.totalPages}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}
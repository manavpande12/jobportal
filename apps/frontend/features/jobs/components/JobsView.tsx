"use client";

import { useState } from "react";
import { useGetSearchJobs } from "../hooks/useJobs";
import JobsSearch from "./JobsSearch";
import JobList from "./JobList";
import JobsPagination from "./JobsPagination";

export interface JobSearchFilters {
    title: string;
    skillIds: number[];
}

export default function JobsView() {
    const [filters, setFilters] = useState<JobSearchFilters>({
        title: "",
        skillIds: [],
    });
    const [page, setPage] = useState(0);
    const { data, isLoading } = useGetSearchJobs({
        page,
        size: 5,
        skillIds: filters.skillIds,
        title: filters.title,
    });

    return (
        <div className="flex min-h-[88vh] flex-col gap-4 rounded-xl bg-background">
            <JobsSearch
                onSearch={(value) => {
                    setFilters(value);
                    setPage(0);
                }}
                isLoading={isLoading}
            />

            <JobList
                jobs={data?.content ?? []}
                isLoading={isLoading}
            />

            {data && (
                <JobsPagination
                    page={data.number}
                    totalPages={data.totalPages}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}
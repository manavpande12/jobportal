"use client";

import { useState } from "react";
import { ApplicationStats } from "./ApplicationStats";
import { ApplicationFilter } from "./ApplicationFilter";
import { ApplicationList } from "./ApplicationList";
import ApplicationPagination from "./ApplicationPagination";
import { useGetMyApplications } from "@/features/application/hooks/useApplication";
import { ApplicationStatus } from "@/features/application/types/application.types";
import { useDebounce } from "@/common/hooks/useDebounce";

export type ApplicationFilterState = {
    search: string;
    status: ApplicationStatus | "ALL";
    sort: "NEWEST" | "OLDEST";
};

const SORT_OPTIONS = {
    NEWEST: "appliedAt,desc",
    OLDEST: "appliedAt,asc",
} as const;

export default function ApplicationView() {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [filter, setFilter] = useState<ApplicationFilterState>({
        search: "", status: "ALL", sort: "NEWEST",
    });
    const debouncedSearch = useDebounce(filter.search, 500);
    const handleFilterChange = (key: keyof ApplicationFilterState, value: string) => {
        setPage(0); setFilter((prev) => ({ ...prev, [key]: value }));
    };
    const handleClear = () => {
        setPage(0); setFilter({ search: "", status: "ALL", sort: "NEWEST", });
    };
    const handleSizeChange = (value: number) => {
        setSize(value); setPage(0);
    };

    const { data: applications, isLoading } = useGetMyApplications({
        page,
        size,
        sort: SORT_OPTIONS[filter.sort as keyof typeof SORT_OPTIONS],
        search: debouncedSearch || undefined,
        status: filter.status === "ALL" ? undefined : filter.status as ApplicationStatus,
    });

    return (
        <div className="space-y-2">
            <ApplicationStats />

            <ApplicationFilter
                filter={filter}
                onFilterChange={handleFilterChange}
                onClear={handleClear}
            />

            <ApplicationList data={applications?.content ?? []} loading={isLoading} />
            <ApplicationPagination
                page={page}
                totalPages={applications?.totalPages ?? 0}
                totalElements={applications?.totalElements ?? 0}
                size={size}
                onPageChange={setPage}
                onSizeChange={handleSizeChange}
            />
        </div>
    );
}